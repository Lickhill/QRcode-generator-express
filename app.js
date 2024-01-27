const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nocache = require("nocache");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(nocache());
app.use(express.static("public"));
app.use(express.static(__dirname + "/public/css"));

let inputext;
let filetext;

app.get("/", function (req, res) {
	res.set("Cache-Control", "no-store");
	res.render("home", { imageofqr: "", filetext: "" });
});

app.post("/", function (req, res) {
	inputext = req.body.text;
	filetext = req.body.file;
	res.set("Cache-Control", "no-store");
	if (inputext !== "") {
		res.render("home", {
			imageofqr:
				"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
				encodeURIComponent(inputext),
			filetext: "",
		});
	} else if (filetext !== "") {
		res.render("home", {
			filetext:
				"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
				encodeURIComponent(filetext),
			imageofqr: "",
		});
	} else {
		res.render("home", { imageofqr: "", filetext: "" });
	}
	inputext = "";
	filetext = "";
});
app.listen(3000, function () {
	console.log("Server is up and running");
});
