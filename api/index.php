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

$app->get('/produtos', 'getProdutos');
$app->get('/produto/{id}', 'getProduto');
$app->get('/pizza', 'getPizza');
$app->get('/usuario', 'getUsuario');
$app->post('/inserir', 'getInserir');
$app->post('/cadastrarPizza', 'getcadastrarPizza');
$app->post('/cadastrar', 'getCadastrar');
$app->get('/entradinhas', 'getEntradinhas');
$app->get('/sobremesas', 'getSobremesas');
$app->delete('/deletar/{id}', 'getDeletar');
$app->put('/alterar/{id}', 'getAlterar');
$app->get('/comentarios', 'getComentarios');
$app->put('/curtidas/{id}', 'getCurtidas');
$app->post('/login','getLogin');



function getConn()
{
    return new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        '',
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
}

//-------------------------------LOGIN
function getLogin(){
    $conn = getConn();

    // Verifica se o usuário com o email especificado existe
    $stmt = $conn->prepare("SELECT COUNT(*) FROM usuarios WHERE email = :email");
    $stmt->bindParam(":email", $_POST["email"]);
    $stmt->execute();
    $userCount = $stmt->fetchColumn();

    if ($userCount == 0) {
        // O usuário não existe
        echo json_encode(['error' => 'Usuário não encontrado']);
        return;
    }

    // Consulta SQL para verificar a senha
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = :email");
    $stmt->bindParam(":email", $_POST["email"]);
    $stmt->execute();
    $user = $stmt->fetch();

    // Verifica se a senha está correta
    if ($_POST["senha"]== $user["senha"]) {
        // Senha correta
        $response = [
            'message' => 'Login bem-sucedido',
        ];
        echo json_encode($response);
    } else {
        // Senha incorreta
        echo json_encode(['error' => 'Senha incorreta']);
    }
}

function getPizza(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM pizzas";
    $stmt = getConn()->query($sql);
    $pizzas = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($pizzas));
    return $response;
}

//-----------------------CADASTRO USUARIO
function getCadastrar(Request $request, Response $response, array $args)
{
    try {
        $data = $request->getParsedBody();

        // Validação de e-mail
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('E-mail inválido');
        }

        $conn = getConn();

        // Hash da senha
        // $hashedPassword = password_hash($data['senha'], PASSWORD_DEFAULT);

        // Inserir dados no banco de dados
        $stmt = $conn->prepare('INSERT INTO usuarios (email, senha, funcao, logradouro, numero, bairro, cidade, estado) 
                                VALUES (:email, :senha, :funcao, :logradouro, :numero, :bairro, :cidade, :estado)');
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':senha', $data['senha']);
        $stmt->bindParam(':funcao', $data['funcao']);
        $stmt->bindParam(':logradouro', $data['logradouro']);
        $stmt->bindParam(':numero', $data['numero']);
        $stmt->bindParam(':bairro', $data['bairro']);
        $stmt->bindParam(':cidade', $data['cidade']);
        $stmt->bindParam(':estado', $data['estado']);

        $stmt->execute();

        return $response->withJson(['message' => 'Dados inseridos com sucesso']);
    } catch (PDOException $e) {
        return $response->withJson(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()], 500);
    } catch (Exception $e) {
        return $response->withJson(['error' => $e->getMessage()], 400);
    }
}

//-----------------------Cadastro produto

function getcadastrarPizza(Request $request, Response $response, array $args)
{
    try {
        $uploadedFiles = $request->getUploadedFiles();
        $uploadedFile = $uploadedFiles['imagem'];

        // Verifique se um arquivo foi realmente enviado
        if ($uploadedFile->getError() !== UPLOAD_ERR_OK) {
            return $response->withJson(['error' => 'Erro no upload de imagem'], 500);
        }

        $uploadPath = '/caminho/real/para/salvar/as/imagens';

        // Verifique se o diretório de upload existe, se não, crie-o
        if (!is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        // Use o nome original do arquivo
        $filename = $uploadedFile->getClientFilename();
        $uploadedFile->moveTo($uploadPath . DIRECTORY_SEPARATOR . $filename);

        $db = getConn();
        $data = $request->getParsedBody();

        $stmt = $db->prepare('INSERT INTO pizzas (sabor, descricao, imagem, preco, categoria) VALUES (:sabor, :descricao, :imagem, :preco, :categoria)');
        $stmt->bindParam(':sabor', $data['sabor']);
        $stmt->bindParam(':descricao', $data['descricao']);
        $stmt->bindParam(':imagem', $filename);
        $stmt->bindParam(':preco', $data['preco']);
        $stmt->bindParam(':categoria', $data['categoria']); // Nova linha para a categoria

        if ($stmt->execute()) {
            return $response->withJson(['message' => 'Produto cadastrado com sucesso']);
        } else {
            return $response->withJson(['error' => 'Erro ao cadastrar produto - Falha na execução da instrução SQL'], 500);
        }
    } catch (PDOException $e) {
        return $response->withJson(['error' => 'Erro ao cadastrar produto - ' . $e->getMessage()], 500);
    }
}



function getEntradinhas(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM pizzas WHERE categoria = 'entradinhas'";
    $stmt = getConn()->query($sql);
    $entradinhas = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($entradinhas));
    return $response;
}

function getSobremesas(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM pizzas WHERE categoria = 'sobremesa'";
    $stmt = getConn()->query($sql);
    $sobremesas = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($sobremesas));
    return $response;
}


// function getFuncaoCliente(Request $request, Response $response, array $args)
// {
//     $sql = "SELECT * FROM usuario WHERE funcao = 'cliente'";
//     $stmt = getConn()->query($sql);
//     $entradinhas = $stmt->fetchAll(PDO::FETCH_OBJ);
//     $response->getBody()->write(json_encode($entradinhas));
//     return $response;
// }

// function getFuncaoFuncionario(Request $request, Response $response, array $args)
// {
//     $sql = "SELECT * FROM usuario WHERE funcao = 'funcionario'";
//     $stmt = getConn()->query($sql);
//     $funcaoUsuario = $stmt->fetchAll(PDO::FETCH_OBJ);
//     $response->getBody()->write(json_encode($funcaoUsuario));
//     return $response;
// }


// function getUsuario(Request $request, Response $response, array $args)
// {
//     $sql = "SELECT * FROM usuarios";
//     $stmt = getConn()->query($sql);
//     $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
//     $response->getBody()->write(json_encode($usuarios));
//     return $response;
// }

// function getInserir(Request $request, Response $response, array $args)
// {
//     $data = $request->getParsedBody(); // Obtenha os dados enviados na solicitação POST

//     // Conecte-se ao banco de dados usando PDO ou outro método de sua escolha
//     $db = new PDO(
//         'mysql:host=localhost:3306;dbname=slimprodutos',
//         'root',
//         ''
//     );

//     // Execute a inserção no banco de dados
//     $stmt = $db->prepare('INSERT INTO produto (NOME) VALUES (:valor1)');
//     $stmt->bindParam(':valor1', $data['valor1']);

//     if ($stmt->execute()) {
//         return $response->withJson(['message' => 'Dados inseridos com sucesso']);
//     } else {
//         return $response->withJson(['error' => 'Erro ao inserir dados'], 500);
//     }
// }
// ;


// function getDeletar(Request $request, Response $response, array $args)
// {

//     $db = new PDO(
//         'mysql:host=localhost:3306;dbname=slimprodutos',
//         'root',
//         ''
//     );
//     $id = $args['id'];
//     $sql = "DELETE FROM produto WHERE ID = :id";
//     $stmt = $db->prepare($sql);
//     $stmt->bindParam(':id', $id);
//     $stmt->execute();

//     return $response->withStatus(200)->withJson(['message' => 'Registro excluído com sucesso']);
// }
// ;

// function getAlterar(Request $request, Response $response, array $args)
// {

//     $db = new PDO(
//         'mysql:host=localhost:3306;dbname=slimprodutos',
//         'root',
//         ''
//     );
//     $id = $args['id'];
//     $newData = $request->getParsedBody(); // Dados de atualização
//     $sql = "UPDATE produto SET NOME = :nome WHERE id = :id";
//     $stmt = $db->prepare($sql);
//     $stmt->bindParam(':id', $id);
//     $stmt->bindParam(':nome', $newData['nome']);
//     $stmt->execute();

//     return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);

// }
// ;

// function getComentarios(Request $request, Response $response, array $args)
// {
//     $sql = "SELECT * FROM Comentarios";
//     $stmt = getConn()->query($sql);
//     $comentarios = $stmt->fetchAll(PDO::FETCH_OBJ);
//     $response->getBody()->write(json_encode($comentarios));
//     return $response;
// }

// function getCurtidas(Request $request, Response $response, array $args)
// {

//     $db = new PDO(
//         'mysql:host=localhost:3306;dbname=slimprodutos',
//         'root',
//         ''
//     );
//     $id = $args['id'];
//     $newData = $request->getParsedBody(); // Dados de atualização
//     $sql = "UPDATE comentarios SET curtidas = :curtidas, descurtidas = :descurtidas, ok = :ok WHERE id = :id";
//     $stmt = $db->prepare($sql);
//     $stmt->bindParam(':id', $id);
//     $stmt->bindParam(':curtidas', $newData['curtidas']);
//     $stmt->bindParam(':descurtidas', $newData['descurtidas']);
//     $stmt->bindParam(':ok', $newData['ok']);
//     $stmt->execute();

//     return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);

// }



// function getProdutos(Request $request, Response $response, array $args)
// {
//     $sql = "SELECT * FROM Produto";
//     $stmt = getConn()->query($sql);
//     $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);
//     $response->getBody()->write(json_encode($produtos));
//     return $response;
// }

// function getProduto(Request $request, Response $response, array $args)
// {
//     $id = $args['id'];
//     $conn = getConn();
//     $sql = "SELECT * FROM produto WHERE ID=:id";
//     $stmt = $conn->prepare($sql);
//     $stmt->bindParam("id", $id);
//     $stmt->execute();
//     $produto = $stmt->fetchObject();

//     $response->getBody()->write(json_encode($produto));
//     return $response;
// }
;




$app->run();

?>