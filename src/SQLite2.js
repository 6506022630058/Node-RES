const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
app.use(express.json());

const db1 = new sqlite3.Database('./Database/rooms.sqlite');
db1.run(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY,
    name TEXT
)`);

app.get('/rooms', (req, res) => {
    db1.all('SELECT * FROM rooms', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/rooms/:id', (req, res) => {
    db1.get('SELECT * FROM rooms WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Room not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/rooms', (req, res) => {
    const room = req.body;
    db1.run('INSERT INTO rooms (name) VALUES (?)', room.name, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            room.id = this.lastID;
            res.send(room);
        }
    });
});

app.put('/rooms/:id', (req, res) => {
    const room = req.body;
    db1.run('UPDATE rooms SET name = ? WHERE id = ?', room.name, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(room);
        }
    });
});

app.delete('/rooms/:id', (req, res) => {
    db1.run('DELETE FROM rooms WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

//<!-----------------------------------------------------!>//

const db2 = new sqlite3.Database('./Database/people.sqlite');
db2.run(`CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY,
    name TEXT
)`);

app.get('/people', (req, res) => {
    db2.all('SELECT * FROM people', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/people/:id', (req, res) => {
    db2.get('SELECT * FROM people WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Person not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/people', (req, res) => {
    const person = req.body;
    db2.run('INSERT INTO people (name) VALUES (?)', person.name, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            person.id = this.lastID;
            res.send(person);
        }
    });
});

app.put('/people/:id', (req, res) => {
    const person = req.body;
    db2.run('UPDATE people SET name = ? WHERE id = ?', person.name, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(person);
        }
    });
});

app.delete('/people/:id', (req, res) => {
    db2.run('DELETE FROM people WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

//<!-----------------------------------------------------!>//

const db3 = new sqlite3.Database('./Database/renting.sqlite');
db3.run(`CREATE TABLE IF NOT EXISTS renting (
    id INTEGER PRIMARY KEY,
    r_id INTEGER,
    p_id INTEGER
)`);

app.get('/renting', (req, res) => {
    db3.all('SELECT * FROM renting', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/renting/:id', (req, res) => {
    db3.get('SELECT r_id, p_id FROM renting WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Rent not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/renting', (req, res) => {
    const rent = req.body;
    db3.run('INSERT INTO renting (r_id, p_id) VALUES (?, ?)', rent.r_id, rent.p_id , function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            rent.id = this.lastID;
            res.send(rent);
        }
    });
});

app.put('/renting/:id', (req, res) => {
    const rent = req.body;
    db3.run('UPDATE renting SET r_id = ?, p_id = ?  WHERE id = ?', rent.r_id, rent.p_id , req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rent);
        }
    });
});

app.delete('/renting/:id', (req, res) => {
    db3.run('DELETE FROM renting WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

//<!-----------------------------------------------------!>//

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening of port ${port}...`));