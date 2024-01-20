const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const PORT = 3001

const articleRoutes = require('./routes/articleRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/articles', articleRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
