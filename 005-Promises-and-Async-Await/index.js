const fs = require("fs")
const superagent = require("superagent")

//1) Callback Hell
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`)

  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
    if (err) return console.log(err.message)
    console.log(res.body.message)

    fs.writeFile("dog-img.txt", res.body.message, (err) => {
      if (err) return console.log(err.message)
      console.log("Random dog image saved to file(note1 callback)")
    })
  })
})
/* bu şekilde iç içe callbackler yazmak tercih edilmemeli. deeper durumunda
callback hell olacaktır. Bu noktada async programlama işimizi kolaylaştıracaktır.
promises(ES6) ve async(ES8) funksiyonlar vardır.
*/














//2) From Callback Hell to Promises
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`)

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message)

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log(err.message)
        console.log("Random dog image saved to file(note2 promise)")
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
})













//3) Building Promises
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("file not found.")
      resolve(data)
    })
  })
}

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("not writed.")
      resolve("succes")
    })
  })
}

readFilePro(`${__dirname}/dog.txt`).then((data) => {
  console.log(`Breed: ${data}`)
  return superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message)
      return writeFilePro("dog-img.txt", res.body.message)
    })
    .then(() => {
      console.log("Random dog image saved to file(note3 promises).")
    })
    .catch((err) => {
      console.log(err.message)
    })
})

/*readFilePro ve writeFilePro adında 2 promise kurduk.
readFile  bir promise döndürüyor. Bunu .then ile yakalıyoruz.
superagen bir dog promise'i döndürüyor bunu ikinci then ile yakalıyoruz.
writeFilePro bir promise döndürüyor bunu 3. then ile yakalıyoruz.
hata olursa catch ile tüm errları yönetebiliriyoruz.
*/
















//4) Async_Await (ES8)
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`)
    console.log(`Breed: ${data}`)

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    console.log(res.body.message)

    await writeFilePro("dog-img.txt", res.body.message)
    console.log("Random dog image saved to file(note4 async-await)")
  } catch (error) {
    console.log(error)
  }
}
getDogPic()







//5 Multiple async-await same time
const getDogPic2 = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`)
    console.log(`Breed: ${data}`)

    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)

    const all = await Promise.all([res1Pro,res2Pro,res3Pro])
    const imgs = all.map(el =>el.body.message)
    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs.join('\n'))
    console.log("Random dog image saved to file(note5 Multiple async-await)")
  } catch (error) {
    console.log(error)
  }
}
getDogPic2()

