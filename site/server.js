const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const dataPath = path.join(__dirname, 'users.json');

app.get('/users', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data || '[]'));
    });
});

app.post('/signup', (req, res) => {
    const newUser = req.body;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        const users = JSON.parse(data || '[]');
        users.push(newUser);
        fs.writeFile(dataPath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data');
            }
            res.status(201).send('User signed up successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});