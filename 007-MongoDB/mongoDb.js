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
*/
