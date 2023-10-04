const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const log = require("./logs/logs");

require("dotenv").config();
const port = process.env.PORT || 5000;

// !important!
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv

app.get("/", (req, res) => {
  res.send("SecurOS Enterprise - D-Fense Integration V1.0");
});


function isAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (auth === 'Basic aXNzOmlzcw==') {
    next();
  } else {
    res.status(401);
    res.send('Access forbidden');
  }
}

app.post("/dfense",isAuth, (req, res) => {

  if (!isObjectEmpty(req.body)) {
    console.log(req);
    let response = {};
    response.data = req.body;
    response.status = "Received";
    response.date = time();
    log.Write(JSON.stringify(response), "INFO", "dfense.index");
    res.send(response);
    return;
  }

  res.send("empty");
});

const isObjectEmpty = (objectName) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);

const time = () => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  return date_ob.toLocaleString()
};
