const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const supplier = require("./app/controller/supplier.controller");
const app = express();
const mustacheExpress = require("mustache-express")
const favicon = require('serve-favicon');

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.options("*", cors());
app.engine("html", mustacheExpress())
app.set("view engine", "html")
app.set("views", __dirname + "/views")
app.use(express.static('public'));
app.use(favicon(__dirname + "/public/img/favicon.ico"));

// list all the suppliers
app.get("/admin", (req, res) => {
    res.render("home", {});
});
app.get("/admin/suppliers/", supplier.findAll);
// show the add suppler form
app.get("/admin/supplier-add", (req, res) => {
    res.render("supplier-add", {});
});
// receive the add supplier POST
app.post("/admin/supplier-add", supplier.create);
// show the update form
app.get("/admin/supplier-update/:id", supplier.findOne);
// receive the update POST
app.post("/admin/supplier-update", supplier.update);
// receive the POST to delete a supplier
app.post("/admin/supplier-remove/:id", supplier.remove);
// handle 404
app.use(function (req, res, next) {
    res.status(404).render("404", {});
})


// set port, listen for requests
const app_port = process.env.APP_PORT || 8081
app.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}.`);
});