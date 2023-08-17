const express = require("express")
const app = express()

const baybayin = require("./process")

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
	res.send(JSON.stringify(baybayin(req.query.text)))
})

app.listen(port, () => {
	console.log("Listening to a port: " + port)
})

module.exports = app
