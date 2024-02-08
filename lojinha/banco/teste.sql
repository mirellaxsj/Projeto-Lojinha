-- Acessar o Banco de dados
use papelaria;

-- DQL - Consultar
select * from Produtos;

-- DML - Atualizar
update Produtos set produto = "Régua" where id = 5;

-- DML - Deletar
delete from Produtos where id = 4;

-- DQL - Consultar novamente
select * from Produtos;