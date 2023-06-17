var jogadores = [];

function gerarNumerosAleatorios(quantidade, min, max) {
    if (quantidade > (max - min + 1)) {
        console.log("Intervalo insuficiente ...");
        return;
    }

    var numeros = [];

    while (numeros.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

        if (!numeros.includes(aleatorio)) {
            numeros.push(aleatorio);
        }
    }

    return numeros;
}

function gerarCartela() {
    var nomeJogador = prompt('Digite o nome do jogador');

    var cartela = [
        gerarNumerosAleatorios(5, 1, 15),
        gerarNumerosAleatorios(5, 16, 30),
        gerarNumerosAleatorios(5, 31, 45),
        gerarNumerosAleatorios(5, 46, 60),
        gerarNumerosAleatorios(5, 61, 75)
    ];

    jogadores.push({
        nomeJogador: nomeJogador,
        cartela: cartela
    });

    desenharCartela(nomeJogador, cartela);

    console.log(jogadores);
}

function reiniciarJogo() {
    jogadores = [];
    var divCartelas = document.getElementById("espaco-cartelas");
    divCartelas.innerHTML = "";

    location.reload();
}

function desenharCartela(nome, cartela) {
    var div = document.getElementById('espaco-cartelas');

    var cartelaContainer = document.createElement('div');
    cartelaContainer.classList.add('cartela');

    var nomeJogadorElement = document.createElement('h3');
    nomeJogadorElement.innerText = nome;
    cartelaContainer.appendChild(nomeJogadorElement);

    var tabela = document.createElement('table');
    tabela.id = nome; 

    var thead = document.createElement('thead');

    var thB = document.createElement('th');
    thB.innerText = 'B';
    var thI = document.createElement('th');
    thI.innerText = 'I';
    var thN = document.createElement('th');
    thN.innerText = 'N';
    var thG = document.createElement('th');
    thG.innerText = 'G';
    var thO = document.createElement('th');
    thO.innerText = 'O';

    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            if (i == 2 && j == 2) {
                td.innerText = "X";
                tr.appendChild(td);
            } else {
                td.innerText = cartela[j][i];
                tr.appendChild(td);
            }
        }
        tabela.appendChild(tr);
    }

    tabela.appendChild(thead);
    cartelaContainer.appendChild(tabela);
    div.appendChild(cartelaContainer);
}

function jogar() {
    var resultadoSection = document.getElementById("resultado");
    resultadoSection.innerHTML = "<h2>Números</h2>";

    var numerosSorteados = [];
    var numerosPossiveis = gerarNumerosAleatorios(75, 1, 75);
    var contador = 0;

    var interval = setInterval(function () {
        if (contador === numerosPossiveis.length) {
            clearInterval(interval);
            var vencedor = determinarVencedor();
            var header = document.querySelector("header");
            header.innerHTML = "<h1>Vencedor: " + vencedor + "</h1>";

            var jogarButton = document.createElement("button");
            jogarButton.innerText = "Jogar";
            jogarButton.onclick = jogar;
            resultadoSection.appendChild(jogarButton);
        } else {
            var numeroSorteado = numerosPossiveis[contador];
            var numeroElement = document.createElement("span");
            numeroElement.innerText = numeroSorteado;
            resultadoSection.appendChild(numeroElement);

            for (var j = 0; j < jogadores.length; j++) {
                var jogador = jogadores[j];
                var cartela = jogador.cartela;

                for (var k = 0; k < cartela.length; k++) {
                    var coluna = cartela[k];
                    var tabelaCartela = document.getElementById(jogador.nomeJogador);
                    var celulas = tabelaCartela.getElementsByTagName("td");

                    for (var l = 0; l < celulas.length; l++) {
                        if (parseInt(celulas[l].innerText) === numeroSorteado) {
                            celulas[l].classList.add("pintado");
                            break;
                        }
                    }
                }
            }

            setTimeout(function () {
                numeroElement.classList.add("destaque");
            }, 500);

            contador++;
        }
    }, 1000);
}

function determinarVencedor() {
    var vencedor = "";
    var maiorQuantidadeNumerosPintados = 0;

    for (var i = 0; i < jogadores.length; i++) {
        var jogador = jogadores[i];
        var cartela = jogador.cartela;
        var quantidadeNumerosPintados = 0;

        for (var j = 0; j < cartela.length; j++) {
            var coluna = cartela[j];
            var tabelaCartela = document.getElementById(jogador.nomeJogador);
            var celulas = tabelaCartela.getElementsByTagName("td");

            for (var k = 0; k < celulas.length; k++) {
                if (celulas[k].classList.contains("pintado")) {
                    quantidadeNumerosPintados++;
                    break;
                }
            }
        }

        if (quantidadeNumerosPintados > maiorQuantidadeNumerosPintados) {
            maiorQuantidadeNumerosPintados = quantidadeNumerosPintados;
            vencedor = jogador.nomeJogador;
        }
    }

    return vencedor;
}