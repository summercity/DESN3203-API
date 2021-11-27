var express = require('express');
var app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
var fs = require('fs'); //require fs module

const contactJSon = fs.readFileSync('contacts.json', 'utf-8');
let obj = JSON.parse(contactJSon);

app.listen(process.env.PORT || 5000, () => {
 console.log("Server running on port 8000");
});

app.get("/api", (req, res, next) => {
    res.json(["Author: Jan Dave Arce"]);
});

app.post('/api/contact', function (req, res) {
	const contact = {
		id: obj.length + 1,
		email: req.body.email,
        name: req.body.name,
        message: req.body.message,
	};
	obj.push(contact);
	fs.writeFileSync('contacts.json', JSON.stringify(obj));
	res.send(contact);
});