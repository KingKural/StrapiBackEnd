// Obtém o token de autenticação armazenado no localStorage
const token = localStorage.getItem('authToken'); 

// Verifica se o token existe
if (token) { 
    // Se o token existir, redireciona para a página de perfil
    location.href = 'profile.html'; 
}

let personalData = { // Define um objeto para armazenar dados pessoais do usuário
    firstName: "", // Inicializa o primeiro nome como uma string vazia
    lastName: "", // Inicializa o sobrenome como uma string vazia
    email: "", // Inicializa o email como uma string vazia
    phone: "", // Inicializa o telefone como uma string vazia
    password: "" // Inicializa a senha como uma string vazia
};

// Função exportada para atualizar o objeto personalData com os dados do formulário
export function getData(event, type) { 
    // Atualiza a propriedade do objeto personalData com o valor do campo de entrada
    personalData[type] = event.target.value; 
}

// Função exportada para lidar com o envio do formulário de registro
export function handleSubmit(event) { 
    // Evita que o formulário seja enviado da maneira tradicional
    event.preventDefault(); 
    // Exibe os dados pessoais no console para depuração
    console.log(personalData); 

    // Envia uma requisição POST para o endpoint de registro
    axios.post('http://localhost:1337/api/auth/local/register', 
        {
            // Cria um nome de usuário concatenando o primeiro e o último nome
            username: personalData.firstName + personalData.lastName, 
            // Envia o primeiro nome
            firstName: personalData.firstName, 
            // Envia o sobrenome
            lastName: personalData.lastName,
            // Envia o email
            email: personalData.email, 
            // Envia a senha
            password: personalData.password, 
            // Envia o telefone
            phone: personalData.phone 
        }
    )
    // Lida com a resposta da requisição
        .then(response => { 
            // Exibe a resposta no console
            console.log('Registration successful:', response.data); 

            // Verifica se a resposta contém dados
            if (response.data) { 
                // Chama a função handleLogin para autenticar o usuário
                handleLogin(); 
            }
        })
        // Lida com erros na requisição
        .catch(error => { 
            // Exibe o erro no console
            console.error('There was an error registering:', error);
        });
}

// Função para autenticar o usuário após o registro
function handleLogin() { 
    // Envia uma requisição POST para o endpoint de login
    axios.post('http://localhost:1337/api/auth/local', { 
        // Envia o email como identificador
        identifier: personalData.email,
        // Envia a senha
        password: personalData.password 
    }
    )
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
