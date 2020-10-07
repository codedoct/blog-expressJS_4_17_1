require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors()); // cors

app.use(bodyParser.json({ limit: '50mb' })); // read data request
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
