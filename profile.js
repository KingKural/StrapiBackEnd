// Obtém o token de autenticação armazenado no localStorage
const token = localStorage.getItem('authToken'); 


// Verifica se o token não existe
if (!token) {
    // Se o token não existir, redireciona para a página inicial (home.html)
    location.href = 'home.html'; 
}

// Declara uma variável para armazenar os dados do usuário
let userData; 

if (token) { // Verifica se o token existe
    // Envia uma requisição GET para obter os dados do usuário
    axios.get('http://localhost:1337/api/users/me', {
        // Define o cabeçalho da requisição
        headers: { 
            // Inclui o token de autenticação no cabeçalho
            Authorization: `Bearer ${token}`, 
        },
    })
    // Lida com a resposta da requisição
        .then(response => { 
            // Exibe os dados da resposta no console para depuração
            console.log(response.data); 
            // Armazena os dados do usuário na variável userData
            userData = response.data; 

            // Atualiza o conteúdo dos elementos HTML com os dados do usuário
            document.getElementById('firstName').textContent = userData.firstName;
            document.getElementById('lastName').textContent = userData.lastName;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('phone').textContent = userData.phone;
        })
        // Lida com erros na requisição
        .catch(error => { 
            // Exibe o erro no console
            console.error(error); 
        });
}

// Função para lidar com o logout do usuário
function handleLogOut() { 
    // Limpa todos os dados armazenados no localStorage
    localStorage.clear(); 
    // Redireciona para a página inicial (home.html)
    location.href = 'home.html'; 
}
