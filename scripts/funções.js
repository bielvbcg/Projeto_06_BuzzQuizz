const sectionTelaInicial = document.querySelector('.tela-inicial');
const sectionInfoQuizz = document.querySelector('.infoCriandoQuizz');
const sectionCriarPerguntas = document.querySelector('.crieSuasPerguntas');
const sectionCriandoNiveis = document.querySelector('.niveisCriandoQuizz');
const sectionQuizzPronto = document.querySelector('.QuizzPronto');
const sectionMensagemErro = document.querySelector('.mensagemErro');
const textoErro = document.querySelector('.mensagemErro span');

let criandoQuizz = { title: "", image: "", questions: [], levels: [] };

function ComecandoNovoQuizz() {
    sectionInfoQuizz.classList.remove('sumir');
    sectionTelaInicial.classList.add('sumir');
}

function verificarDadosCriandoQuizz() {
    criandoQuizz.title = document.querySelector('.infoCriandoQuizz .titulo').value;
    criandoQuizz.image = document.querySelector('.infoCriandoQuizz .URL').value;
    criandoQuizz.questions.length = document.querySelector('.infoCriandoQuizz .quantidadePerguntas').value;
    criandoQuizz.levels.length = document.querySelector('.infoCriandoQuizz .quantidadeNiveis').value;

    // if (criandoQuizz.title.length < 20 || criandoQuizz.title.length > 65) {
    //     sectionMensagemErro.classList.remove('sumir');
    //     textoErro.innerHTML = "Título deve ter entre 20 e 65 caracteres!";

    // } else if (!criandoQuizz.image.includes('https')) {
    //     sectionMensagemErro.classList.remove('sumir');
    //     textoErro.innerHTML = "Coloque uma URL válida!";

    // } else if (criandoQuizz.questions.length < 3) {
    //     sectionMensagemErro.classList.remove('sumir');
    //     textoErro.innerHTML = "Deve ter no mínimo 3 perguntas!";

    // } else if (criandoQuizz.levels.length < 2) {
    //     sectionMensagemErro.classList.remove('sumir');
    //     textoErro.innerHTML = "Deve ter no mínimo 2 níveis!";
    // } else {
    //     CriandoPerguntas();
    // }
    CriandoPerguntas();

}

function CriandoPerguntas() {
    sectionInfoQuizz.classList.add('sumir');
    sectionCriarPerguntas.classList.remove('sumir');
    let classe = "";

    sectionCriarPerguntas.innerHTML = `<div class="tituloSecao">Crie suas perguntas</div>`;

    for (let i = 0; i < criandoQuizz.questions.length; i++) {
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
        <input class="URLrespostaCorreta" type="text" placeholder="URL da imagem">
  
        <div class="subTituloSecao">Respostas incorretas</div>
        <input class="respstaIncorreta1" type="text" placeholder="Resposta incorreta 1">
        <input class="URLrespostaIncorreta1" type="text" placeholder="URL da imagem 1">
        <input class="respostaIncorreta2" type="text" placeholder="Resposta incorreta 2">
        <input class="URLrespostaIncorreta2" type="text" placeholder="URL da imagem 2">
        <input class="respostaIncorreta3" type="text" placeholder="Resposta incorreta 3">
        <input class="URLrespostaIncorreta3" type="text" placeholder="URL da imagem 3">
      </div> `
    }
    sectionCriarPerguntas.innerHTML += `<button onclick="verificarPerguntas()">Prosseguir para criar níveis</button>`
}

function mostrarDadosPergunta(perguntaSelecionada) {
    const perguntaAberta = document.querySelector('.crieSuasPerguntas .editandoPergunta');
    perguntaAberta.classList.remove('editandoPergunta');
    perguntaSelecionada.classList.add('editandoPergunta');
}

function verificarPerguntas() {
    const textoPerguntaCriandoQuizz = document.querySelectorAll('.crieSuasPerguntas .textoPergunta');
    const corFundoCriandoQuizz = document.querySelectorAll('.crieSuasPerguntas .corFundo');
    const respostaCorretaCriandoQuizz = document.querySelectorAll('.crieSuasPerguntas .respostaCorreta');
    const URLrespostaCorreta = document.querySelectorAll('.crieSuasPerguntas .URLrespostaCorreta');

    const respostaErrada1CriandoQuizz = document.querySelectorAll('.crieSuasPerguntas .respstaIncorreta1');
    const URLrespostaIncorreta1 = document.querySelectorAll('.crieSuasPerguntas .URLrespostaIncorreta1');
    const respostaErrada2CriandoQuizz = document.querySelectorAll('.crieSuasPerguntas .respstaIncorreta2');
    const URLrespostaIncorreta2 = document.querySelectorAll('.crieSuasPerguntas .URLrespostaIncorreta2');
    const respostaErrada3CriandoQuizz = document.querySelectorAll('.crieSuasPerguntas .respstaIncorreta3');
    const URLrespostaIncorreta3 = document.querySelectorAll('.crieSuasPerguntas .URLrespostaIncorreta3');


    for (let i = 0; i < textoPerguntaCriandoQuizz.length; i++) {
        if (textoPerguntaCriandoQuizz[i].value.length < 20) {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "A pergunta deve ter no mínimo 20 caracteres!";

        } else if (corFundoCriandoQuizz[i].value.length < 7 || corFundoCriandoQuizz[i].value.length > 7 || !corFundoCriandoQuizz[i].value.includes('#')) {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "A cor deve ser na forma  hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)";

        } else if ((!URLrespostaIncorreta1[i].value.includes('https') && !URLrespostaIncorreta2[i].value.includes('https') && !URLrespostaIncorreta3[i].value.includes('https')) || !URLrespostaCorreta[i].value.includes('https')) {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "informe uma URL válida, ou alguma URL esta inserida incorretamente!";

        } else if (respostaCorretaCriandoQuizz[i].value === "") {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "informe a resposta correta!";

        } else if (respostaErrada1CriandoQuizz[i].value === "" && respostaErrada2CriandoQuizz[i].value === "" && respostaErrada3CriandoQuizz[i].value === "") {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "informe ao menos 1 resposta errada!";
        } else {

            criandoQuizz.questions = [];
            for (let i = 0; i < criandoQuizz.questions.length; i++) {
                criandoQuizz.questions.push({ title: textoPerguntaCriandoQuizz[i].value, color: corFundoCriandoQuizz[i].value, answers: [] });

                criandoQuizz.questions[i].answers.push({ text: respostaCorretaCriandoQuizz[i].value, image: URLrespostaCorreta[i].value, isCorrectAnswer: true });

                if (respostaErrada1CriandoQuizz.value !== "") {
                    criandoQuizz.questions[i].answers.push({ text: respostaErrada1CriandoQuizz[i].value, image: URLrespostaIncorreta1[i].value, isCorrectAnswer: false });
                }
                if (respostaErrada2CriandoQuizz.value !== "") {
                    criandoQuizz.questions[i].answers.push({ text: respostaErrada2CriandoQuizz[i].value, image: URLrespostaIncorreta2[i].value, isCorrectAnswer: false });
                }
                if (respostaErrada3CriandoQuizz.value !== "") {
                    criandoQuizz.questions[i].answers.push({ text: respostaErrada3CriandoQuizz[i].value, image: URLrespostaIncorreta3[i].value, isCorrectAnswer: false });
                }
            }
            criandoNiveis();
        }
    }
    console.log(criandoQuizz);
}

function criandoNiveis() {
    sectionCriarPerguntas.classList.add('sumir');
    sectionCriandoNiveis.classList.remove('sumir');
    let classe = "";

    sectionCriandoNiveis.innerHTML = `<div class="tituloSecao">Agora, decida os níveis</div>`;

    for (let i = 0; i < criandoQuizz.levels.length; i++) {
        if (i === 0) {
            classe = "editandoNivel";
        } else {
            classe = "";
        }
        sectionCriandoNiveis.innerHTML += `
        <div class="nivel ${classe}" onclick="mostrarDadosNivel(this)">
        <div class="subTituloSecao">Nível ${i + 1}</div>
        <input class="tituloNilvelCriandoQuizz" type="text" placeholder="Título do nível">
        <input class="acertosCriandoQuizz" type="text" placeholder="% de acerto mínima">
        <input class="URLnivel" type="text" placeholder="URL da imagem do nível">
        <input class="legendaNivel" type="text" placeholder="Descrição do nível">
        </div>`;
    }
    sectionCriandoNiveis.innerHTML += `<button onclick="verificarNiveis()">Finalizar Quizz</button>`;
}

function mostrarDadosNivel(nivelSelecionado) {
    const nivelAberto = document.querySelector('.niveisCriandoQuizz .editandoNivel');
    nivelAberto.classList.remove('editandoNivel');
    nivelSelecionado.classList.add('editandoNivel');
}

//info's de criando um quizz
let tituloNilvelCriandoQuizz;
let acertosCriandoQuizz;
let URLnivelCriandoQuizz;
let legendaNivelCriandoQuizz;

function verificarNiveis() {
    tituloNilvelCriandoQuizz = document.querySelectorAll('.niveisCriandoQuizz .tituloNilvelCriandoQuizz');
    acertosCriandoQuizz = document.querySelectorAll('.niveisCriandoQuizz .acertosCriandoQuizz');
    URLnivelCriandoQuizz = document.querySelectorAll('.niveisCriandoQuizz .URLnivel');
    legendaNivelCriandoQuizz = document.querySelectorAll('.niveisCriandoQuizz .legendaNivel');

    let contemO = false;

    for (let i = 0; i < criandoQuizz.levels.length; i++) {

        if (tituloNilvelCriandoQuizz[i].value.length < 10) {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "O título do nível deve ter ao menos 10 caracteres!";
            return;
        } else if (acertosCriandoQuizz[i].value < 0 || acertosCriandoQuizz[i].value > 100 || acertosCriandoQuizz[i].value === "") {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "A porcentagem deve ser apenas um valor inteiro entre  e 100!";
            return;
        } else if (!URLnivelCriandoQuizz[i].value.includes('https')) {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "Digite uma URL válida!";
            return;
        } else if (legendaNivelCriandoQuizz[i].value.length < 30) {
            sectionMensagemErro.classList.remove('sumir');
            textoErro.innerHTML = "A descrição deve ter ao menos 30 caracteres!";
            return;
        } else if (acertosCriandoQuizz[i].value == 0) {
            contemO = true;
        }
    }

    if (!contemO) {
        sectionMensagemErro.classList.remove('sumir');
        textoErro.innerHTML = "Você deve ter um nível com 0% de acertos!";
    } else {
        for (let i = 0; i < criandoQuizz.levels.length; i++) {
            criandoQuizz.levels.push({ title: tituloNilvelCriandoQuizz[i].value, image: URLnivelCriandoQuizz[i].value, text: legendaNivelCriandoQuizz[i].value, minValue: acertosCriandoQuizz[i].value });
        }
        telaFinalizaçãoQuizz();
    }
    console.log(criandoQuizz);
}

function telaFinalizaçãoQuizz() {
    sectionCriandoNiveis.classList.add('sumir');
    sectionQuizzPronto.classList.remove('sumir');

    const imagem = document.querySelector('.QuizzPronto .imagem');
    const tituloQuizz = document.querySelector('.QuizzPronto .imagem span');

    imagem.style = `background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
     url(${criandoQuizz.image})`

    tituloQuizz.innerHTML = `${tituloCriandoQuizz.value}`
}

function FinalizarQuizzCriado() {
    //fazer o post no axios e colocar entre mostrar a tela 3.4 e a verificação dos níveis
}

function voltarHome() {
    sectionQuizzPronto.classList.add('sumir');
    sectionTelaInicial.classList.remove('sumir');
}

function fecharMensagemErro() {
    sectionMensagemErro.classList.add('sumir');
}