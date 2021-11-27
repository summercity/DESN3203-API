var express = require('express');
var app = express();

app.listen(8000, () => {
 console.log("Server running on port 8000");
});

app.get("/api", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});