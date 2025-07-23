Gamificando a Rotina

Bem-vindo ao repositório do projeto Gamificando a Rotina! Este é um aplicativo gamificado para auxiliar crianças e pré-adolescentes a criarem hábitos diários e adquirirem maior autonomia.

Este documento serve como um guia completo para configurar o ambiente de desenvolvimento e rodar o projeto.
📝 Estrutura do Projeto

Este repositório contém as duas partes principais da aplicação:

    /gamificando-backend: O servidor da aplicação, construído em Node.js com Express. Ele é responsável pela API e pela lógica de negócios.

    /GamificandoFrontend: O aplicativo móvel, construído em React Native.

🛠️ Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas e configuradas em sua máquina (Windows):

    Git: Para clonar o repositório.

    Chocolatey: Gerenciador de pacotes para Windows.

    Node.js (versão LTS): Ambiente de execução para JavaScript.

    JDK (OpenJDK 17): Kit de Desenvolvimento Java, necessário para o Android.

    Android Studio: Para o SDK do Android e o gerenciador de emuladores.

        Android SDK Platform 35 instalado via SDK Manager.

        Um Emulador Android (AVD) configurado.

    Variáveis de Ambiente Configuradas: ANDROID_HOME e o Path para as ferramentas do SDK.

    Nota: A maneira mais garantida de configurar o ambiente Java e Android é seguir o Guia Oficial do React Native, selecionando "React Native CLI", "Windows" e "Android".

🚀 Instalação e Execução

Siga estes passos para rodar o projeto completo localmente.
1. Clonar o Repositório

Primeiro, clone este repositório para a sua máquina em um caminho sem acentos ou caracteres especiais (ex: C:\Projetos\):

git clone <URL_DO_SEU_REPOSITORIO_GIT>
cd Gamificando-a-Rotina

2. Configurar o Backend

    Abra um terminal.

    Navegue até a pasta do backend e instale as dependências:

    cd gamificando-backend
    npm install

3. Configurar o Frontend

    Abra um novo terminal (separado do backend).

    Navegue até a pasta do frontend e instale as dependências. Este processo pode demorar alguns minutos.

    cd GamificandoFrontend
    npm install

    Ajuste de Conexão (Passo Crucial):

        No seu editor de código, abra o arquivo GamificandoFrontend/src/api/api.js.

        Altere a API_BASE_URL para o endereço correto do emulador:

        const API_BASE_URL = 'http://10.0.2.2:3000';

        Salve o arquivo.

4. Como Rodar o Projeto (Checklist Final)

Para ver o aplicativo funcionando, você precisa ter 3 processos rodando ao mesmo tempo: o backend, o emulador e o frontend.

Passo A: Ligue o Backend

    No terminal da pasta gamificando-backend, execute:

    node server.js

    Deixe este terminal aberto.

Passo B: Ligue o Emulador

    Abra o Android Studio.

    Vá para o Virtual Device Manager e dê "Play" no seu emulador.

    Espere o emulador carregar completamente e deixe-o aberto.

Passo C: Ligue o Frontend

    No terminal da pasta GamificandoFrontend, execute:

    npm run android

    Aguarde o processo de compilação. Uma nova janela do Metro Bundler abrirá automaticamente, e o aplicativo "Gamificando a Rotina" será instalado e iniciado no emulador.

✨ Scripts Úteis

    npm run android: Compila e roda o aplicativo no emulador/dispositivo Android.

    node server.js: Inicia o servidor backend.

    npx react-native doctor: Verifica se o ambiente de desenvolvimento está configurado corretamente.
