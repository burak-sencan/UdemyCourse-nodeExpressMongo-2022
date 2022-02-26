/* 1) Express.js nedir?
node.js'in üzerine kurulmus minimal frameworktür
complex routing, kolay req,res, middleware,
server-side rendering yapabilmeyi kolaylaştırır.
 */

/* 2) Postman
Html render etmeden, api test için kullanılır. 
https://www.postman.com/downloads/
*/

// 3) demo api
// const express = require("express")
// const app = express()
// const PORT = 3000

// app.get("/", (req, res) => {
//   // res.status(200).send("Hello from the server side!")
//   res.status(200).json({ message: "Hello from the server side!", app: "Api-demo" })
// })

// app.post("/", (req, res) => {
//   res.send("You can post to this enpoint.")
// })

// app.listen(PORT, () => {
//   console.log(`App running on ${PORT}`)
// })

// 4) APIs and RESTful API Design
/*
Application Programing Interface
i)web APIs: clientler ile veri alışverişi için
  database <=> jsondata <=> API <=>
ii) nodeApi : fs, http gibi modullerin kullanıldıgı api
iii) browsers DOM js API: js kullanmadan dom manipulation 
iv) oopAPI: java c# gibi dillerde public classlarda json oluşturup
  diğer programlarla veri alışverişi 


REST representational states transfer Architecture:
basitçe mantıksal yoldan web APIs geliştirme yoludur.
Restful APIs nin birkaç prensibi vardır(architecture).
 i) api mantıksal kaynaklara göre ayırılmalı:
      kaynak: Object veya obje ile ilişkili veriye sahip olan şey
      örnegin tours, users, reviews

 ii) Url yapısı resource-based url olmalı alttaki gibi fill içeren endpointler içermemeli
      http://www.natours.com/addNewTour
                            /getTour
                            /updateTour
                            /deleteTour
                            /getToursByUser 
     
 Bunun yerine:
 iii) http methodsları doğru şekilde kullanmalı
      http://www.natours.com/tours      ==> POST  create
                            /tours/id   ==> GET   read 
                            /tours/id   ==> PUT,PATCH   update
                            /tours/id   ==> DELETE delete 
                            /users/id/tours ==> getToursByUser yerine
 iv) veriyi JSON olarak göndermeli

 v) RESTful API, stateless olmalı. Yani tüm durumlar clientte çözülmeli, serverda değil
  state: uygulamadaki zamanal değişebilecek veri parçalarıdır.
  örneğin kullanıcı login oldugunda başka sayfaların gösterilmesi.
 Ayrıca server hiçbir zaman şimdiki çalısan proccess için, önceki requesti hatırlamamalı.
 yani  bir blog uygulamasında 5. sayfada olalım. sonraki sayfaya geçmek için  5+1 send olmamalı direk 6 gelmeli.

  */
const fs = require("fs")
const express = require("express")
const morgan = require("morgan")

const app = express()
const PORT = 3000

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`
  )
)

// 1) MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())
app.use((req, res, next) => {
  console.log("Hello from the middleware")
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime)
  //Jsend format
  res.status(200).json({
    status: "succes",
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  })
}
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  }
  res.status(204).json({
    status: "succes",
    data: null,
  })
}
const getTour = (req, res) => {
  console.log(req.params)
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  }
  res.status(200).json({
    status: "succes",
    data: {
      tour,
    },
  })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  console.log(tours[tours.length - 1].id)
  const newTour = Object.assign(
    { id: newId },
    req.body
  )
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "succes",
        data: {
          newTour,
        },
      })
    }
  )
}

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  }
  res.status(200).json({
    status: "succes",
    data: {
      tour: "<Updated your here>",
    },
  })
}

// 3) ROUTE
// app.get("/api/v1/tours", getAllTours)
// app.post("/api/v1/tours", createTour)
app
  .route("/api/v1/tours")
  .get(getAllTours)
  .post(createTour)

//getElementByid
// app.get("/api/v1/tours/:id", getTour)
// app.patch("/api/v1/tours/:id", updateTour)
// app.delete("/api/v1/tours/:id", deleteTour)
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

// 4) START SERVER
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})

/* 5) Middleware
req <=> res döngüsü arasında çalısan fonksiyonlardır
logging, session, veya farklı işlemler için kullanılır.
yukarıda middleware tanımlayalım. 81.satır.
middleware req ve res arasında çalışır bu şu demek
middlewareleri üste tanımlamalıyız  res bittikten sonra altta yazdıgımız
middleware fonksiyonları çalısmayacaktır.
çünkü req,res döngüsü bitmiş olacaktır.
*/
