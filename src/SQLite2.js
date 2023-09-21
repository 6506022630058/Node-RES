const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
app.use(express.json());

const db1 = new sqlite3.Database('./Database/std_db.sqlite');
db1.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    name TEXT
)`);

app.get('/students', (req, res) => {
    db1.all('SELECT * FROM students', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/students/:id', (req, res) => {
    db1.get('SELECT * FROM students WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Student not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/students', (req, res) => {
    const student = req.body;
    db1.run('INSERT INTO students (name) VALUES (?)', student.name, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            student.id = this.lastID;
            res.send(student);
        }
    });
});

app.put('/students/:id', (req, res) => {
    const student = req.body;
    db1.run('UPDATE students SET name = ? WHERE id = ?', student.name, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(student);
        }
    });
});

app.delete('/students/:id', (req, res) => {
    db1.run('DELETE FROM students WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

//<!-----------------------------------------------------!>//

const db2 = new sqlite3.Database('./Database/crs_db.sqlite');
db2.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    name TEXT
)`);

app.get('/courses', (req, res) => {
    db2.all('SELECT * FROM courses', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/courses/:id', (req, res) => {
    db2.get('SELECT * FROM courses WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Course not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/courses', (req, res) => {
    const course = req.body;
    db2.run('INSERT INTO courses (name) VALUES (?)', course.name, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            course.id = this.lastID;
            res.send(course);
        }
    });
});

app.put('/courses/:id', (req, res) => {
    const course = req.body;
    db2.run('UPDATE courses SET name = ? WHERE id = ?', course.name, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(course);
        }
    });
});

app.delete('/courses/:id', (req, res) => {
    db2.run('DELETE FROM courses WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

//<!-----------------------------------------------------!>//

const db3 = new sqlite3.Database('./Database/stdcrs_db.sqlite');
db3.run(`CREATE TABLE IF NOT EXISTS std_crss (
    id INTEGER PRIMARY KEY,
    std_id INTEGER,
    crs_id INTEGER
)`);

app.get('/std_crss', (req, res) => {
    db3.all('SELECT std_id, crs_id FROM std_crss', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/std_crss/:id', (req, res) => {
    db3.get('SELECT * FROM std_crss WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Student-Course not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/std_crss', (req, res) => {
    const std_crs = req.body;
    db3.run('INSERT INTO std_crss (std_id, crs_id) VALUES (?, ?)', std_crs.std_id, std_crs.crs.id , function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            std_crs.id = this.lastID;
            res.send(std_crs);
        }
    });
});

app.put('/std_crss/:id', (req, res) => {
    const std_crs = req.body;
    db3.run('UPDATE std_crss SET std_id = ?, crs_id = ?  WHERE id = ?', std_crs.std_id, std_crs.crs_id , req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(std_crs);
        }
    });
});

app.delete('/std_crss/:id', (req, res) => {
    db3.run('DELETE FROM std_crss WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening of port ${port}...`));