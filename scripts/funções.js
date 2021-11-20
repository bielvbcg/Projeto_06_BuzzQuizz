const sectionTelaInicial = document.querySelector('.tela-inicial');
const sectionInfoQuizz = document.querySelector('.infoCriandoQuizz');
const sectionCriarPerguntas = document.querySelector('.crieSuasPerguntas');
const sectionCriandoNiveis = document.querySelector('.niveis');
const sectionQuizzPronto = document.querySelector('.QuizzPronto');
const sectionMensagemErro = document.querySelector('.mensagemErro');
const textoErro = document.querySelector('.mensagemErro span');


function ComecandoNovoQuizz() {
    sectionInfoQuizz.classList.remove('sumir');
    sectionTelaInicial.classList.add('sumir');
}

//info's de criando um quizz
let tituloCriandoQuizz;
let URLCriandoQuizz;
let perguntasCriandoQuizz;
let niveisCriandoQuizz;

function verificarDadosCriandoQuizz() {
    tituloCriandoQuizz = document.querySelector('.infoCriandoQuizz .titulo');
    URLCriandoQuizz = document.querySelector('.infoCriandoQuizz .URL');
    perguntasCriandoQuizz = document.querySelector('.infoCriandoQuizz .quantidadePerguntas');
    niveisCriandoQuizz = document.querySelector('.infoCriandoQuizz .quantidadeNiveis');

    if (tituloCriandoQuizz.value.length < 20 || tituloCriandoQuizz.value.length > 65) {
        sectionMensagemErro.classList.remove('sumir');
        textoErro.innerHTML = "Título deve ter entre 20 e 65 caracteres!";

    } else if (perguntasCriandoQuizz.value < 3) {
        sectionMensagemErro.classList.remove('sumir');
        textoErro.innerHTML = "Deve ter no mínimo 3 perguntas!";

    } else if (niveisCriandoQuizz.value < 2) {
        sectionMensagemErro.classList.remove('sumir');
        textoErro.innerHTML = "Deve ter no mínimo 2 níveis!";
    } else {
        CriandoPerguntas();
    }
}

function CriandoPerguntas() {
    sectionInfoQuizz.classList.add('sumir');
    sectionCriarPerguntas.classList.remove('sumir');
    let classe = "";

    for (let i = 0; i < perguntas.value; i++) {
        if (i === 0) {
            classe = "editandoPergunta";
        } else {
            classe = "";
        }
        sectionCriarPerguntas.innerHTML += `
        <div class="pergunta ${classe}" onclick="mostrarDadosPergunta(this)">
        <div class="subTituloSecao">Pergunta ${i + 1}</div>
        <input class="textoPergunta" type="text" placeholder="Texto da pergunta">
        <input class="corFundo" type="text" placeholder="Cor de fundo da pergunta">
  
        <div class="subTituloSecao">Resposta correta</div>
        <input class="respostaCorreta" type="text" placeholder="Resposta correta">
        <input type="text" placeholder="URL da imagem">
  
        <div class="subTituloSecao">Respostas incorretas</div>
        <input class="respstaIncorreta1" type="text" placeholder="Resposta incorreta 1">
        <input type="text" placeholder="URL da imagem 1">
        <input class="respostaIncorreta2" type="text" placeholder="Resposta incorreta 2">
        <input type="text" placeholder="URL da imagem 2">
        <input class="respostaIncorreta3" type="text" placeholder="Resposta incorreta 3">
        <input type="text" placeholder="URL da imagem 3">
      </div> `
    }
    sectionCriarPerguntas.innerHTML += `<button onclick="verificarPerguntas()">Prosseguir para criar níveis</button>`
}

function mostrarDadosPergunta(perguntaSelecionada) {
    const perguntaAberta = document.querySelector('.crieSuasPerguntas .editandoPergunta');
    perguntaAberta.classList.remove('editandoPergunta');
    perguntaSelecionada.classList.add('editandoPergunta');
}

//info's de criando um quizz
let textoPerguntaCriandoQuizz;
let corFundoCriandoQuizz;
let respostaCorretaCriandoQuizz;

let respostaErrada1CriandoQuizz;
let respostaErrada2CriandoQuizz;
let respostaErrada3CriandoQuizz;

function verificarPerguntas() {
    textoPerguntaCriandoQuizz = document.querySelectorAll('.textoPergunta');
    corFundoCriandoQuizz = document.querySelectorAll('.corFundo');
    respostaCorretaCriandoQuizz = document.querySelectorAll('.respostaCorreta');

    respostaErrada1CriandoQuizz = document.querySelectorAll('respstaIncorreta1');
    respostaErrada2CriandoQuizz = document.querySelectorAll('respstaIncorreta2');
    respostaErrada3CriandoQuizz = document.querySelectorAll('respstaIncorreta3');

    for (let i = 0; i < textoPergunta.length; i++) {
        if (textoPerguntaCriandoQuizz[i].value.length < 20) {
            sectionMensagemErro.classList.remove('sumir');

            textoErro.innerHTML = "A pergunta deve ter no mínimo 20 caracteres!";
        } else if (corFundoCriandoQuizz[i].value.length < 7 || corFundo[i].value.length > 7) {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "A cor deve ser na forma  hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)";

        } else if (respostaCorretaCriandoQuizz[i].value === "") {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "informe a resposta correta!";

        } else if (respostaErrada1CriandoQuizz[i].value === "" && respostaErrada2CriandoQuizz[i].value === "" && respostaErrada3CriandoQuizz[i].value === "") {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "informe ao menos 1 resposta errada!";
        } else {
            criandoNiveis();
        }
    }
}

//info's de criando um quizz
function criandoNiveis() {
    sectionCriarPerguntas.classList.add('sumir');
    sectionCriandoNiveis.classList.remove('sumir');
}

function fecharMensagemErro() {
    sectionMensagemErro.classList.add('sumir');
}