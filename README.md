Sistema de Controle de Cinema com Docker 🎬

Este repositório contém um sistema web para o gerenciamento de um cinema, desenvolvido com HTML, CSS e JavaScript puro. O ambiente de desenvolvimento é totalmente containerizado com Docker.

🚀 Sobre o Projeto

Este projeto simula um sistema de controle para o "CineDev". A aplicação permite o gerenciamento completo das operações do cinema, com as seguintes funcionalidades:

Cadastro de Filmes: Adicionar novos filmes ao catálogo.

Cadastro de Salas: Registrar as salas de exibição.

Cadastro de Sessões: Agendar sessões, vinculando filmes e salas.

Venda de Ingressos: Registrar a venda de ingressos para sessões específicas.

Listagem de Sessões: Visualizar todas as sessões disponíveis em um layout de cards.

Toda a persistência de dados é feita localmente no navegador, utilizando localStorage.

🛠️ Tecnologias Utilizadas

Linguagens: HTML5, CSS3, JavaScript (ES6+)

Framework CSS: Bootstrap 5

Armazenamento: localStorage

Containerização: Docker e Docker Compose

Ambiente de Servidor: Vite (para desenvolvimento frontend)

✅ Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina:

Git

Docker Desktop

⚙️ Como Executar

Siga os passos abaixo para levantar todo o ambiente na sua máquina local.

1. Clone o repositório

git clone [(https://github.com/devdiony/sistema-controle-cinema.git)](https://github.com/devdiony/sistema-controle-cinema.git)]
cd sistema-controle-cinema


2. Suba os contêineres

Este comando irá construir as imagens (na primeira vez) e iniciar todos os serviços em segundo plano.

docker-compose up --build -d


(A flag -d executa os contêineres em modo "detached", liberando seu terminal).

🌐 Acessando a Aplicação

Após a execução, o sistema de cinema estará disponível no seguinte endereço. A navegação entre as diferentes seções é feita pelo menu no topo da página.

Serviço

URL de Acesso

Página Inicial

http://localhost:5173

📂 Estrutura do Projeto

O frontend é composto por várias páginas HTML interligadas:

index.html: A página de boas-vindas.

cadastro-filmes.html: Formulário para adicionar filmes.

cadastro-salas.html: Formulário para adicionar salas.

cadastro-sessoes.html: Formulário para criar sessões, carregando dados de filmes e salas.

venda-ingressos.html: Formulário para vender ingressos, carregando dados de sessões.

sessoes.html: Exibe todas as sessões disponíveis.

css/style.css: Estilos personalizados.

js/app.js: Contém toda a lógica JavaScript da aplicação.

comandos Úteis do Docker Compose

Parar todos os contêineres:

docker-compose down


Ver os logs do serviço de frontend:

docker-compose logs -f frontend


Ver o status dos contêineres:

docker-compose ps


📄 Licença

Este projeto está sob a licença MIT.
