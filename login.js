// Obtém o token de autenticação armazenado no localStorage
const token = localStorage.getItem('authToken');

// Verifica se o token existe
if (token) {
    // Se o token existir, redireciona para a página de perfil
    location.href = 'profile.html';
}

// Define um objeto para armazenar dados de login
let loginData = {
    // Inicializa a propriedade de email como uma string vazia
    email: "",
    // Inicializa a propriedade de senha como uma string vazia
    password: ""
};

// Função para atualizar o objeto loginData com os dados do formulário
function getLoginData(event, type) {
    // Atualiza a propriedade do objeto loginData com o valor do campo de entrada
    loginData[type] = event.target.value;
}

// Função para lidar com o envio do formulário de login
function handleLogin(event) {
    // Evita que o formulário seja enviado da maneira tradicional
    event.preventDefault();

    // Exibe os dados de login no console para depuração
    console.log(loginData);

    // Envia uma requisição POST para o endpoint de autenticação
    axios.post('http://localhost:1337/api/auth/local', {
        // Envia o email como identificador
        identifier: loginData.email,
        // Envia a senha
        password: loginData.password
    })
        // Lida com a resposta da requisição
        .then(response => {
            // Exibe a resposta no console
            console.log('Login successful:', response.data);

            // Verifica se a resposta contém um JWT (token de autenticação)
            if (response.data.jwt) {
                // Armazena o token de autenticação no localStorage
                localStorage.setItem('authToken', response.data.jwt);
                // Redireciona para a página de perfil
                location.href = 'profile.html';
            }
        })
        // Lida com erros na requisição
        .catch(error => {
            // Exibe o erro no console
            console.error('There was an error logging in:', error);
        });
}
