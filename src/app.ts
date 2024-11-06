//!- Iniciando projeto
// console.log("INICIO DO PROJETO");

import express,{ Request, Response, NextFunction} from "express";

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

app.all("/api/product/check", (req:Request, res:Response) =>{
    if(req.method === "POST"){
        return res.send(req.body);
    }else if (req.method === "GET") {
        return res.send("Leu algum registro!")
    }else{
        return res.send("Não podemos processar esta operação")
    }
});

// 5 - interfaces do express
app.get("/api/interface", (req:Request, res:Response) => {
    res.send("Utilizando as interfaces!");
})

// 6 - enviando JSON
app.get("/api/json", (req:Request, res:Response) => {
    return res.json({
    name: "Shirt",
    price: 19.99,
    inStock: true,
  })
})

// 7 - Router parameters
app.get("/api/product/:id"), (req:Request, res:Response) => {
    const id = req.params.id
    console.log(id)

    const product = {
    id: 1,
    name: "Boné",
    price: 40.49,
  };

  return res.json(product);
}

// 8 - Rotas complexas
app.get("/api/product/:id/review/:reviewId", (req: Request, res:Response) =>{
    const id = req.params.id;
    const reviewId = req.params.reviewId;

    return res.send(`Acessando a review ${reviewId} do produto ${id}!`)
})

// 9 - Router handler
app.get("/api/user/:id", getUser);

function getUser(req: Request, res: Response) {
  console.log(`Resgatando usuário com id: ${req.params.id}`);

  return res.send("O usuário foi encontrado!");
}

// 10 - middleware
function someMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.params.id === "1") {
    console.log("Pode seguir!");
    next();
  } else {
    console.log("Não pode seguir");
  }
}

app.get(
  "/api/user/:id/access",
  someMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({ msg: "Bem-vindo a área administrativa!" });
  }
);

// 12 -req res generics
app.get(
  "/api/user/:id/details/:name",
  (
    req: Request<{ id: "string"; name: "string" }>,
    res: Response<{ status: boolean }>
  ) => {
    console.log(`ID: ${req.params.id}`);
    console.log(`Name: ${req.params.name}`);

    return res.json({ status: true });
  }
);

// 13 - tratando erros
app.get("/api/error", (req: Request, res: Response) => {
  try {
    throw new Error("Algo deu errado!");
  } catch (e: any) {
    res.statusCode = 500;

    res.status(500).json({ msg: e.message });
  }
});

app.listen(3000, () =>{
    console.log("Aplicação rodando")
})