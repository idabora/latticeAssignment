const express = require('express');
const app = express();
const multer = require('multer')
require('./DB/connection')
app.use(express.json());

const PORT = process.env.PORT || 3030;
const routes = require('./routes/hospitalRoutes')

app.use("/api", routes)
app.get("/", (req, res) => {
  res.send("Testing")
})

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    // Handle Mongoose validation errors
    const errors = Object.values(err.errors).map(error => error.message);
    res.status(400).json({ success: false, error: 'Validation Error', details: errors });
  } else if (err.name === 'MongoError' && err.code === 11000) {
    // Handle Mongoose duplicate key error
    res.status(400).json({ success: false, error: 'Duplicate Key Error', details: err.message });
  } else if (err instanceof multer.MulterError) {
    // Multer error 
    res.status(400).json({ success: false, error: 'File upload error', details: err.message });
  } else {
    // Handle other types of errors
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})