/*
  What happens when we acces a webpage

1) Browserdan google.com/maps sayfasınanı
aradıgımızda yazdıgımız url http veya https
protokolü ile bağlantı yapar.
google.com => domain namedir. Ulaşaya çalıstıgımız
serverin adresidir. Domain Name System de
google.com için bir gerçek adres bulunmaktadır.
Bu dönüşümü Isp yapar.
https://google.com/maps ===> https://216.58.211.206:443
 protocol://ipAdres:portNumber

2) real adres elde edildikten sonra,
server ve client arasında tcp/ip socket 
bağlantısı kurulur.Bu bağlantı dosyaları aktarana kadar
bağlı kalır.
(tcp/ip detaylarını yazmıyorum Kısaca verinin
  nasıl ne şekilde hangi modulasyonda hangi yoldan
  gideceginin belirlendigi aşamalar kurallar bütünüdür.)


3) Bağlantı kurulduktan sonra client HTTP REQUEST
yollar. get,post,put,patch olarak client ne yapmak istedigini
servara bildirir. Bir request şu şekildedir.
   GET/maps HTTP/1.1        (Start line )
   -----------------
   Host: www.google.comm    (hhtp req header)
   User-Agent:Mozilla/5.0
   Accept-Language: en-US
   ----------------
   <Body>                   (req body bölümü)


4) Server req aldıktan ve yapılması gerekeni yaptıktan sonra
bir HTTP RESPONSE döndüdür. Bir res şu şekildedir.

   HTTP/1.1 200 OK          (Start line )
   -----------------
   Date: fri,jan,2021       (hhtp res header)
   Content-Type text/html
   Transfer-Encoding: chunked
   ----------------
   <Body>                   (res body bölümü json,html ne gelirse)


5) Bir res ile  html sayfası geldiğini varsayalım.
Bu html sayfası css ve js dosyalarına ihtiyaç duyuyor.
bu yüzden css için bir  req,res js için bir req,res daha başlatacaktır.
bu çoklu req/reslar aynı anda olabilir. ama limiti vardır.

6) tüm sayfalar resimler geldikten sonra client web sayfasını
render edecektir. 

*/




/*
1) static webpage: Html css js dosyaları alınarak
client tarafonda render eliden sayfalardir.

2) dynamic webpage: server tarafında templetelerde render edilip
cliente gelen web sayalarıdır.

3) api based webpage: back-enden sadece json ile data gönderilen
sonra bu json'u istediğimiz yerde kullanarak ilgili sayfayı,uygulamayı
oluşturdugumuz yapıdır.
*/