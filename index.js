const express = require("express")
const app = express()

const baybayin = require("./process")

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
	if(req.query.text){
		res.send(JSON.stringify(baybayin(req.query.text)))
	}else{
		res.sendFile(`${__dirname}/baybay.html`)
	}
})

app.listen(port, () => {
	console.log("Listening to a port: " + port)
})

module.exports = app
