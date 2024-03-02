const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const PORT = 3001

const articleRoutes = require('./routes/articleRoutes')
const userRoutes = require('./routes/userRoutes')
const websitesRoutes = require('./routes/websitesRoutes')

const { fetchDataPeriodically } = require('./controllers/fetchCotroller')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/articles', articleRoutes)
app.use('/api/users', userRoutes)
app.use('/api/websites', websitesRoutes)

fetchDataPeriodically()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
