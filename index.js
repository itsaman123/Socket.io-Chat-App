const express=require('express')
const path=require('path')
const app=express();
const PORT=process.env.PORT || 4000;
const server=app.listen(PORT || 4000,()=>{
    console.log(`server is running on localhost:${PORT}`)
})

const io=require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))

const socketsConnected=new Set();

io.on('connection',onConnected);

function onConnected(socket){
    // console.log(socket.id)
    socketsConnected.add(socket.id);

    io.emit('clients-total',socketsConnected.size)

    socket.on('disconnect',()=>{
        console.log('socket diconnected',socket.id);
        socketsConnected.delete(socket.id)
        io.emit('clients-total',socketsConnected.size)

    })
    socket.on('message',(data)=>{
        socket.broadcast.emit('chat-message',data);
    })
    socket.on('feedback',(data)=>{
        socket.broadcast.emit('feedback',data);
    })
}