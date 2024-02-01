import {jogador1, jogador2} from '../js/objetos/jogadores.js'
 
const pontosJogador1 = document.querySelector('.pontos-jogador-1');
const pontosJogador2 = document.querySelector('.pontos-jogador-2');
const espacos = document.querySelectorAll('.espacos');
let numeroDaJogada = 0;

espacos.forEach((espaco) => {
    espaco.addEventListener('click', () => {
        console.log(numeroDaJogada)
        if (espaco.innerHTML == ''){
            espaco.innerHTML = jogadorDaVez(numeroDaJogada).simbolo;
        }else{
            alert('Espaço ocupado');
            return;
        }
        if (verificarSeVenceu(espacos,numeroDaJogada)) {
            reiniciarPartida(espacos);
            return;
        } else if (numeroDaJogada === 8) {
            alert('Deu Velha!')
            reiniciarPartida(espacos);
            return;
        };
        numeroDaJogada += 1;
    });
});

function jogadorDaVez(numeroDaJogada) {
    if (numeroDaJogada % 2 === 0){
        document.querySelector('.pontuacao-jogador-1').classList.remove('borda');
        document.querySelector('.pontuacao-jogador-2').classList.add('borda');
        return jogador1;
    }
    else{
        document.querySelector('.pontuacao-jogador-2').classList.remove('borda');
        document.querySelector('.pontuacao-jogador-1').classList.add('borda');
        return jogador2;
    }
}

function verificarSeVenceu(espacos, numeroDaJogada) {
    if (verificarSequencia(0, 1, 2, espacos,numeroDaJogada) ||
            verificarSequencia(3, 4, 5, espacos,numeroDaJogada) ||
            verificarSequencia(6, 7, 8, espacos,numeroDaJogada) ||
            verificarSequencia(0, 3, 6, espacos,numeroDaJogada) ||
            verificarSequencia(1, 4, 7, espacos,numeroDaJogada) ||
            verificarSequencia(2, 5, 8, espacos,numeroDaJogada) ||
            verificarSequencia(0, 4, 8, espacos,numeroDaJogada) ||
            verificarSequencia(2, 4, 6, espacos,numeroDaJogada)) {
        return true;
    } else {
        return false;
    }
}
function verificarSequencia(a, b, c, espacos, numeroDaJogada) {
    if (espacos[a].innerText === espacos[b].innerText && espacos[b].innerText === espacos[c].innerText && espacos[c].innerText !== '') {
        let vencedor = jogadorDaVez(numeroDaJogada);
        vencedor.pontos += 1;
        alert(`${vencedor.nome} venceu`);
        if(vencedor.nome === 'Jogador 1'){
            pontosJogador1.innerHTML = vencedor.pontos;
        }else if(vencedor.nome === 'Jogador 2'){
            pontosJogador2.innerHTML = vencedor.pontos;
        }
        return true;
    }
}
function reiniciarPartida(espaços) {
    espaços.forEach(espaço => espaço.innerHTML = '');
    numeroDaJogada = 0;
    jogadorDaVez(1);
}