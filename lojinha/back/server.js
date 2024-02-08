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
    con.query(query, (err, result) => {
        if (err)
            res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Provalmente o produto já está cadastrado&err=" + err.code);
        else
            res.redirect("http://127.0.0.1:5500/front/index.html");
    });
}

//CRUD - Read
const read = (req, res) => {
    con.query("SELECT * FROM Produtos ORDER BY id DESC", (err, result) => {
        if (err)
            res.json(err);
        else
            res.json(result);
    });
}

//CRUD - Update 
const update = (req, res) => {
    let id = req.params.id;
    let produto = req.body.produto;
    let quantidade = req.body.quantidade;
    let descricao = req.body.descricao;
    let preco = req.body.preco;
    let query = `UPDATE Produtos SET produto = '${produto}', quantidade = '${quantidade}', descricao = '${descricao}', preco = '${preco}' WHERE id = ${id};`;
    con.query(query, (err, result) => {
        if (err)
            res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Provalmente o produto já está cadastrado&err=" + err.code);
        else {
            if (result.affectedRows == 0)
                res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Nada foi alterado");
            else
                res.json("Atualizado com sucesso!");

        }
    });
}

//CRUD - Delete
const del = (req, res) => {
    let id = Number(req.params.id);
    con.query(`DELETE FROM produtos WHERE id=${id}`, (err, result) => {
        if (err)
            res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Erro ao excluir&err=" + err.code);
        else {
            if (result.affectedRows == 0)
                res.redirect("http://127.0.0.1:5500/front/erro.html?erro=Nada foi excluído");
            else
                res.json("Atualizado com sucesso!");
        }
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
app.delete("/clientes/:id", del);
app.put("/clientes/:id", update);

//Teste e porta no console
app.listen(3000, () => {
    console.log("Back-end respondendo na porta 3000");
});