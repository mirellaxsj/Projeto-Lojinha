-- DDL - Estrutura
drop database if exists papelaria;
create database papelaria;
use papelaria;
create table Produtos(
    id integer primary key auto_increment,
    produto varchar(50) not null,
    quantidade integer(4) not null,
    descricao varchar(150) not null,
    preco float(3,2) not null
    
);
describe Produtos;

-- DML - Popular com dados de teste
insert into Produtos(produto,quantidade, descricao, preco)
values
("Borracha",344,"Borracha branca Faber Castell",3.99),
("Caneta azul",1000,"Caneta Bic azul",1.99),
("Caneta preta",1000,"Caneta Bic preta",1.99),
("Lápiseira",478,"Lápiseira 2.0 Faber Castell",6.99),
("Cola",754,"Cola líquida",5.99);

select * from Produtos;