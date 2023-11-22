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
$app->get('/login','getLogin');
$app->get('/usuario-autenticado', 'getUsuarioAutenticado');



function getConn()
{
    return new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        '',
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
}
function getLogin(Request $request, Response $response, array $args)
{
    try {
        $data = $request->getParsedBody();

        $conn = getConn();
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->bindParam(":email", $data["email"]);
        $stmt->execute();
        $user = $stmt->fetch();

        // Verifique se a senha está correta
        if (password_verify($data["senha"], $user["senha"])) {
            // Senha correta
            $userData = [
                'cd_cliente' => isset($user['cd_cliente']) ? $user['cd_cliente'] : null,
                'email' => $user['email'],
                'funcao' => $user['funcao'],
            ];

            return $response->withJson(['message' => 'Login bem-sucedido', 'user' => $userData]);
        } else {
            // Senha incorreta
            return $response->withJson(['error' => 'Senha incorreta']);
        }
    } catch (PDOException $e) {
        return $response->withJson(['error' => 'Erro ao fazer login: ' . $e->getMessage()], 500);
    } catch (Exception $e) {
        return $response->withJson(['error' => $e->getMessage()], 400);
    }
}

function getUsuarioAutenticado(Request $request, Response $response, array $args)
{
    // Verifique se o usuário está autenticado, por exemplo, usando algum middleware ou verificação de token JWT

    // Se o usuário estiver autenticado, obtenha os dados do usuário
    $userData = [
        'cd_cliente' => $request->getAttribute('cd_cliente'),
        'email' => $request->getAttribute('email'),
        'funcao' => $request->getAttribute('funcao'),
        // Adicione outros dados do usuário que você deseja retornar
    ];

    return $response->withJson(['user' => $userData]);
}


function getPizza(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM pizzas";
    $stmt = getConn()->query($sql);
    $pizzas = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($pizzas));
    return $response;
}

function getUsuario(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM usuarios";
    $stmt = getConn()->query($sql);
    $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($usuarios));
    return $response;
}

function getInserir(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody(); // Obtenha os dados enviados na solicitação POST

    // Conecte-se ao banco de dados usando PDO ou outro método de sua escolha
    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );

    // Execute a inserção no banco de dados
    $stmt = $db->prepare('INSERT INTO produto (NOME) VALUES (:valor1)');
    $stmt->bindParam(':valor1', $data['valor1']);

    if ($stmt->execute()) {
        return $response->withJson(['message' => 'Dados inseridos com sucesso']);
    } else {
        return $response->withJson(['error' => 'Erro ao inserir dados'], 500);
    }
}
;

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
        $hashedPassword = password_hash($data['senha'], PASSWORD_DEFAULT);
       

        // Inserir dados no banco de dados
        $stmt = $conn->prepare('INSERT INTO usuarios (email, senha, funcao, logradouro, numero, bairro, cidade, estado) 
                                VALUES (:email, :senha, :funcao, :logradouro, :numero, :bairro, :cidade, :estado)');
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':senha', $hashedPassword);
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


function getDeletar(Request $request, Response $response, array $args)
{

    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );
    $id = $args['id'];
    $sql = "DELETE FROM produto WHERE ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    return $response->withStatus(200)->withJson(['message' => 'Registro excluído com sucesso']);
}
;

function getAlterar(Request $request, Response $response, array $args)
{

    $db = new PDO(
        'mysql:host=localhost:3306;dbname=slimprodutos',
        'root',
        ''
    );
    $id = $args['id'];
    $newData = $request->getParsedBody(); // Dados de atualização
    $sql = "UPDATE produto SET NOME = :nome WHERE id = :id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nome', $newData['nome']);
    $stmt->execute();

    return $response->withStatus(200)->withJson(['message' => 'Registro atualizado com sucesso']);

}
;


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


$app->run();

?>