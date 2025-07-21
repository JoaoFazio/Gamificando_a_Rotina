// server.js
// Este é um servidor backend simples usando Node.js e o framework Express.
// Ele cria uma API para gerenciar as tarefas do nosso aplicativo.
//Precisa instalar o Node.js
//Para rodar esse código, digita no terminal: npm init -y
//npm install express body-parser cors
//node server.js

// 1. Importação dos pacotes necessários
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Pacote para permitir requisições de outras origens (nosso app React Native)

// 2. Inicialização do Express
const app = express();
const PORT = 3000; // A porta em que nosso servidor vai rodar

// 3. Configuração dos Middlewares
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(bodyParser.json()); // Habilita o Express para entender requisições com corpo em formato JSON

// --- Simulação de um Banco de Dados ---
// Para começar, vamos usar um array na memória para guardar as tarefas.
// Em um projeto real, isso seria substituído por um banco de dados como MongoDB, PostgreSQL, etc. (Vamos fazer isso no futuro)
let tasks = [
    {
        id: '1',
        name: 'Arrumar a cama',
        description: 'Deixar a cama organizada ao acordar.',
        frequency: 'Diária',
        rewardPoints: 10,
        penaltyPoints: 5,
    },
    {
        id: '2',
        name: 'Fazer lição de casa',
        description: 'Completar todas as tarefas da escola.',
        frequency: 'Diária',
        rewardPoints: 20,
        penaltyPoints: 10,
    },
];
let nextId = 3; // Para gerar IDs únicos para novas tarefas
// -----------------------------------------


// 4. Definição das Rotas da API (Endpoints)

// ROTA [GET] /tasks - Listar todas as tarefas
// Corresponde à tela de "Lista de Tarefas" do responsável.
app.get('/tasks', (req, res) => {
    console.log('Recebida requisição GET para /tasks');
    res.status(200).json(tasks);
});

// ROTA [POST] /tasks - Criar uma nova tarefa
// Corresponde ao envio do formulário de "Nova Tarefa".
app.post('/tasks', (req, res) => {
    const { name, description, frequency, rewardPoints, penaltyPoints } = req.body;

    // Validação simples para garantir que o nome da tarefa foi enviado
    if (!name) {
        return res.status(400).json({ error: 'O nome da tarefa é obrigatório.' });
    }

    const newTask = {
        id: String(nextId++),
        name,
        description,
        frequency,
        rewardPoints,
        penaltyPoints,
    };

    tasks.push(newTask);
    console.log('Nova tarefa criada:', newTask);
    res.status(201).json(newTask); // 201 Created
});

// ROTA [PUT] /tasks/:id - Atualizar uma tarefa existente
// Corresponde ao envio do formulário de "Editar Tarefa".
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, frequency, rewardPoints, penaltyPoints } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' }); // 404 Not Found
    }

    const updatedTask = {
        ...tasks[taskIndex], // Mantém o ID e outros campos se não forem enviados
        name: name || tasks[taskIndex].name,
        description: description || tasks[taskIndex].description,
        frequency: frequency || tasks[taskIndex].frequency,
        rewardPoints: rewardPoints !== undefined ? rewardPoints : tasks[taskIndex].rewardPoints,
        penaltyPoints: penaltyPoints !== undefined ? penaltyPoints : tasks[taskIndex].penaltyPoints,
    };

    tasks[taskIndex] = updatedTask;
    console.log('Tarefa atualizada:', updatedTask);
    res.status(200).json(updatedTask);
});

// ROTA [DELETE] /tasks/:id - Deletar uma tarefa
// Corresponde ao botão "Excluir" na lista de tarefas.
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' }); // 404 Not Found
    }

    console.log(`Tarefa com id ${id} deletada.`);
    res.status(204).send(); // 204 No Content (sucesso, mas sem corpo na resposta)
});


// 5. Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor do "Gamificando a Rotina" rodando na porta ${PORT}`);
    console.log('Endpoints disponíveis:');
    console.log('GET    http://localhost:3000/tasks');
    console.log('POST   http://localhost:3000/tasks');
    console.log('PUT    http://localhost:3000/tasks/:id');
    console.log('DELETE http://localhost:3000/tasks/:id');
});
