const express = require("express")
const app = express()

const baybayin = {
	"A": "ᜀ", "E": "ᜁ", "O": "ᜂ",
	"e": "ᜒ", "o": "ᜓ", "v": "᜔", "b": "ᜊ", "c": "ᜃ", "k": "ᜃ", "d": "ᜇ",
	"g": "ᜄ", "h": "ᜑ", "l": "ᜎ", "m": "ᜋ", "n": "ᜈ",
	"ng": "ᜅ", "p": "ᜉ", "s": "ᜐ",
	"t": "ᜆ", "w": "ᜏ", "y": "ᜌ",
	",": "᜵", ".": "᜶", " ": " "
}

const port = process.env.PORT || 3000

function transliterate(insert){
	let text = insert.replace(/i/gi, "e").replace(/u/gi, "o").replace(/r/gi, "d").replace(/j/gi, "dy").replace(/v/gi, "b").replace(/x|z/gi, "s").replace(/q/gi, "k").replace(/f/gi, "p").replace(/\s/gi, " ").toLowerCase()
	let result = ""
	for(let i = 0; i < text.length; i++){
		if(i < (text.length - 1)){
			if(text[i] == "a"){
				result += baybayin.A
			}else if(text[i] == "e"){
				result += baybayin.E
			}else if(text[i] == "o"){
				result += baybayin.O
			}else if(text[i] == " "){
				result += " "
			}else if(text[i + 1] == "a"){
				result += fha(text[i], text[i + 1])
				i++
			}else if(text[i + 1] == "e"){
				result += fhe(text[i], text[i + 1])
				i++
			}else if(text[i + 1] == "o"){
				result += fho(text[i], text[i + 1])
				i++
			}else if(text[i] == "n" && text[i + 1] == "g"){
				if(text[i + 2] == "a"){
					result += baybayin.ng
					i += 2
				}else if(text[i + 2] == "e"){
					result += baybayin.ng + baybayin.e
					i += 2
				}else if(text[i + 2] == "o"){
					result += baybayin.ng + baybayin.o
					i += 2
				}else if(text[i + 2] == " "){
					result += baybayin.n + baybayin.ng + baybayin.v + " "
					i += 2
				}else{
					result += baybayin.ng + baybayin.v
					i++
				}
			}else if(text[i] == "c" && text[i + 1] == "h"){
				if(text[i + 2] == "a"){
					result += baybayin.t + baybayin.v + baybayin.y
					i += 2
				}else if(text[i + 2] == "e"){
					result += baybayin.t + baybayin.v + baybayin.y + baybayin.e
					i += 2
				}else if(text[i + 2] == "o"){
					result += baybayin.t + baybayin.v + baybayin.y + baybayin.o
					i += 2
				}else{
					result += baybayin.t + baybayin.v + baybayin.y
					i++
				}
			}else{
				if(text[i] != "." && text[i] != "," && text[i] != " "){
					result += fhv(text[i], text[i + 1])
				}else{
					result += baybayin[text[i]]
				}
			}
		}else{
			if(text[i] == "a"){
				result += baybayin.A
			}else if(text[i] == "e"){
				result += baybayin.E
			}else if(text[i] == "o"){
				result += baybayin.O
			}else{
				if((text[i - 1] != "n" || text[i] != "g") && text[i] != "." && text[i] != "," && text[i] != " "){
					result += baybayin[text[i]] + baybayin.v
				}else{
					result += baybayin[text[i]]
				}
			}
		}
	}
	return result
}

function fha(a, b){
	if(a != "a" && a != "e" && a != "o" && b == "a"){
		return baybayin[a]
	}
}
function fhe(a, b){
	if(a != "a" && a != "e" && a != "o" && b == "e"){
		return baybayin[a] + baybayin.e
	}
}
function fho(a, b){
	if(a != "a" && a != "e" && a != "o" && b == "o"){
		return baybayin[a] + baybayin.o
	}
}
function fhv(a, b){
	if(a != "a" && a != "e" && a != "o" && b != "a" && b != "e" && b != "o"){
		return baybayin[a] + baybayin.v
	}
}


app.get("/", (req, res) => {
	//res.send("Hello")
	if(req.query.text == undefined){
		res.sendFile(__dirname + "/baybay.html")
	}else{
		let r = req.query.text
		let json = {
			"baybay": transliterate(r)
		}
		res.send(JSON.stringify(json))
	}
})

app.listen(port, () => {
	console.log("Listening to a port: " + port)
})

module.exports = app
