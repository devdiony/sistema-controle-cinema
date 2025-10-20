// Aguarda o DOM ser totalmente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÕES GLOBAIS DE STORAGE ---
    // Função para obter dados do localStorage
    const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
    // Função para salvar dados no localStorage
    const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    // --- LÓGICA PARA CADA PÁGINA ---

    // 1. PÁGINA DE CADASTRO DE FILMES
    const formFilme = document.getElementById('formFilme');
    if (formFilme) {
        formFilme.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const filme = {
                id: Date.now(), // ID único baseado no timestamp
                titulo: document.getElementById('titulo').value,
                descricao: document.getElementById('descricao').value,
                genero: document.getElementById('genero').value,
                classificacao: document.getElementById('classificacao').value,
                duracao: parseInt(document.getElementById('duracao').value),
                dataEstreia: document.getElementById('dataEstreia').value
            };

            // Salva no localStorage
            const filmes = getData('filmes');
            filmes.push(filme);
            setData('filmes', filmes);

            alert('Filme cadastrado com sucesso!');
            formFilme.reset();
        });
    }

    // 2. PÁGINA DE CADASTRO DE SALAS
    const formSala = document.getElementById('formSala');
    if (formSala) {
        formSala.addEventListener('submit', (e) => {
            e.preventDefault();

            const sala = {
                id: Date.now(),
                nome: document.getElementById('nomeSala').value,
                capacidade: parseInt(document.getElementById('capacidade').value),
                tipo: document.getElementById('tipo').value
            };

            const salas = getData('salas');
            salas.push(sala);
            setData('salas', salas);

            alert('Sala cadastrada com sucesso!');
            formSala.reset();
        });
    }

    // 3. PÁGINA DE CADASTRO DE SESSÕES
    const formSessao = document.getElementById('formSessao');
    if (formSessao) {
        const selectFilme = document.getElementById('filme');
        const selectSala = document.getElementById('sala');

        // Carrega filmes e salas nos selects
        const filmes = getData('filmes');
        const salas = getData('salas');

        selectFilme.innerHTML = '<option value="">Selecione um filme</option>';
        filmes.forEach(filme => {
            const option = document.createElement('option');
            option.value = filme.id;
            option.textContent = filme.titulo;
            selectFilme.appendChild(option);
        });

        selectSala.innerHTML = '<option value="">Selecione uma sala</option>';
        salas.forEach(sala => {
            const option = document.createElement('option');
            option.value = sala.id;
            option.textContent = `${sala.nome} (${sala.tipo})`;
            selectSala.appendChild(option);
        });

        formSessao.addEventListener('submit', (e) => {
            e.preventDefault();

            const sessao = {
                id: Date.now(),
                filmeId: parseInt(selectFilme.value),
                salaId: parseInt(selectSala.value),
                dataHora: document.getElementById('dataHora').value,
                preco: parseFloat(document.getElementById('preco').value),
                idioma: document.getElementById('idioma').value,
                formato: document.getElementById('formato').value
            };

            const sessoes = getData('sessoes');
            sessoes.push(sessao);
            setData('sessoes', sessoes);

            alert('Sessão cadastrada com sucesso!');
            formSessao.reset();
        });
    }

    // 4. PÁGINA DE VENDA DE INGRESSOS
    const formVenda = document.getElementById('formVenda');
    if (formVenda) {
        const selectSessao = document.getElementById('sessao');

        const sessoes = getData('sessoes');
        const filmes = getData('filmes');
        const salas = getData('salas');
        
        selectSessao.innerHTML = '<option value="">Selecione uma sessão</option>';
        sessoes.forEach(sessao => {
            const filme = filmes.find(f => f.id === sessao.filmeId);
            const sala = salas.find(s => s.id === sessao.salaId);
            if(filme && sala) {
                const option = document.createElement('option');
                option.value = sessao.id;
                const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR');
                option.textContent = `${filme.titulo} - ${sala.nome} - ${dataFormatada}`;
                selectSessao.appendChild(option);
            }
        });

        // Verifica se há um ID de sessão na URL para pré-selecionar
        const urlParams = new URLSearchParams(window.location.search);
        const sessaoIdParam = urlParams.get('sessaoId');
        if (sessaoIdParam) {
            selectSessao.value = sessaoIdParam;
        }

        formVenda.addEventListener('submit', (e) => {
            e.preventDefault();

            const ingresso = {
                id: Date.now(),
                sessaoId: parseInt(selectSessao.value),
                nomeCliente: document.getElementById('nomeCliente').value,
                cpf: document.getElementById('cpf').value,
                assento: document.getElementById('assento').value,
                tipoPagamento: document.getElementById('tipoPagamento').value
            };

            const ingressos = getData('ingressos');
            ingressos.push(ingresso);
            setData('ingressos', ingressos);

            alert('Ingresso vendido com sucesso!');
            formVenda.reset();
        });
    }

    // 5. PÁGINA DE LISTAGEM DE SESSÕES
    const listaSessoes = document.getElementById('listaSessoes');
    if (listaSessoes) {
        const sessoes = getData('sessoes');
        const filmes = getData('filmes');
        const salas = getData('salas');

        if (sessoes.length === 0) {
            listaSessoes.innerHTML = '<div class="col-12"><p class="text-center text-muted">Nenhuma sessão cadastrada no momento.</p></div>';
        } else {
            listaSessoes.innerHTML = ''; // Limpa o conteúdo de "carregando"
            sessoes.forEach(sessao => {
                const filme = filmes.find(f => f.id === sessao.filmeId);
                const sala = salas.find(s => s.id === sessao.salaId);

                if (filme && sala) {
                    const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'});

                    const card = document.createElement('div');
                    card.className = 'col-md-6 col-lg-4';
                    card.innerHTML = `
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${filme.titulo}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${sala.nome} - ${sala.tipo}</h6>
                                <p class="card-text">
                                    <strong>Data e Hora:</strong> ${dataFormatada}<br>
                                    <strong>Preço:</strong> R$ ${sessao.preco.toFixed(2)}<br>
                                    <strong>Idioma:</strong> ${sessao.idioma} / <strong>Formato:</strong> ${sessao.formato}
                                </p>
                                <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-success w-100">
                                    <i class="bi bi-ticket"></i> Comprar Ingresso
                                </a>
                            </div>
                        </div>
                    `;
                    listaSessoes.appendChild(card);
                }
            });
        }
    }
});
