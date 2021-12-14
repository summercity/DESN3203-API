var express = require('express');
var app = express();

var cors = require('cors');

app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
var fs = require('fs'); //require fs module

const contactJSon = fs.readFileSync('contacts.json', 'utf-8');
const employeeJSon = fs.readFileSync('employee.json', 'utf-8');
let obj = JSON.parse(contactJSon);
let objE = JSON.parse(employeeJSon);

app.listen(process.env.PORT || 5000, () => {
 console.log("Server running on port 5000");
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

    let validation = true;
    if (req.body.name == '' || !req.body.name) {
        validation = {...validation, name: "Please input your name!"}
    } else if (!isNaN(req.body.name.charAt(0))) {
        validation = {...validation, name: "Name should not start with number"}
    }
    if (req.body.email == '' || !req.body.email) {
        validation = {...validation, email: "Please input your e-mail!"}
    }
    if (req.body.message == '' || !req.body.message) {
        validation = {...validation, message: "Please input a message!"}
    }

    if (validation === true) {
        obj.push(contact);
	    fs.writeFileSync('contacts.json', JSON.stringify(obj));
    }

    res.send(validation);
    
});


app.get('/api/contact/all', function (req, res) {
    res.send(obj);
});

app.post('/api/employee', function (req, res) {
    
    const employee = {
		id: objE.length + 1,
		firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        profession: req.body.profession,
        salary: req.body.salary,
        company: req.body.company,
    };
    
    objE.push(employee);
    fs.writeFileSync('employee.json', JSON.stringify(objE));
    res.send(employee);
})


app.get('/api/employee/all', function (req, res) {
    res.send(objE);
});