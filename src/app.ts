//!- Iniciando projeto
// console.log("INICIO DO PROJETO");

import express,{ Request, Response} from "express";

const app = express();

app.use(express.json());


app.get("/", (req:Request, res:Response) => {
    return res.send("Ola caramba");
});

// Metodo Post
app.post("/api/product", (req:Request, res:Response) => {
    console.log(req.body)
    return res.send("Produto Adicionado!");
});

app.all("/api/product", (req:Request, res:Response) =>{
    if(req.method === "POST"){
        return res.send(req.body);
    }else if (req.method === "GET") {
        return res.send("Leu algum registro!")
    }else{
        return res.send("Não podemos processar esta operação")
    }
});

app.listen(3000, () =>{
    console.log("Aplicação rodando")
})