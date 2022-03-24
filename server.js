// express ve socket paketini proje içine alma
const express = require('express');
const socket = require('socket.io');

const app = express()
//3000 nolu portu dinliyoruz
const server = app.listen(3000)

// html ve css dosyası yönetmek için  statik klasor olusturduk
app.use(express.static('public'))

const io = socket(server)

//bağlantı gerceklestiğinde bunu algılaayacağız
io.on('connection', (socket) => {
    console.log(socket.id);


    socket.on('chat', (data) => {
        // console.log("mesaj :"+data.message);
        // console.log("gonderen :"+data.sender);
        io.sockets.emit('chat',data)
    })

    socket.on('typing',(data)=>{
        //tüm browsserlara anlık bu metni gösterebiliriz
        socket.broadcast.emit('typing',data)
    })
})