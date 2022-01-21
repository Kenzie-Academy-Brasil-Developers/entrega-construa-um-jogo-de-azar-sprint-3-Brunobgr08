let jogador,
    imgSel,
    humanSelection,
    machineSelection,
    winsPlayer = 0,
    winsMachine = 0,
    interval,
    timeInterval = 500,
    timeStopAuto = 6000,
    currentBGIndex = 0,
    classBG = ['bgImage__pedra', 'bgImage__papel', 'bgImage__tesoura']
    max = classBG.length;


const boasVindas = document.getElementById('boasVindas');
const main__game = document.getElementById('main__game');
const formName = document.getElementById('formName');
const nomeJogador = document.querySelector('#playerName');
const h4Welcome = document.getElementById('boasVindas__h4');
const btnConfirm = document.getElementById('btnConfirm');
const btnCancel = document.getElementById('btnCancel');
const container_pedra = document.getElementById('Pedra');
const container_papel = document.getElementById('Papel');
const container_tesoura = document.getElementById('Tesoura');
const human__h3 = document.getElementById('human__h3');
const divMachine = document.getElementById('divMachine');
const machine__h3 = document.getElementById('divMachine__h3');
const containerImgMachine = document.getElementById('ctnImgMac');
const currentWinner = document.getElementById('currentWinner');
const player = document.getElementById('jogadorX');
const countPlayer = document.getElementById('countPlayerX');
const countMachine = document.getElementById('countMachine');
const botaoReset = document.getElementById('resetGame');
const topHr = document.getElementById('topHr');
const bottHr = document.getElementById('bottHr');

const valorSel = document.querySelectorAll('div#containerImagens div');

btnConfirm.addEventListener('click', function(e){
    jogador = nomeJogador.value;
    if ( jogador == null || jogador ==""){
        h4Welcome.innerText = "É necessário informar o nome para jogar!";
        nomeJogador.focus();
    } else {
        player.innerText = "Vitórias: "+ jogador;
        boasVindas.classList.add("hidden");
        main__game.classList.add("show");
        topHr.classList.add("showHR");
        bottHr.classList.add("showHR");
    }

});

const eventoClick = function(event){

    imgSel = event.target;

    human__h3.innerHTML = "Você escolheu: "+ imgSel.id;

    if (imgSel.id === "Pedra"){
        container_pedra.classList.add("focusImg");
        container_papel.classList.add("hiddenImg");
        container_tesoura.classList.add("hiddenImg");
        humanSelection = 1;
        imgSel.removeEventListener('click', eventoClick);
    }else if (imgSel.id === "Papel"){
        container_papel.classList.add("focusImg");
        container_pedra.classList.add("hiddenImg");
        container_tesoura.classList.add("hiddenImg");
        humanSelection = 2;
        imgSel.removeEventListener('click', eventoClick);
    }else if(imgSel.id === "Tesoura"){
        container_tesoura.classList.add("focusImg");
        container_pedra.classList.add("hiddenImg");
        container_papel.classList.add("hiddenImg");
        humanSelection = 3;
        imgSel.removeEventListener('click', eventoClick);
    }

    randomMachine();
    setTimeout(function(){
        checarVencedor(humanSelection, machineSelection);
    }, 7000);
}

botaoReset.addEventListener('click', jogarNovamente);

for (let i = 0; i < valorSel.length; i++){
    valorSel[i].addEventListener('click', eventoClick);
}

function randomMachine(){

    machineSelection = Math.floor((Math.random() * 3) + 1);

    machine__h3.style.display ="flex";
    machine__h3.innerText = "O computador está jogando..."
    machine__h3.classList.add("divHuman__h3__pulse");
    containerImgMachine.style.display = "flex";
    startBG();

    setTimeout(function(){
        stopBGInterval();
        if (machineSelection === 1){
            containerImgMachine.className = 'containerImagensMac bgImage__pedra';
            machine__h3.classList.remove("divHuman__h3__pulse");
            machine__h3.innerText = "A máquina escolheu: Pedra";
        }else if (machineSelection===2){
            containerImgMachine.className = 'containerImagensMac bgImage__papel';
            machine__h3.classList.remove("divHuman__h3__pulse");
            machine__h3.innerText = "A máquina escolheu: Papel";
        }else if (machineSelection===3){
            containerImgMachine.className = 'containerImagensMac bgImage__tesoura';
            machine__h3.classList.remove("divHuman__h3__pulse");
            machine__h3.innerText = "A máquina escolheu: Tesoura";
        }
    }, 6000);
}

function checarVencedor(valorHuman, valorMachine){
    botaoReset.removeAttribute('disabled');
    botaoReset.style.cursor = 'pointer';
    botaoReset.style.color = '#000000';

    if ( valorHuman === valorMachine){
        //jogo empatado
        currentWinner.innerText = "Jogo empatado. Tente novamente!"
        setTimeout(function(){ jogarNovamente() }, 3000);
    } else if ( valorHuman===1 && valorMachine===2 || valorHuman===2 && valorMachine===3 || valorHuman===3 && valorMachine===1 ){
        // vitoria maquina
        currentWinner.innerText = "A máquina ganhou! Tente novamente.";
        winsMachine++;
    } else if ( valorHuman===1 && valorMachine===3 || valorHuman===2 && valorMachine===1 || valorHuman===3 && valorMachine===2 ){
        // vitoria humano
        currentWinner.innerText = "Você ganhou!!";
        winsPlayer++;
    }
    mostrarVitorias();
}

function jogarNovamente(){

    container_papel.classList.remove("focusImg");
    container_papel.classList.remove("hiddenImg");
    container_pedra.classList.remove("focusImg");
    container_pedra.classList.remove("hiddenImg");
    container_tesoura.classList.remove("focusImg");
    container_tesoura.classList.remove("hiddenImg");

    machine__h3.style.display ="none";
    containerImgMachine.style.display = "none";
    currentWinner.innerText = '';

    human__h3.innerText = 'Escolha uma opção abaixo :';

    imgSel.addEventListener('click', eventoClick);

}

function mostrarVitorias(){
    countPlayer.innerText = winsPlayer;
    countMachine.innerText = winsMachine;
}

function replaceBG() {

    containerImgMachine.className = 'containerImagensMac';
    containerImgMachine.classList.add(classBG[currentBGIndex]);

    currentBGIndex++;

    if(currentBGIndex >= max){
        currentBGIndex = 0;
    }
}
let startBG = () => {
    interval = setInterval(() => {
        replaceBG()
    }, timeInterval);
}

let stopBGInterval = () => {
    clearInterval(interval);
}
