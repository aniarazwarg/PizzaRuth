<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';

$app = new \Slim\App;
$app->get('/', function (Request $request, Response $response, array $args) {

    $response->getBody()->write("API");

    return $response;
});

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {

    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->get('/produtos','getProdutos');
$app->get('/produto/{id}','getProduto');
$app->get('/pizza','getPizza');


function getConn()
{
    return new PDO('mysql:host=localhost:3306;dbname=slimprodutos',
    'root',
    '',
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
}

function getProdutos(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM Produto";
    $stmt = getConn()->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($produtos));
    return $response;
}

function getProduto(Request $request, Response $response, array $args)
{
    $id = $args['id'];
    $conn = getConn();
    $sql = "SELECT * FROM produto WHERE ID=:id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam("id",$id);
    $stmt->execute();
    $produto = $stmt->fetchObject();

    $response->getBody()->write(json_encode($produto));
    return $response;
}

function getPizza(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM pizzas";
    $stmt = getConn()->query($sql);
    $pizzas = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($pizzas));
    return $response;
}


$app->run();

?>