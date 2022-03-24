//browser tarafından connectionu tamamlıyoruz
const socket= io.connect('http://localhost:3000')


const sender=document.getElementById('sender');
const message=document.getElementById('message');
const btn=document.getElementById('submitBtn');
const output=document.getElementById('output');
const feedback=document.getElementById('feedback');

//browserdan click işlemi gelirse bunu serverimızdan socket ile bağlantı kuracağız
btn.addEventListener('click',()=>{
    //emit ile mesajları serverımıza gonderiyoruz
    socket.emit('chat',{
        message:message.value,
        sender:sender.value
    })
})

socket.on('chat',data=>{
    feedback.innerHTML=''//butona bastıgımızda yaziyor kısmı silinecek
    output.innerHTML += '<p><strong>'+data.sender+": "+'</strong>'+data.message+'</p>'
    message.value=''
})



message.addEventListener('keypress',()=>{
    socket.emit('typing',sender.value)
})

socket.on('typing',data=>{
feedback.innerHTML = '<p>'+data+' yazıyor...</p>'
})