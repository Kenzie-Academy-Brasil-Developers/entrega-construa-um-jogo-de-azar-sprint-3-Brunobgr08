let player = document.getElementById("jogadorX");
let jogador = prompt("Para jogar, informe seu nome: ");
let imgSel; 
let humanSelection;
let machineSelection;
let winsPlayer = 0;
let winsMachine = 0;

let container_pedra = document.getElementById('Pedra');
let container_papel = document.getElementById('Papel');
let container_tesoura = document.getElementById('Tesoura');
let human__h3 = document.getElementById('human__h3');
let divMachine = document.getElementById('divMachine');
let machine__h3 = document.getElementById('divMachine__h3');
let containerImgMachine = document.getElementById('ctnImgMac');
let currentWinner = document.getElementById('currentWinner');
let countPlayer = document.getElementById('countPlayerX');
let countMachine = document.getElementById('countMachine');
let botaoReset = document.getElementById('resetGame');

const valorSel = document.querySelectorAll('div#containerImagens div');


if ( jogador == null || jogador ==""){
    alert("É necessário informar o nome para jogar!");
    document.location.reload();
} else {
    alert("Bem vindo(a), " + jogador +  "!");
    player.innerText = "Vitórias: "+ jogador;
}

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

    divMachine.style.display = "flex";
    machine__h3.innerText = "O computador está jogando..."
    machine__h3.classList.add("divHuman__h3__pulse");

    setTimeout(function(){
        if (machineSelection === 1){
            containerImgMachine.style.backgroundImage = "url('../assets/img/pedra.png')"; 
            machine__h3.classList.remove("divHuman__h3__pulse");
            machine__h3.innerText = "A máquina escolheu: Pedra";
        }else if (machineSelection===2){
            containerImgMachine.style.backgroundImage = 'url("../assets/img/papel.png")';
            machine__h3.classList.remove("divHuman__h3__pulse");
            machine__h3.innerText = "A máquina escolheu: Papel";
        }else if (machineSelection===3){
            containerImgMachine.style.backgroundImage = 'url("../assets/img/tesoura.png")';
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


    containerImgMachine.style.backgroundImage = "url('../assets/img/gifPedraPapelTesoura.gif')";
    divMachine.style.display = 'none';
    currentWinner.innerText = '';

    human__h3.innerText = 'Escolha uma opção abaixo :';

    imgSel.addEventListener('click', eventoClick);
    
}

function mostrarVitorias(){
    countPlayer.innerText = winsPlayer;
    countMachine.innerText = winsMachine;
}

