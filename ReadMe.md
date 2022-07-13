### Baybayin Transliterator API
##### MPOP Reverse II
---
> Since I try to create an API using NodeJs and Vercel, I create Baybayin Transliterator API just to test my skills in making some algorithms.
---
#### How to Use?
> First is you need to call the url, with the GET method with text as key, just like the example below. It returns as a JSON and the key to call is baybay.
---
#### URL to call

[https://api-baybayin-transliterator.vercel.app](https://api-baybayin-transliterator.vercel.app)
---
#### Example NodeJs (Axios)
``` NodeJs (Axios)
const axios = require("axios")

async function transliterate(text){
	let result = await axios.get("https://api-baybayin-transliterator.vercel.app/?text=" + text).then((r) => {  
		return r.data
	}).catch((e) => {
		console.error("Error [Baybayin API]: " + e)
		return null
	})
	return result
}

module.exports = async (data) => {
	let result = await transliterate(data)
	console.log(result)
}
```
---
#### Result
``` JSON
{
	"baybay": "Baybayin Characters here"
}
```
---
#### Notice feedbacks and contact
> If you found any error regarding this api, kindly email me @ [mailto:weryses19@gmail.com](weryses19@gmail.com) with the screenshot attached of a particular error. This api is still in development, so expect some bugs.