const express=require('express')
const path=require('path')
const app=express();
const PORT=process.env.PORT || 4000;
const server=app.listen(PORT || 4000,()=>{
    console.log(`server is running on localhost:${PORT}`)
})

app.use(express.static(path.join(__dirname,'public')))

// #3. 10:00 min