const express = require('express');
const articleRoutes = require('./routes/articleRoutes')

const app = express()
const PORT = 3001

app.use('/api', articleRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
