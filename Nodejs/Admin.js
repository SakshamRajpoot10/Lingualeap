const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 8000;

// MySql Connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD || 'vbxf817jv1',
    database: 'elearning',
};

const createTables = () => {
    connection.query(`
        CREATE TABLE IF NOT EXISTS \`teacher_materials\` (
          \`id\` INT AUTO_INCREMENT PRIMARY KEY,
          \`teacher_email\` VARCHAR(100) NOT NULL,
          \`student_email\` VARCHAR(100) NOT NULL,
          \`title\` VARCHAR(255) NOT NULL,
          \`file_path\` LONGTEXT NOT NULL,
          \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `, (err) => {
        if (err) console.error("Error creating teacher_materials table:", err);
        else {
            // Alter column to LONGTEXT in case table already existed with VARCHAR
            connection.query("ALTER TABLE `teacher_materials` MODIFY `file_path` LONGTEXT NOT NULL", (errAlter) => {
                if (errAlter) console.error("Error altering teacher_materials table:", errAlter);
            });
        }
    });

    connection.query(`
        CREATE TABLE IF NOT EXISTS \`student_reviews\` (
          \`id\` INT AUTO_INCREMENT PRIMARY KEY,
          \`student_name\` VARCHAR(100) NOT NULL,
          \`student_email\` VARCHAR(100) NOT NULL,
          \`teacher_email\` VARCHAR(100) NOT NULL,
          \`review_text\` TEXT NOT NULL,
          \`review_type\` VARCHAR(50) NOT NULL DEFAULT 'Review',
          \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `, (err) => {
        if (err) console.error("Error creating student_reviews table:", err);
    });

    // Create admin table if not exists, and insert default credentials if empty
    connection.query(`
        CREATE TABLE IF NOT EXISTS \`admin\` (
          \`id\` INT AUTO_INCREMENT PRIMARY KEY,
          \`username_email\` VARCHAR(100) NOT NULL UNIQUE,
          \`password\` VARCHAR(100) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `, (err) => {
        if (err) console.error("Error creating admin table:", err);
        else {
            // Check if default admin account exists
            connection.query("SELECT * FROM admin WHERE username_email = 'admin@gmail.com'", (errSelect, results) => {
                if (!errSelect && (!results || results.length === 0)) {
                    connection.query("INSERT INTO admin (username_email, password) VALUES ('admin@gmail.com', 'admin')", (errInsert) => {
                        if (errInsert) console.error("Error inserting default admin:", errInsert);
                        else console.log("Default admin account (admin@gmail.com / admin) verified/inserted successfully.");
                    });
                }
            });
        }
    });

    // Safely add teacher_name column if not present
    connection.query("SHOW COLUMNS FROM appointments LIKE 'teacher_name'", (err, rows) => {
        if (!err && (!rows || rows.length === 0)) {
            connection.query("ALTER TABLE appointments ADD COLUMN teacher_name VARCHAR(100) DEFAULT NULL", (err2) => {
                if (err2) console.error("Error adding teacher_name column:", err2);
            });
        }
    });

    // Safely add teacher_email column if not present
    connection.query("SHOW COLUMNS FROM appointments LIKE 'teacher_email'", (err, rows) => {
        if (!err && (!rows || rows.length === 0)) {
            connection.query("ALTER TABLE appointments ADD COLUMN teacher_email VARCHAR(100) DEFAULT NULL", (err2) => {
                if (err2) console.error("Error adding teacher_email column:", err2);
                else {
                    // Migrate old rows by matching language with teacher expertise
                    connection.query(`
                        UPDATE appointments a 
                        JOIN teacherprofile t ON LOWER(t.languages) LIKE CONCAT('%', LOWER(a.language), '%')
                        SET a.teacher_name = t.uname, a.teacher_email = t.email
                        WHERE a.teacher_name IS NULL OR a.teacher_email IS NULL
                    `, (err3) => {
                        if (err3) console.error("Error migrating old appointments:", err3);
                    });
                }
            });
        }
    });

    // Update testlanguage flag image URLs to map to clean assets on disk
    connection.query(`
        UPDATE testlanguage SET imageURL = CASE 
            WHEN LOWER(languages) = 'german' THEN '/image/german.jpeg'
            WHEN LOWER(languages) = 'russian' THEN '/image/russia.png'
            WHEN LOWER(languages) = 'english' THEN '/image/english.png'
            WHEN LOWER(languages) = 'korean' THEN '/image/korean.png'
            WHEN LOWER(languages) = 'french' THEN '/image/french.png'
            WHEN LOWER(languages) = 'japanese' THEN '/image/japanese.png'
            ELSE imageURL
        END
    `, (err) => {
        if (err) console.error("Error migrating language flag images:", err);
    });
};

let connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.warn('Failed to connect using primary password, trying empty password...', err.message);
        dbConfig.password = '';
        connection = mysql.createConnection(dbConfig);
        connection.connect((err2) => {
            if (err2) {
                console.error('Database connection failed completely:', err2);
                return;
            }
            console.log('Connected to the database with fallback (empty password)');
            createTables();
        });
    } else {
        console.log('Connected to the database successfully');
        createTables();
    }
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Update teacher profile
app.post('/teacherprofile', (req, res) => {
    const { uname, email, mobileno, batch, languages, certification, location } = req.body;
    const sql = 'UPDATE teacherprofile SET uname = ?, mobileno = ?, batch = ?, languages = ?, certification = ?, location = ? WHERE email = ?';
    connection.query(sql, [uname, mobileno, batch, languages, certification, location, email], (error, result) => {
        if (error) {
            console.error('Error updating teacher profile:', error);
            return res.status(500).send('Database error');
        }
        // Also update uname in teacherlogin table for consistency
        connection.query('UPDATE teacherlogin SET uname = ? WHERE email = ?', [uname, email], (err2) => {
            if (err2) console.error('Error updating teacher login name:', err2);
            res.send({ status: true });
        });
    });
});

// Get all languages
app.get('/selectlanguage', (req, res) => {
    const sql = 'SELECT * FROM languageinsert';
    connection.query(sql, (error, result) => {
        if (error) {
            console.error('Error fetching languages:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Get all test languages
app.get('/selecttlanguage', (req, res) => {
    const sql = 'SELECT * FROM testlanguage';
    connection.query(sql, (error, result) => {
        if (error) {
            console.error('Error fetching test languages:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Get teacher profile by email
app.post('/selectteacherprofile', (req, res) => {
    const { email } = req.body;
    const sql = 'SELECT * FROM teacherprofile WHERE email = ?';
    connection.query(sql, [email], (error, result) => {
        if (error) {
            console.error('Error fetching teacher profile:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Get all mylanguages
app.get('/mylanguages', (req, res) => {
    const sql = 'SELECT * FROM mylanguages';
    connection.query(sql, (error, result) => {
        if (error) {
            console.error('Error fetching mylanguages:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Get all presentlearning
app.get('/presentlearning', (req, res) => {
    const sql = 'SELECT * FROM presentlearning';
    connection.query(sql, (error, result) => {
        if (error) {
            console.error('Error fetching presentlearning:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Admin login
app.post('/adminn', (req, res) => {
    const { username_email, password } = req.body;
    connection.query(
        "SELECT * FROM admin WHERE username_email = ? AND password = ?",
        [username_email, password],
        (error, results) => {
            if (error) {
                console.error('Error during admin login:', error);
                return res.status(500).send('Database error');
            }
            res.send({ status: results.length > 0 });
        }
    );
});

// Add student details
app.post('/StudentDetails', (req, res) => {
    const { Name, Language_Opted, imageURL } = req.body;
    const sql = 'INSERT INTO studentenrooll (Name, Language_Opted, imageURL) VALUES (?, ?, ?)';
    connection.query(sql, [Name, Language_Opted, imageURL], (error) => {
        if (error) {
            console.error('Error inserting student:', error);
            return res.status(500).send('Database error');
        }
        res.send('Student Enrolled successfully');
    });
});

// Delete student details
app.post('/StudentDetailsDelete', (req, res) => {
    const { Name } = req.body;
    const sql = 'DELETE FROM studentenrooll WHERE Name = ?';
    connection.query(sql, [Name], (error) => {
        if (error) {
            console.error('Error deleting student:', error);
            return res.status(500).send('Database error');
        }
        res.send('Student deleted successfully');
    });
});

// View all student details
app.get('/StudentDetailsView', (req, res) => {
    const sql = 'SELECT * FROM studentenrooll';
    connection.query(sql, (error, result) => {
        if (error) {
            console.error('Error fetching students:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Get all teacher names
app.get('/teachlang', (req, res) => {
    connection.query('SELECT Name FROM testing1', (error, results) => {
        if (error) {
            console.error('Error fetching teacher names:', error);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Update student profile email
app.post('/updatestudentprofile', (req, res) => {
    const { studentid, email } = req.body;
    const update = "UPDATE studentprofile SET email = ? WHERE studentid = ?";
    connection.query(update, [email, studentid], (error) => {
        if (error) {
            console.error('Error updating student profile:', error);
            return res.status(500).send('Database error');
        }
        res.send('Data updated successfully');
    });
});

// Student signup
app.post('/kalu3signup', (req, res) => {
    const { uname, email, password } = req.body;
    const sql = 'INSERT INTO studentlogin (uname, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [uname, email, password], (error) => {
        if (error) {
            console.error('Error inserting student login:', error);
            return res.status(500).send('Database error');
        }
        const sql1 = 'INSERT INTO studentprofile (uname, email) VALUES (?, ?)';
        connection.query(sql1, [uname, email], (error2) => {
            if (error2) {
                console.error('Error inserting student profile:', error2);
                return res.status(500).send('Database error');
            }
            res.send('Signup details inserted');
        });
    });
});

// Student login
app.post('/kalu3login', (req, res) => {
    const { email, password } = req.body;
    connection.query(
        "SELECT * FROM studentlogin WHERE email = ? AND password = ?",
        [email, password],
        (error, results) => {
            if (error) {
                console.error('Error during student login:', error);
                return res.status(500).send('Database error');
            }
            res.send({ status: results.length > 0 });
        }
    );
});

// Student profile update check
app.post('/studentprofileupdate', (req, res) => {
    const { uname, email, studentid } = req.body;
    connection.query(
        "SELECT * FROM studentprofile WHERE uname = ? AND email = ? AND studentid = ?",
        [uname, email, studentid],
        (error, results) => {
            if (error) {
                console.error('Error during student profile update check:', error);
                return res.status(500).send('Database error');
            }
            res.send({ status: results.length > 0 });
        }
    );
});

// Fetch student profile by id
app.get('/getStudentProfile/:id', (req, res) => {
    const studentId = req.params.id;
    connection.query('SELECT * FROM studentprofile WHERE studentid = ?', [studentId], (err, result) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.send(result[0]);
    });
});

// Update student profile by id
app.post('/updateStudentProfile/:id', (req, res) => {
    const studentId = req.params.id;
    const { email, name, mobileNo, studentClass, location } = req.body;
    connection.query(
        'UPDATE studentprofile SET email = ?, uname = ?, mobileno = ?, batch = ?, location = ? WHERE studentid = ?',
        [email, name, mobileNo, studentClass, location || '', studentId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }
            res.send({ message: 'Profile updated successfully' });
        }
    );
});

// Get student profile by email
app.post('/selectstudentprofile', (req, res) => {
    const { email } = req.body;
    const sql = 'SELECT * FROM studentprofile WHERE email = ?';
    connection.query(sql, [email], (error, result) => {
        if (error) {
            console.error('Error fetching student profile:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Get all languages
app.get('/select', (req, res) => {
    connection.query('SELECT lang_name FROM languages', (error, results) => {
        if (error) {
            console.error('Error fetching languages:', error);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Show single language (example for English)
app.get('/kalu3showsingle', (req, res) => {
    const sql = "SELECT * FROM mylanguages WHERE languagename = 'English'";
    connection.query(sql, (error, result) => {
        if (error) {
            console.error('Error fetching language:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Teacher signup
app.post('/teachersignup', (req, res) => {
    const { uname, email, password } = req.body;
    const sql = 'INSERT INTO teacherlogin (uname, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [uname, email, password], (error) => {
        if (error) {
            console.error('Error inserting teacher login:', error);
            return res.status(500).send('Database error');
        }
        const sql1 = 'INSERT INTO teacherprofile (uname, email, mobileno, batch, languages, certification, location) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(sql1, [uname, email, '', '', '', '', ''], (error2) => {
            if (error2) {
                console.error('Error inserting teacher profile:', error2);
                return res.status(500).send('Database error');
            }
            res.send({ status: true });
        });
    });
});

// Teacher login
app.post('/kalu4login', (req, res) => {
    const { email, password } = req.body;
    connection.query(
        "SELECT * FROM teacherlogin WHERE email = ? AND password = ?",
        [email, password],
        (error, results) => {
            if (error) {
                console.error('Error during teacher login:', error);
                return res.status(500).send('Database error');
            }
            res.send({ status: results.length > 0 });
        }
    );
});

// View all teacher details
app.get('/TeacherDetailsView', (req, res) => {
    const sql = 'SELECT * FROM teacherenroll';
    connection.query(sql, (error, result) => {
        if (error) {
            console.error('Error fetching teacher details:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Fetch meeting link
app.post('/linkfetch', (req, res) => {
    const { name2 } = req.body;
    connection.query("SELECT meetinglink FROM appointments WHERE uname = ?", [name2], (error, results) => {
        if (error) {
            console.error('Error fetching meeting link:', error);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Request appointment
app.post('/request-appointment', (req, res) => {
    const { start, end, status, description, uname, email, language } = req.body;
    if (!start || !end) {
        return res.status(400).json({ message: "Please ensure that you send a legal range of time" });
    }
    
    // Look up a teacher for the requested language
    const searchLang = `%${language || ''}%`;
    connection.query('SELECT uname, email FROM teacherprofile WHERE LOWER(languages) LIKE LOWER(?) LIMIT 1', [searchLang], (error, teacherRes) => {
        let teacher_name = null;
        let teacher_email = null;
        if (!error && teacherRes && teacherRes.length > 0) {
            teacher_name = teacherRes[0].uname;
            teacher_email = teacherRes[0].email;
        }

        const sql = 'INSERT INTO appointments (start, end, status, description, uname, email, language, teacher_name, teacher_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            start, 
            end, 
            status || 'pending', 
            description || '', 
            uname || '', 
            email || '', 
            language || '',
            teacher_name,
            teacher_email
        ];
        connection.query(sql, values, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.status(200).json({ message: "Appointment Request Sent Successfully" });
        });
    });
});

// Fetch appointments for a user
app.post('/fetch-appointments', (req, res) => {
    const { name2, email2 } = req.body;
    connection.query('SELECT * FROM appointments WHERE uname = ? AND email = ?', [name2, email2], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({ message: "Requests Fetched Successfully", appointments: results });
    });
});

// Fetch all appointments for teacher (supports both GET and POST)
app.get('/fetch-appointments-teacher', (req, res) => {
    connection.query('SELECT * FROM appointments', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({ message: "Requests Fetched Successfully", appointments: results });
    });
});

app.post('/fetch-appointments-teacher', (req, res) => {
    connection.query('SELECT * FROM appointments', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({ message: "Requests Fetched Successfully", appointments: results });
    });
});

// Fetch description (alias for fetch-appointments-teacher)
app.post('/fetch-description', (req, res) => {
    connection.query('SELECT * FROM appointments', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({ message: "Requests Fetched Successfully", appointments: results });
    });
});

// Delete appointment (set status to rejected)
app.post('/delete-appointment', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Enter a Valid ID" });
    }
    connection.query('UPDATE appointments SET status = ? WHERE id = ?', ['rejected', id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        connection.query('SELECT * FROM appointments WHERE id = ?', [id], (err2, results) => {
            if (err2) {
                console.error(err2);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.status(200).json({ message: "Rejected", updatedAppointment: results[0] });
        });
    });
});

// Accept appointment (set status to accepted)
app.post('/accept-appointment', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Please Enter a Valid Appointment" });
    }
    connection.query('UPDATE appointments SET status = ? WHERE id = ?', ['accepted', id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        connection.query('SELECT * FROM appointments WHERE id = ?', [id], (err2, results) => {
            if (err2) {
                console.error(err2);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.status(200).json({ message: "Appointment Accepted Successfully...", updatedAppointment: results[0] });
        });
    });
});

// Validate user
app.post('/valid', (req, res) => {
    const { id, username, password } = req.body;
    connection.query(
        "SELECT * FROM table1 WHERE id = ? AND username = ? AND password = ?",
        [id, username, password],
        (error, results) => {
            if (error) {
                console.error('Error during validation:', error);
                return res.status(500).send('Database error');
            }
            res.send({ status: results.length > 0 });
        }
    );
});

// Send meeting link
app.post('/send-link', (req, res) => {
    const { link, emaill } = req.body;
    connection.query(
        "UPDATE appointments SET meetinglink = ? WHERE status = 'accepted' AND email = ?",
        [link, emaill],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.status(200).json({ message: "Link sent successfully", appointments: results });
        }
    );
});

// Validate user (selectvalid)
app.post('/selectvalid', (req, res) => {
    const { id, username, password } = req.body;
    const sql = 'SELECT * FROM table1 WHERE id = ? AND username = ? AND password = ?';
    connection.query(sql, [id, username, password], (error, result) => {
        if (error) {
            console.error('Error during selectvalid:', error);
            return res.status(500).send('Database error');
        }
        res.json(result);
    });
});

// Fetch all appointments for a user to show in present learning
app.post('/presentlearn', (req, res) => {
    const { email2, name2 } = req.body;
    connection.query(
        "SELECT * FROM appointments WHERE email = ? AND uname = ? ORDER BY id DESC",
        [email2, name2],
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Database error');
            }
            res.json(results);
        }
    );
});

// Fetch material images
app.post('/imgfetch', (req, res) => {
    const { image, chapter } = req.body || {};
    let sql = 'SELECT * FROM materialfetch';
    let params = [];
    if (image && chapter) {
        sql = 'SELECT * FROM materialfetch WHERE image = ? AND chapter = ?';
        params = [image, chapter];
    }
    connection.query(sql, params, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// ============================================
// ADMIN CRUD AND CONFIGURATION ENDPOINTS
// ============================================

// Get all student profiles for admin
app.get('/api/admin/students', (req, res) => {
    connection.query('SELECT * FROM studentprofile', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Delete a student profile and their login
app.delete('/api/admin/students/:id', (req, res) => {
    const studentId = req.params.id;
    connection.query('SELECT email FROM studentprofile WHERE studentid = ?', [studentId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        const email = results[0] ? results[0].email : null;
        connection.query('DELETE FROM studentprofile WHERE studentid = ?', [studentId], (err2) => {
            if (err2) {
                console.error(err2);
                return res.status(500).send('Database error');
            }
            if (email) {
                connection.query('DELETE FROM studentlogin WHERE email = ?', [email], (err3) => {
                    if (err3) console.error('Error deleting student login:', err3);
                });
            }
            res.send({ status: true, message: 'Student deleted successfully' });
        });
    });
});

// Get all teacher profiles for admin
app.get('/api/admin/teachers', (req, res) => {
    connection.query('SELECT * FROM teacherprofile', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Update teacher profile from admin
app.post('/api/admin/teachers/update/:id', (req, res) => {
    const teacherId = req.params.id;
    const { uname, email, mobileno, batch, languages, certification, location } = req.body;
    connection.query(
        'UPDATE teacherprofile SET uname = ?, email = ?, mobileno = ?, batch = ?, languages = ?, certification = ?, location = ? WHERE teacherid = ?',
        [uname, email, mobileno, batch, languages, certification, location, teacherId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }
            res.send({ status: true, message: 'Teacher updated successfully' });
        }
    );
});

// Delete a teacher profile and their login
app.delete('/api/admin/teachers/:id', (req, res) => {
    const teacherId = req.params.id;
    connection.query('SELECT email FROM teacherprofile WHERE teacherid = ?', [teacherId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        const email = results[0] ? results[0].email : null;
        connection.query('DELETE FROM teacherprofile WHERE teacherid = ?', [teacherId], (err2) => {
            if (err2) {
                console.error(err2);
                return res.status(500).send('Database error');
            }
            if (email) {
                connection.query('DELETE FROM teacherlogin WHERE email = ?', [email], (err3) => {
                    if (err3) console.error('Error deleting teacher login:', err3);
                });
            }
            res.send({ status: true, message: 'Teacher deleted successfully' });
        });
    });
});

// Add a language from admin
app.post('/api/admin/add-language', (req, res) => {
    const { name, image } = req.body;
    connection.query('INSERT INTO testlanguage (languages, imageURL) VALUES (?, ?)', [name, image || '/image/default.png'], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.send({ status: true, message: 'Language added successfully' });
    });
});

// Drop a language from admin
app.post('/api/admin/drop-language', (req, res) => {
    const { languageId } = req.body;
    connection.query('DELETE FROM testlanguage WHERE languageId = ?', [languageId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.send({ status: true, message: 'Language dropped successfully' });
    });
});

// Change admin password
app.post('/api/admin/change-password', (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    connection.query('SELECT * FROM admin WHERE username_email = ? AND password = ?', [email, currentPassword], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        if (results.length === 0) {
            return res.send({ status: false, message: 'Incorrect current password' });
        }
        connection.query('UPDATE admin SET password = ? WHERE username_email = ?', [newPassword, email], (err2) => {
            if (err2) {
                console.error(err2);
                return res.status(500).send('Database error');
            }
            res.send({ status: true, message: 'Password changed successfully' });
        });
    });
});

// Add review
app.post('/reviews', (req, res) => {
    const { userName, reviewText } = req.body;
    const sql = "INSERT INTO reviews (reviewss) VALUES (?)";
    connection.query(sql, [reviewText], (err) => {
        if (err) {
            console.error("Error inserting review:", err);
            return res.status(500).send("Error submitting review");
        }
        res.status(200).send("Review submitted successfully");
    });
});

// ============================================
// TEACHER STUDY MATERIAL UPLOADS & MANAGEMENT
// ============================================

// Upload study material
app.post('/api/teacher/upload-material', (req, res) => {
    const { teacher_email, student_email, title, file_path } = req.body;
    const sql = 'INSERT INTO teacher_materials (teacher_email, student_email, title, file_path) VALUES (?, ?, ?, ?)';
    connection.query(sql, [teacher_email, student_email, title, file_path], (err, result) => {
        if (err) {
            console.error('Error uploading material:', err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json({ message: "Study material uploaded successfully" });
    });
});

// Fetch teacher's uploaded materials
app.get('/api/teacher/materials', (req, res) => {
    const { teacher_email } = req.query;
    const sql = 'SELECT * FROM teacher_materials WHERE teacher_email = ? ORDER BY id DESC';
    connection.query(sql, [teacher_email], (err, results) => {
        if (err) {
            console.error('Error fetching teacher materials:', err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results);
    });
});

// Delete teacher's uploaded material
app.delete('/api/teacher/materials/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM teacher_materials WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting material:', err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json({ message: "Material deleted successfully" });
    });
});

// Fetch student personalized materials
app.get('/api/student/my-materials', (req, res) => {
    const { email } = req.query;
    const sql = 'SELECT * FROM teacher_materials WHERE student_email = ? OR student_email = ? ORDER BY id DESC';
    connection.query(sql, [email, 'All'], (err, results) => {
        if (err) {
            console.error('Error fetching student materials:', err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results);
    });
});

// ============================================
// STUDENT REVIEWS & WISH TEACHER SYSTEM
// ============================================

// Submit a student review or wish/greeting
app.post('/api/student/submit-review', (req, res) => {
    const { student_name, student_email, teacher_email, review_text, review_type } = req.body;
    const sql = 'INSERT INTO student_reviews (student_name, student_email, teacher_email, review_text, review_type) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [student_name, student_email, teacher_email, review_text, review_type || 'Review'], (err, result) => {
        if (err) {
            console.error('Error submitting student review:', err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json({ message: "Review/Greeting submitted successfully" });
    });
});

// Fetch reviews and wishes for a teacher
app.get('/api/teacher/reviews', (req, res) => {
    const { teacher_email } = req.query;
    const sql = 'SELECT * FROM student_reviews WHERE teacher_email = ? ORDER BY id DESC';
    connection.query(sql, [teacher_email], (err, results) => {
        if (err) {
            console.error('Error fetching teacher reviews:', err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results);
    });
});

// Fetch all registered teachers for review selection
app.get('/api/student/my-teachers', (req, res) => {
    const sql = 'SELECT uname, email, languages, location FROM teacherprofile';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching teachers list:', err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
