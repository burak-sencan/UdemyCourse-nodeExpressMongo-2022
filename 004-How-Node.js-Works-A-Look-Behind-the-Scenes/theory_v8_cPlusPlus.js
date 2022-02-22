/*
1) Node architecture
node run time birkaç dependencies'ten oluşur
önemli olanları V8 engine ve libuvdir.
1-V8 engine js kodunu makine koduna çevirir.

2-libuv ise async I/O için kullanılır. dosyalara network'e
  erişimi vardır.
  Event loop, thread pool gibi önemli 2 
  özelliği sağlar.
  *event loop ==>  callback execution, network i/o gibi basit tasklardan sorumludur.
  *thread pool ==> file access, karsılaştırmadan sorumludur.
libuc c++da yazılmıştır. v8 ,se js ve c++ ile yazılmıştır.

nodun diğer kütüphaneleri ise
3- http-parser ==> http parse için
4- c-ares==> dns req için
5- openSSl ==> şifreleme
6- zlib ==> sıkıştırma için kullanılmaktadır.



2) Procceses, threads and thread pool
node.js'i pcde çalısan single thread bir c++ proccesi olarak
düşünebiliriz.
Inıt program => execute "top-level" code =>
require modules => register event callback =>
start event loop

Node.js tek bir thread üzerinde çalısır.  binlerce kişiye 
hizmet veriyorsa uzun süren işlemleri thread pool'a yükler event loopta
kısa süren işlemler yapılır.  Böylece multi-tasking sağlanmış olur.
Php ve  apache gibi programlarda her bir kullanıcı için yeni bir
thread oluşturulur.
Node ile çalısırken 1-async funk kullanmaya dikkat et
                    2-döngü içinde döngülerde karmaşık hesaplamalar yapmamaya çalış
                    3-çok büyük jsonlarla çalısırken dikkatli ol
                    4-çok karmaşık regular exp kullanmamaya çalış   





3) Event loop  in details
start =>  timer callback => i/o polling and callback =>
setImmediate callback => close callback

örnekle açıklarsak
*/
const fs = require('fs');

setTimeout(() => {console.log("timer 1 finished")}, 0)
setImmediate(()=>{console.log("Immediate 1 finished")})
fs.readFile("test-file.txt",()=>{console.log("I/O finished")})
process.nextTick(()=>{console.log("procces.nextTick")})
console.log("Top-level code finished")

/*Sonuç şu şekilde olacaktır
Top-level code finished
procces.nextTick
timer 1 finished
Immediate 1 finished
I/O finished
*/






/*
4) Event-Driven mimarisi
Evenet-Emitter ==emit events ==> Evenet-Listener ==calls=>  Atached-Callback-Func 

const server = hhtp.createServer()
server.on('request',(req,res)=>{
  console.log("req received");
  res.end("req received")
})

emitter ==> server reqest eventini yollar
server.on ==> listener
(req,res)=>{...} ise callbacktir.
örneğin
*/
const http = require('http');
const server = hhtp.createServer()

server.on("request",(req,res)=> {
  console.log("Request received");
  res.end("Request received");
})

server.on("request",(req,res)=> {
  console.log("Request received 2");
})

server.listen(8000,"127.0.0.1",()=>{
  console.log("waiting for request...");
})










/*
5) Streams
Youtube tüm dosyayı indirmek yerine bölüm bölüm indirir
Bu prensibe streams nedir. Node.js de bu prensib şu şekilde implemente
edilmiştir.
readeble streams  => örneğin fs modulu ile büyük bir dosya parça parça indirilir. pipe() 
writable streams  => parça parça yazma
duplex streams    => aynı anda yazma okuma. web socket
transform streams => dosyayı okurken ve yazarken(duplex iken) değişikliik yapmayı sağlar. 
                     örnegin zlib modulur dosyayı yüklerken zip'ler

örnegin çok büyük bir large.txt dosyamız olduğunu varsayalım

const fs = require('fs');
const server = require('http').createServer(); 

server.on("request",(req,res)=>{
  const readable = fs.createStream("large.txt")
  readeble.on("data", chunk=>{
    res.write(chunk)
  })

  readeble.on("end", ()=>{
    res.end();
  })

  readeble.on("error", err =>{
    console.log(err);
    res.statusCode = 500
    res.end("file not found")
  })
})

server.listen(8000,"127.0.0.1",()=>{
  console.log("Listening");
})

burada chunk wriable streamdir. ve parça parça gönderilecektir.
ama diskten çok hızlı okundugu için gönderme hızı buna yetişemeyecektir.
buna backpressure denir. çözümü ise pipe() kullanmaktir.


const fs = require('fs');
const server = require('http').createServer(); 

server.on("request",(req,res)=>{
  const readable = fs.createStream("large.txt")
  readeble.pipe(res)


server.listen(8000,"127.0.0.1",()=>{
  console.log("Listening");
})

*/












/*
6) CommonJs module System
require fonksiyonu şöyle çalışır.

resolving & loading => Wrappint => Execution => Returning export => Caching
  i) resolving loadling: require('http') core moduller için
                         require('./lib/controller') developer moduller için
                         require('express') 3rd-party moduller için kullanılır

  ii) wrapping: (function(exports, require, module, __filename, __direname){
    //module codları burada 
  })
  ile modul kodları obje içinde wraplanır.

  iii) execution: node.js runtime ile execute edilir.
  
  iv) returning export:  require fonksiyonu require edilen modulun export edilmiş fonksiyon veya değişkenlerini döndürür.

  v) yüklendikten sonra cachelenir. Tekrardan bir yerde kullanırsak.
    cahceden yükleyecektir.
 */





