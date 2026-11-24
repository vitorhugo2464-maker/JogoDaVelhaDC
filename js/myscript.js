// Configurando o monitor de eventos do Javascript
document.addEventListener('DOMContentLoaded', function() {

    // Definição das variáveis que vão receber os atributos HTML
    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status p');
    const resetBtn = document.getElementById('reset-button');

    let jogadorAtual = 'Batman';
    let jogoAtivo = true;
    let timerReinicio;

    // Criação e inicialização do array do tabuleiro
    let tabuleiro = ['','','','','', '','', '', ''];

    // Definição das possibilidades de jogadas
    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Criaçaõ da função clica nas células para preencher o array
    function clica(event) {
        const celula = event.currentTarget;
        const indice = Array.from(celulas).indexOf(celula);

       // Verifica se as células estão vazias e, se tiver, encerra a função
       if (tabuleiro[indice] !== '' || !jogoAtivo) {
            return;
       }

       // Caso contrário, armazena o jogador em cada célula
       tabuleiro[indice] = jogadorAtual;
       celula.appendChild(carregaImagem(jogadorAtual));

       // Conforme as verificações das jogadas, envia as mensagens específicas
       if (verifica(jogadorAtual)) {
            jogoAtivo = false;
            status.textContent = `${jogadorAtual} venceu!`;
            reiniciaDepois();
       } else if (tabuleiro.includes('')) {
            jogadorAtual = jogadorAtual === 'Batman' ? 'Superman' : 'Batman';
            status.textContent = `É a vez do ${jogadorAtual}`;
       } else {
            jogoAtivo = false;
            status.textContent = 'Empate!';
            reiniciaDepois();
       }
    }

    // Função que testa cada jogada, percorrendo o Array
    // E comparando com o jogador atual
    // Quando encontra a situação, envia a mensagem adequada
    function verifica(jogador) {
        for (const jogadas of possibilidades) {
            if (
                tabuleiro[jogadas[0]] === jogador &&
                tabuleiro[jogadas[1]] === jogador &&
                tabuleiro[jogadas[2]] === jogador
            ) {
                // Destaca as três células vencedoras
                jogadas.forEach((i) => celulas[i].classList.add('vitoria'));
                return true;
            }
        }
        return false;
    }

    // Função para carregar a imagem dos personagens em cada célula
    function carregaImagem(jogador) {
        const imagem = new Image();

        // Condicional com operador ternário
        // Verifica qual o jogador ativo e preenche com a imagem definida
        imagem.src = jogador === 'Batman' ? 'images/batman.svg' : 'images/superman.svg';
        imagem.alt = jogador;
        return imagem;
    }

    // Reinicia o jogo sozinho 3 segundos depois do fim da partida
    function reiniciaDepois() {
        timerReinicio = setTimeout(resetJogo, 3000);
    }

    // Função para zerar o jogo, atribuindo espaços no Array
    function resetJogo() {
        clearTimeout(timerReinicio);
        tabuleiro = ['', '', '', '', '', '', '', '', ''];
        jogoAtivo = true;
        jogadorAtual = 'Batman';
        status.textContent = 'É a vez do Batman';

        // Laço que percorre o Array, limpando o conteúdo
        // Apaga cada filho do Array, um a um
        celulas.forEach((celula) => {
            celula.textContent = '';
            celula.classList.remove('vitoria');
            while (celula.firstChild) {
                celula.removeChild(celula.firstChild);
            }
        })
    }

    // Dispara o evento Click do mouse, chamando a função clica
    celulas.forEach((celula) => {
        celula.addEventListener('click', clica);
    });

    // Dispara o evento click do mouse, chamando a função resetJogo
    resetBtn.addEventListener('click', resetJogo);

})
