const express = require('express');
const bodyParser = require('body-parser');
const addSchool = require('./routes/addSchool');
const listSchools = require("./routes/listSchools")

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/addSchool', addSchool);
app.use('/listSchools', listSchools);

const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
