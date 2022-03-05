/* 1) MongoDB
database ==> collection(tables) ==> documents(rows)
i)mongodb döküman tabanlı(json) bir databasedir
ii) scalabledir. birden çok makine arasında veriyi dagıtmak kolaydir.
iii) flextir. sqldeki gibi sabit solid schemalar yoktur.
iv) performantır. kullanımı kolay
v) open-source tır.

2) Documents yapısı 
relational databaselerdeki table'a karsılık gelir.
{
  "_id":ObjectID('123456789'),
  "comments":[
    {
      "id":1
      "text":"abcd"
    }
  ]
}

Keyler'e fields
alueler'e value denir. BSON denmiş ama aynı JSON
Üsteki bsonda comments'lere embedded documents denir.
BSON'lar(documents) max 16mb olabilir.
Her document unquie bir ObjectID'e sahip olmalıdır.



windows için yükleme yapıldı
0) mongod.exe ile server başşlatılır
i)komutlariçin cmd ile mongo.exe calıştırılır

show dbs
use natours-test   yoksa oluştur varsa onu kullan
db.tours.insertOne(
  {
    name : "deneme",
    price : 297,
    rating : 4.4
  }
)

ile natours collection'u içine tours document'i oluşturup
bu document'e üsteki BSON'u insert edecek.



3) Query
db.tours.find() ile tours collection'u içinde ki tüm documanları listeleyebiliyorduk.
sqldeki gibi query yazacagımız zaman
db.tours.find({name:"abc"}) ile WHERE gibi kullanabiliriz.

price'i 500den az olanlar veya lt less then kullanılabiir.
db.tours.find({price:{$lte:500}}) 

price'i500den az olan ve ratings'i 4den büyük olanlar.
db.tours.find( {price:{$lt:500},rating:{$gte:4} })

price'i 500den az olan veya ratings'i 5ten büyük olanlar
db.tours.find( {$or: [{price: {$lt:500}}, {rating: {$gte:5}} ] })

price'i 500den az olan veya ratings'i 5ten büyük olanların sadece adını getir. (views)
db.tours.find( {$or: [{price: {$lt:500}}, {rating: {$gte:5}} ] }, {name:1})



4)Updating  document 

eşleşen sadece 1. elemanın value'lerini varsa update yoksa yeni bir value oluşturacak
örneğin abc'de price yoktu updateOne ile price 600 ekledik.
db.tours.updateOne({name:"abc"},{$set:{price:600} })

price>500 and rating>4  ==> update premium=true
db.tours.updateMany(
    {
      price:{$gt:500},
      rating:{$gt:4}
    },
    {$set:{premium:true}
    }
)




5) Deleting documents
db.tours.deleteMany(
  {
    rating:{$gt:4.2}
  }
)

hepsini silecek
db.tours.deleteMany({})




6) Compass
GUI for mongoDB


7) Atlas AWS
*/
