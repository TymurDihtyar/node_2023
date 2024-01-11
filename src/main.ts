import express from 'express'
import {read, write} from './fs.service'

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
    try {
        const users = await read();
        res.status(200).json(users)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new Error('wrong ID param')
        }

        const users = await read();
        const index = users.findIndex((user) => user.id === id)
        if (index === -1) {
            throw new Error('user not found')
        }
        res.status(200).json(users[index])
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.post('/users', async (req, res) => {
    try {
        const {name, age, email} = req.body;
        if (!age || !Number.isInteger(age) || age < 0 || age > 100) {
            throw new Error('wrong age')
        }
        if (!email || !email.includes('@')) {
            throw new Error('wrong email')
        }
        if (!name || name.length <= 3) {
            throw new Error('wrong name')
        }

        const users = await read();
        const newUser = {id: users[users.length - 1].id + 1, name, age, email}
        users.push(newUser);

        await write(users);
        res.status(201).json(newUser)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            throw new Error('wrong ID param')
        }

        const users = await read();
        const index = users.findIndex((user) => user.id === id)
        if (index === -1) {
            throw new Error('user not found')
        }
        users.splice(index, 1)
        await write(users)
        res.status(204).json("User deleted")
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {name, age, email} = req.body;

        if (!Number.isInteger(id)) {
            throw new Error('wrong ID param')
        }
        if (!age || !Number.isInteger(age) || age < 0 || age > 100) {
            throw new Error('wrong age')
        }
        if (!email || !email.includes('@')) {
            throw new Error('wrong email')
        }
        if (!name || name.length <= 3) {
            throw new Error('wrong name')
        }

        const users = await read();
        const user = users.find((user) => user.id === id)
        if (!user) {
            throw new Error('user not found')
        }

        user.name = name
        user.age = age
        user.email = email

        await write(users)
        res.status(201).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.listen(port, () => {
    console.log(`Сервер слухає на порту ${port}`);
});

