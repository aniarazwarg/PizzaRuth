<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Tuupola\Middleware\CorsMiddleware;

require './vendor/autoload.php';

$app = new \Slim\App;

$app->add(new CorsMiddleware([
    "origin" => ["*"], // Domínio da origem permitida
    "methods" => ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    "headers.allow" => ["Content-Type", "Authorization", "Accept"], // Headers permitidos
]));


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
$app->post('/inserir','getInserir');
$app->post('/teste', 'getTeste');


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

function getInserir(Request $request, Response $response, array $args) {
    $data = $request->getParsedBody(); // Obtenha os dados enviados na solicitação POST

    // Conecte-se ao banco de dados usando PDO ou outro método de sua escolha
    $db = new PDO('mysql:host=localhost:3306;dbname=slimprodutos',
    'root',
    '');

    // Execute a inserção no banco de dados
    $stmt = $db->prepare('INSERT INTO produto (NOME, DESCRICAO) VALUES (:valor1, :valor2)');
    $stmt->bindParam(':valor1', $data['valor1']);
    $stmt->bindParam(':valor2', $data['valor2']);
    
    if ($stmt->execute()) {
        return $response->withJson(['message' => 'Dados inseridos com sucesso']);
    } else {
        return $response->withJson(['error' => 'Erro ao inserir dados'], 500);
    }
};

function getTeste(Request $request, Response $response, array $args) {
    $data = $request->getParsedBody(); // Obtenha os dados enviados na solicitação POST

    // Conecte-se ao banco de dados usando PDO ou outro método de sua escolha
    $db = new PDO('mysql:host=localhost:3306;dbname=slimprodutos',
    'root',
    '');

    // Execute a inserção no banco de dados
    $stmt = $db->prepare('INSERT INTO teste (title, body) VALUES (:title, :body)');
    $stmt->bindParam(':title', $data['title']);
    $stmt->bindParam(':body', $data['body']);
    
    if ($stmt->execute()) {
        return $response->withJson(['message' => 'Dados inseridos com sucesso']);
    } else {
        return $response->withJson(['error' => 'Erro ao inserir dados'], 500);
    }
};





$app->run();

?>