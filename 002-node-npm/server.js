const fs = require("fs")
const http = require("http")
const slugify = require("slugify")

// //slugify use later
// console.log(slugify("BUYUK HARFLİ YAZI",{lower:true}));
// const slugs = dataObj.map(el=>{slugify(el.productName,{lower:true})})

///////////////////Files////////////////
//1) Blocking, synchronous way
//Reading data from file

// const textIn = fs.readFileSync("./text.txt","utf-8")
// console.log(textIn);

// //Write data to file
// const textOut = `This text came from index.js
// created on ${Date.now()}`
// fs.writeFileSync("./text.txt",textOut)
// console.log("Writed data");

/////////////////Server////////////////
// // servara her yeni requeste de bu basit response dönecek
// const server = http.createServer((req, res) => {
//   console.log(req.url)

//   const pathName = req.url
//   if (pathName === "/" || pathName === "/overview") {
//     res.end("this is the Overview")
//   } else if (pathName === "/product") {
//     res.end("this is the Product")
//   } else{
//     res.writeHead(404,{
//       "Content-type": "text/html",
//       "my-own-header":"hello-world"
//     })
//     res.end("<h1>Page Not Found </h1>")
//   }
// })

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to req on port 8000")
// })

// /////////////////// Static html files ////////////////
const overview = fs.readFileSync(`${__dirname}/templetes/index.html`, "utf-8")

const server = http.createServer((req, res) => {
  console.log(req.url)

  const pathName = req.url
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" })
    res.end(overview)
  } else if (pathName === "/product") {
    res.end("this is the Product")
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    })
    res.end("<h1>Page Not Found </h1>")
  }
})

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to req on port 8000")
})
