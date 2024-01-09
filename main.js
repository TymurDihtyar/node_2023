const express = require('express');
const path = require('path')
const fs = require('fs')

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const mainPath = path.join(__dirname, 'users.json')

let users = []

fs.readFile(mainPath, (err, data) => {
    if (err) {
        console.log(err);
    }
    users = JSON.parse(data)
})

app.get('/users', (req, res) => {
    fs.readFile(mainPath, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Problem with server file');
        }
        res.json(JSON.parse(data))
        users = JSON.parse(data)
    })
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    const userIndex = users.findIndex((user) => user.id === +userId);

    if (userIndex >= 0) {
        res.json(users[userIndex])
    } else {
        res.send('no User with this id')
    }
})


app.post('/users', (req, res) => {
    const newData = req.body;

    if (newData.name.length >= 3 && newData.age > 0) {
        users.push(newData)
        fs.writeFile(mainPath, JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Problem with server file')
            }
            res.send('User Add to file')
        })
    } else {
        res.status(400).send('User name must have > 3 letters and age must be > 0')
    }
})

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;

    const userIndex = users.findIndex((user) => user.id === +userId);

    if (userIndex > 0) {
        users.splice(userIndex, 1)

        fs.writeFile(mainPath, JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Problem with server file')
            } else {
                res.status(200).send('User deleted')
            }
        })
    } else {
        res.status(400).send('User is not found')
    }
})

app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const newData = req.body;

    if (newData.name.length >= 3 && newData.age > 0) {

        const userIndex = users.findIndex((user) => user.id === +userId);

        if (userIndex > 0) {
            users[userIndex] = newData

            fs.writeFile(mainPath, JSON.stringify(users), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Problem with server file')
                } else {
                    res.status(200).send('User replace')
                }
            })
        } else {
            res.status(400).send('User is not found')
        }
    } else {
        res.status(400).send('User name must have > 3 letters and age must be > 0')
    }
})

app.listen(port, () => {
    console.log(`Сервер слухає на порту ${port}`);
});

