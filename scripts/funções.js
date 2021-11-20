const sectionTelaInicial = document.querySelector('.tela-inicial');
const sectionInfoQuizz = document.querySelector('.infoCriandoQuizz');
const sectionCriarPerguntas = document.querySelector('.crieSuasPerguntas');
const sectionCriandoNiveis = document.querySelector('.niveisCriandoQuizz');
const sectionQuizzPronto = document.querySelector('.QuizzPronto');
const sectionMensagemErro = document.querySelector('.mensagemErro');
const textoErro = document.querySelector('.mensagemErro span');

//info's de criando um quizz
let tituloNilvelCriandoQuizz;
let acertosCriandoQuizz;
let URLnivelCriandoQuizz;
let legendaNivelCriandoQuizz;

//objeto que vai ser enviado no post
let title = "";
let image = "";
let questions = [];
let levels = [];

let numeroPerguntas;
let numeroNiveis;

function verificarDadosCriandoQuizz() {
    title = document.querySelector('.titulo').value;
    image = document.querySelector('.URL').value;
    numeroPerguntas = document.querySelector('.quantidadePerguntas').value;
    numeroNiveis = document.querySelector('.quantidadeNiveis').value;

    if (title.length < 20 || title.length > 65) {
        chamarErro("Título deve ter entre 20 e 65 caracteres!")

    } else if (!image.includes('https')) {
        chamarErro("Coloque uma URL válida!")

    } else if (numeroPerguntas < 1) {
        chamarErro("Deve ter no mínimo 3 perguntas!")

    } else if (numeroNiveis < 1) {
        chamarErro("Deve ter no mínimo 2 níveis!")

    } else {
        CriandoPerguntas();
    }
}

function CriandoPerguntas() {

    mudarTela(sectionInfoQuizz, sectionCriarPerguntas)

    let classe = "";

    sectionCriarPerguntas.innerHTML = `<div class="tituloSecao">Crie suas perguntas</div>`;

    for (let i = 0; i < numeroPerguntas; i++) {
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
          <input class="respostaIncorreta1" type="text" placeholder="Resposta incorreta 1">
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
    const perguntaAberta = document.querySelector('.editandoPergunta');
    perguntaAberta.classList.remove('editandoPergunta');
    perguntaSelecionada.classList.add('editandoPergunta');
}

function verificarPerguntas() {
    const textoPerguntaCriandoQuizz = document.querySelectorAll('.textoPergunta');
    const corFundoCriandoQuizz = document.querySelectorAll('.corFundo');
    const respostaCorretaCriandoQuizz = document.querySelectorAll('.respostaCorreta');
    const URLrespostaCorreta = document.querySelectorAll('.URLrespostaCorreta');

    const respostaErrada1CriandoQuizz = document.querySelectorAll('.respostaIncorreta1');
    const URLrespostaIncorreta1 = document.querySelectorAll('.URLrespostaIncorreta1');
    const respostaErrada2CriandoQuizz = document.querySelectorAll('.respostaIncorreta2');
    const URLrespostaIncorreta2 = document.querySelectorAll('.URLrespostaIncorreta2');
    const respostaErrada3CriandoQuizz = document.querySelectorAll('.respostaIncorreta3');
    const URLrespostaIncorreta3 = document.querySelectorAll('.URLrespostaIncorreta3');

    questions = [];

    for (let i = 0; i < numeroPerguntas; i++) {

        if (textoPerguntaCriandoQuizz[i].value.length < 20) {
            chamarErro("A pergunta deve ter no mínimo 20 caracteres!")
            return

        } else if (corFundoCriandoQuizz[i].value.length != 7 || !corFundoCriandoQuizz[i].value.includes('#')) {
            chamarErro("A cor deve ser na forma  hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)")
            return

        } else if ((!URLrespostaIncorreta1[i].value.includes('https') && !URLrespostaIncorreta2[i].value.includes('https') && !URLrespostaIncorreta3[i].value.includes('https')) || !URLrespostaCorreta[i].value.includes('https')) {
            chamarErro("informe uma URL válida, ou alguma URL esta inserida incorretamente!")
            return

        } else if (respostaCorretaCriandoQuizz[i].value === "") {
            chamarErro("informe a resposta correta!")
            return

        } else if (respostaErrada1CriandoQuizz[i].value === "" && respostaErrada2CriandoQuizz[i].value === "" && respostaErrada3CriandoQuizz[i].value === "") {
            chamarErro("informe ao menos 1 resposta errada!")
            return

        } else {

            questions.push({ title: textoPerguntaCriandoQuizz[i].value, color: corFundoCriandoQuizz[i].value, answers: [] });
            questions[i].answers.push({ text: respostaCorretaCriandoQuizz[i].value, image: URLrespostaCorreta[i].value, isCorrectAnswer: true })
            questions[i].answers.push({ text: respostaErrada1CriandoQuizz[i].value, image: URLrespostaIncorreta1[i].value, isCorrectAnswer: false });
            questions[i].answers.push({ text: respostaErrada2CriandoQuizz[i].value, image: URLrespostaIncorreta2[i].value, isCorrectAnswer: false });
            questions[i].answers.push({ text: respostaErrada3CriandoQuizz[i].value, image: URLrespostaIncorreta3[i].value, isCorrectAnswer: false });
        }
    }

    criandoNiveis();
}

function criandoNiveis() {

    mudarTela(sectionCriarPerguntas, sectionCriandoNiveis)

    let classe = "";

    sectionCriandoNiveis.innerHTML = `<div class="tituloSecao">Agora, decida os níveis</div>`;

    for (let i = 0; i < numeroNiveis; i++) {
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

function verificarNiveis() {
    tituloNilvelCriandoQuizz = document.querySelectorAll('.tituloNilvelCriandoQuizz');
    acertosCriandoQuizz = document.querySelectorAll('.acertosCriandoQuizz');
    URLnivelCriandoQuizz = document.querySelectorAll('.URLnivel');
    legendaNivelCriandoQuizz = document.querySelectorAll('.legendaNivel');

    let contemO = false;

    for (let i = 0; i < numeroNiveis; i++) {

        if (tituloNilvelCriandoQuizz[i].value.length < 10) {
            chamarErro("O título do nível deve ter ao menos 10 caracteres!")
            return;

        } else if (acertosCriandoQuizz[i].value < 0 || acertosCriandoQuizz[i].value > 100 || acertosCriandoQuizz[i].value === "") {
            chamarErro("A porcentagem deve ser apenas um valor inteiro entre  e 100!")
            return;

        } else if (!URLnivelCriandoQuizz[i].value.includes('https')) {
            chamarErro("Digite uma URL válida!")
            return;

        } else if (legendaNivelCriandoQuizz[i].value.length < 30) {
            chamarErro("A descrição deve ter ao menos 30 caracteres!")
            return;

        } else if (acertosCriandoQuizz[i].value == 0) {
            contemO = true;
        }
    }

    if (!contemO) {
        chamarErro("Você deve ter um nível com 0% de acertos!")

    } else {

        for (let i = 0; i < numeroNiveis; i++) {
            levels.push({ title: tituloNilvelCriandoQuizz[i].value, image: URLnivelCriandoQuizz[i].value, text: legendaNivelCriandoQuizz[i].value, minValue: parseInt(acertosCriandoQuizz[i].value) });
        }
        FinalizarQuizzCriado();
    }
}

function FinalizarQuizzCriado() {
    const quizzFeito = { title, image, questions, levels }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizzFeito);
    promessa.then(telaFinalizaçãoQuizz);

    promessa.catch(() => {
        chamarErro("Algo deu errado!")

        //coloquei esse comentario aqui pra não sair da tela e resetar a pagina quando der ruim no teste
        //tirar comentario quando o codigo for pro ar
        //mudarTela(sectionCriandoNiveis , sectionTelaInicial)
    });
}

function telaFinalizaçãoQuizz(promessa) {
    console.log(promessa)

    mudarTela(sectionCriandoNiveis, sectionQuizzPronto)

    const imagem = document.querySelector('.QuizzPronto .imagem');
    const tituloQuizz = document.querySelector('.QuizzPronto .imagem span');

    imagem.style = `background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
     url(${image})`

    tituloQuizz.innerHTML = `${criandoQuizz.title}`

    title = "";
    image = "";
    questions = [];
    levels = [];
}

function mudarTela(telaQueSome, telaQueAparece) {
    telaQueSome.classList.toggle("sumir");
    telaQueAparece.classList.toggle("sumir");
}

function chamarErro(erro) {
    sectionMensagemErro.classList.remove('sumir');
    textoErro.innerHTML = erro;
}

function fecharMensagemErro() {
    sectionMensagemErro.classList.add('sumir');
}


