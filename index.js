const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config()
const port = process.env.PORT || 5000

// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 

app.get('/', (req, res) => {

    res.send('SecurOS Enterprise - D-Fense Integration V1.0')

})
app.post('/dfense', (req, res) => {

    res.send('hello from simple server :)')

})





app.listen(port, () => console.log('> Server is up and running on port : ' + port))