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
$app->get('/pizza/{id}', 'getPizzas');



$app->get('/usuario', 'getUsuario');
$app->post('/inserir', 'getInserir');
$app->post('/cadastrarPizza', 'getcadastrarPizza');
$app->put('/editarPizza', 'editarPizza');
// $app->get('/editarPizza', 'editarPizza');
$app->post('/cadastrar', 'getCadastrar');
$app->get('/entradinhas', 'getEntradinhas');
$app->get('/sobremesas', 'getSobremesas');
$app->get('/bebidas', 'getBebidas');
$app->delete('/deletar/{id}', 'getDeletar');
$app->put('/alterar/{id}', 'getAlterar');
$app->get('/comentarios', 'getComentarios');
$app->put('/curtidas/{id}', 'getCurtidas');
$app->post('/login', 'getLogin');
$app->get('/login', 'getLogin');
$app->post('/orders/{userId}', 'sendOrder');


function getConn()
{
    // Crie uma única instância de conexão para reutilização
    static $conn = null;

    if ($conn === null) {
        $conn = new PDO(
            'mysql:host=localhost:3306;dbname=slimprodutos',
            'root',
            '',
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
        );
    }

    return $conn;
}
// Função para cadastrar um novo usuário
function getCadastrar(Request $request, Response $response, array $args)
{
    try {
        // Obtem os dados do corpo da requisição
        $data = $request->getParsedBody();

        // Validação de e-mail
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('E-mail inválido');
        }

        // Conecta ao banco de dados
        $conn = getConn();

        // Hash da senha
        $hashedPassword = password_hash($data['senha'], PASSWORD_DEFAULT);

        // Inserção segura no banco de dados usando instrução preparada
        $stmt = $conn->prepare('INSERT INTO usuarios (nome, email, senha, funcao, logradouro, numero, bairro, cidade, estado) 
                                VALUES (:nome, :email, :senha, :funcao, :logradouro, :numero, :bairro, :cidade, :estado)');

        // Associa os parâmetros
        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':senha', $hashedPassword);
        $stmt->bindParam(':funcao', $data['funcao']);
        $stmt->bindParam(':logradouro', $data['logradouro']);
        $stmt->bindParam(':numero', $data['numero']);
        $stmt->bindParam(':bairro', $data['bairro']);
        $stmt->bindParam(':cidade', $data['cidade']);
        $stmt->bindParam(':estado', $data['estado']);

        // Executa a instrução preparada
        $stmt->execute();

        // Log de sucesso
        error_log('Cadastro realizado com sucesso para o e-mail: ' . $data['email']);

        return $response->withJson(['message' => 'Dados inseridos com sucesso']);
    } catch (PDOException $e) {
        // Log de erro
        error_log('Erro ao conectar ao banco de dados: ' . $e->getMessage());
        return $response->withJson(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()], 500);
    } catch (Exception $e) {
        // Log de erro
        error_log('Erro durante o cadastro: ' . $e->getMessage());
        return $response->withJson(['error' => $e->getMessage()], 400);
    }
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

            // Inicie a sessão e defina a variável cd_cliente
            session_start();
            $_SESSION['cd_cliente'] = isset($user['cd_cliente']) ? $user['cd_cliente'] : null;

            $userData = [
                'cd_cliente' => isset($user['cd_cliente']) ? $user['cd_cliente'] : null,
                'nome' => $user['nome'],
                'email' => $user['email'],
                'funcao' => $user['funcao'],
                'logradouro' => $user['logradouro'],
                'numero' => $user['numero'],
                'bairro' => $user['bairro'],
                'cidade' => $user['cidade'],
                'estado' => $user['estado'],
            ];


            return $response->withJson(['message' => 'Login bem-sucedido', 'user' => $userData]);
        } else {
            // Senha incorreta
            return $response->withJson(['error' => 'Senha incorreta']);
        }
    } catch (PDOException $e) {
        return $response->withJson(['error' => 'Erro ao fazer login: ' . $e->getMessage()]);
    } catch (Exception $e) {
        return $response->withJson(['error' => $e->getMessage()]);
    }
} // Função para enviar pedidos

function sendOrder(Request $request, Response $response, array $args)
{
    try {
        // Obtem os dados do corpo da requisição
        $data = $request->getParsedBody();

        error_log('Method: ' . $request->getMethod());

        // Adicione a linha para verificar e definir $apiEndpoint
        $apiEndpoint = isset($data['apiEndpoint']) ? $data['apiEndpoint'] : null;

        // Recupera os dados do usuário usando a função getUserId
        $userData = getUserId();


        error_log('Raw JSON data: ' . file_get_contents("php://input"));

        // Adicione este log para verificar os dados recebidos
        error_log('Data received: ' . json_encode($data));

        

        // Agora você pode acessar $data['apiEndpoint'] e $data['cdCliente'] para o endpoint da API e cd_cliente
        $apiEndpoint = $data['apiEndpoint'];
        $cdCliente = $data['cdCliente'];

        // Conecta ao banco de dados
        $conn = getConn();

        // Inserção segura no banco de dados usando instrução preparada
        $stmt = $conn->prepare('INSERT INTO pedidos (user_id, user_name, user_email, user_logradouro, user_numero, items, total_price, payment_method) 
                                VALUES (:user_id, :user_name, :user_email, :user_logradouro, :user_numero, :items, :total_price, :payment_method)');

        // Associa os parâmetros
        $userId = $userData['cd_cliente'];
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':user_name', $userData['nome']);
        $stmt->bindParam(':user_email', $userData['email']);
        $stmt->bindParam(':user_logradouro', $userData['logradouro']);
        $stmt->bindParam(':user_numero', $userData['numero']);
        $stmt->bindParam(':items', json_encode($data['cart']));
        $stmt->bindParam(':total_price', $data['totalPrice']);
        $stmt->bindParam(':payment_method', $data['paymentMethod']);

        // Executa a instrução preparada
        $stmt->execute();

        return $response->withJson(['message' => 'Pedido armazenado no banco de dados']);
    } catch (PDOException $e) {
        // Log de erro
        error_log('Erro ao conectar ao banco de dados: ' . $e->getMessage());
        return $response->withJson(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()], 500);
    } catch (Exception $e) {
        // Log de erro
        error_log('Erro ao processar pedido: ' . $e->getMessage());
        return $response->withJson(['error' => $e->getMessage()], 400);
    }
}

// Função para obter o ID do usuário
function getUserId()
{
    // Obtem o cd_cliente do localStorage ou outra fonte
    $cd_cliente = $_SESSION['cd_cliente'] ?? null;

    // Verifica se cd_cliente está presente e é um número
    if ($cd_cliente && is_numeric($cd_cliente)) {
        // Converte para número e retorna
        return (int) $cd_cliente;
    }

    // Retorna null se cd_cliente não estiver presente ou não for um número
    return null;
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

        $uploadPath = 'C:\Users\Aluno\Documents\GitHub\PizzaRuth\src\assets';

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



function editarPizza(Request $request, Response $response, array $args)
{
    try {
        $uploadedFiles = $request->getUploadedFiles();
        $uploadedFile = $uploadedFiles['imagem'];

        // Verifique se um arquivo foi realmente enviado
        if ($uploadedFile->getError() !== UPLOAD_ERR_OK) {
            return $response->withJson(['error' => 'Erro no upload de imagem'], 500);
        }

        $uploadPath = 'C:\Users\SANTOSTEC\OneDrive - Santos Tec\Área de Trabalho\nia\pIZZArUTH\src\assets';

        // Verifique se o diretório de upload existe, se não, crie-o
        if (!is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        // Use o nome original do arquivo
        $filename = $uploadedFile->getClientFilename();
        $uploadedFile->moveTo($uploadPath . DIRECTORY_SEPARATOR . $filename);

        $db = getConn();
        $data = $request->getParsedBody();
        $productId = $args['id']; 

        //editar o produto existente
        $stmt = $db->prepare('UPDATE pizzas SET sabor = :sabor, descricao = :descricao, imagem = :imagem, preco = :preco, categoria = :categoria WHERE id = :id');
        $stmt->bindParam(':id', $productId);
        $stmt->bindParam(':sabor', $data['sabor']);
        $stmt->bindParam(':descricao', $data['descricao']);
        $stmt->bindParam(':imagem', $filename);
        $stmt->bindParam(':preco', $data['preco']);
        $stmt->bindParam(':categoria', $data['categoria']);

        if ($stmt->execute()) {
            return $response->withJson(['message' => 'Produto editado com sucesso']);
        } else {
            return $response->withJson(['error' => 'Erro ao editar produto - Falha na execução da instrução SQL'], 500);
        }
    } catch (PDOException $e) {
        return $response->withJson(['error' => 'Erro ao editar produto - ' . $e->getMessage()], 500);
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

function getPizzas(Request $request, Response $response, array $args)
{
    $id = $args['id'];
    $conn = getConn();
    $sql = "SELECT * FROM pizzas WHERE id=:id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $pizzas = $stmt->fetchObject();

    $response->getBody()->write(json_encode($pizzas));
    return $response;
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

function getBebidas(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM pizzas WHERE categoria = 'bebidas'";
    $stmt = getConn()->query($sql);
    $bebidas = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($bebidas));
    return $response;
}


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


// function getUsuario(Request $request, Response $response, array $args)
// {
//     $sql = "SELECT * FROM usuarios";
//     $stmt = getConn()->query($sql);
//     $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
//     $response->getBody()->write(json_encode($usuarios));
//     return $response;
// }

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

// function getUserData(Request $request, Response $response, array $args)
// {
//     // Recupere o ID do usuário a partir da sessão ou de qualquer outra fonte que você esteja usando
//     $userId = getUserId(); // Implemente a função getUserId() para recuperar o ID do usuário

//     $sql = "SELECT email, funcao FROM usuarios WHERE id = :id";
//     $stmt = getConn()->prepare($sql);
//     $stmt->bindParam(':id', $userId);
//     $stmt->execute();

//     $userData = $stmt->fetch(PDO::FETCH_ASSOC);

//     $response->getBody()->write(json_encode($userData));
//     return $response;
// }


// function getCadastrar(Request $request, Response $response, array $args)
// {
//     try {
//         $data = $request->getParsedBody();

//         error_log('Nova solicitação de cadastro: ' . json_encode($data));

//         // Validação de e-mail
//         if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
//             throw new Exception('E-mail inválido');
//         }

//         $conn = getConn();

//         // Hash da senha
//         $hashedPassword = password_hash($data['senha'], PASSWORD_DEFAULT);


//         // Inserir dados no banco de dados
//         $stmt = $conn->prepare('INSERT INTO usuarios (email, senha, funcao, logradouro, numero, bairro, cidade, estado) 
//                                 VALUES (:email, :senha, :funcao, :logradouro, :numero, :bairro, :cidade, :estado)');
//         $stmt->bindParam(':email', $data['email']);
//         $stmt->bindParam(':senha', $hashedPassword);
//         $stmt->bindParam(':funcao', $data['funcao']);
//         $stmt->bindParam(':logradouro', $data['logradouro']);
//         $stmt->bindParam(':numero', $data['numero']);
//         $stmt->bindParam(':bairro', $data['bairro']);
//         $stmt->bindParam(':cidade', $data['cidade']);
//         $stmt->bindParam(':estado', $data['estado']);

//         $stmt->execute();

//          // Adicione um log para registrar o sucesso do cadastro no lado do servidor
//         error_log('Cadastro realizado com sucesso para o e-mail: ' . $data['email']);

//         return $response->withJson(['message' => 'Dados inseridos com sucesso']);
//     } catch (PDOException $e) {
//         // Adicione log de erro
//         error_log('Erro ao conectar ao banco de dados: ' . $e->getMessage());
//         return $response->withJson(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()], 500);
//     } catch (Exception $e) {
//         // Adicione log de erro
//         error_log('Erro durante o cadastro: ' . $e->getMessage());
//         return $response->withJson(['error' => $e->getMessage()], 400);
//     }
// }


$app->run();

?>