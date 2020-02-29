import express from "express";
const app = express();
const port = 3000;
const hostname = '127.0.0.1';

app.get('/', async (req: any, res: any) => {
    try{
        await res.send("Hello World!");
    }catch(error){
        console.log(error);
    }
});

try{
    app.listen(port, hostname, () => console.log(`Example app listening on port ${port}!`))
}catch(error){
    console.log(error)
}