const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const uri = process.env.MONGO_ATLAS_URI
const JWT_SECRET = uuidv4()

// api/users/register
async function registerUser(req, res) {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide all the required fields' })
    }
    const client = new MongoClient(uri)
    try {
        // Connects to Database
        await client.connect()
        const db = client.db('app-data')
        const usersCollection = db.collection('users')

        // Checks if User already exists in Database
        const existingUser = await usersCollection.findOne({ $or: [{ username }, { email: email.toLowerCase() }] }) // Check if username or email exists
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' })
        }

        // Register User to Database
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword,
            isAdmin: false,
            favouriteSources: [],
            bookmarkedArticles: []
        }
        const insertedUser = await usersCollection.insertOne(newUser)

        const token = jwt.sign({ id: insertedUser.insertedId }, JWT_SECRET, { expiresIn: '72h' }) //JWT Token
        return res.status(200).json({ message: "User registered successfully!", insertedUser, token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Failed to register user! Please try again' })
    } finally {
        await client.close()
    }
}

// api/users/login
async function loginUser(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all the required fields' })
    }
    const client = new MongoClient(uri)
    try {
        //Connects to Database
        await client.connect()
        const db = client.db('app-data')
        const usersCollection = db.collection('users')

        //Finds User
        const user = await usersCollection.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(404).json({ message: 'User Was Not Found. Please Check your credentials or Register' })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password. Please try again!' })
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '72h' })
        return res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Failed to login. Please try again!' })
    } finally {
        await client.close()
    }
}

// api/users/all
async function getAllUsers(req, res) {
    const client = new MongoClient(uri)
    try {
        //Connects to Database
        await client.connect()
        const db = client.db('app-data')
        const usersCollection = db.collection('users')

        //Find All Users
        const users = await usersCollection.find({}).toArray()

        return res.status(200).json({ success: true, users: users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Failed to fetch Users.' })
    } finally {
        await client.close()
    }
}

module.exports = { registerUser, loginUser, getAllUsers }