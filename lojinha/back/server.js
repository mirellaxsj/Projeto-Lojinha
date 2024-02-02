//Dependências - Frameworks
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

//Conexão com o SGBD MySQL
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'papelaria'
});

//Rota de teste
const teste = (req, res) => {
    res.send("Back-end respondendo ");
}

//CRUD - create
const create = (req, res) => {
    let produto = req.body.produto;
    let quantidade = req.body.quantidade;
    let descricao = req.body.descricao;
    let preco = req.body.preco;
    let query = `INSERT INTO Produtos(produto, quantidade, descricao, preco) VALUE`;
    query += `('${produto}', '${quantidade}', '${descricao}', '${preco}');`;
    con.query(query,(err, result)=>{
        if(err)
            res.redirect("http://127.0.0.1:5500/lojinha/front/erro.html?erro=Provalmente o produto já está cadastrado&err="+err.code);
        else
            res.redirect("http://127.0.0.1:5500/lojinha/front/index.html");
    });
}

//CRUD - Read
const read = (req, res) => {
    con.query("SELECT * FROM Produtos ORDER BY id DESC",(err, result)=>{
        if(err)
            res.json(err);
        else
            res.json(result);
    });
}

//Configurações de saída - FrontEnd
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Rotas de Saída - FrontEnd
app.get("/", teste);
app.post("/clientes", create);
app.get("/clientes", read);

//Teste e porta no console
app.listen(3000, () => {
    console.log("Back-end respondendo na porta 3000");
});