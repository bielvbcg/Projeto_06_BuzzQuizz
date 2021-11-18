const sectionTelaInicial = document.querySelector('.tela-inicial');
const sectionInfoQuizz = document.querySelector('.infoCriandoQuizz');
const sectionCriarPerguntas = document.querySelector('.crieSuasPerguntas');
const sectionCriandoNiveis = document.querySelector('.niveis');
const sectionQuizzPronto = document.querySelector('.QuizzPronto');
const sectionMensagemErro = document.querySelector('.mensagemErro');

function ComecandoNovoQuizz() {
    sectionInfoQuizz.classList.remove('sumir');
    sectionTelaInicial.classList.add('sumir');
}

function verificarDadosCriandoQuizz() {
    const titulo = document.querySelector('.infoCriandoQuizz .titulo');
    const URL = document.querySelector('.infoCriandoQuizz .URL');
    const perguntas = document.querySelector('.infoCriandoQuizz .quantidadePerguntas');
    const niveis = document.querySelector('.infoCriandoQuizz .quantidadeNiveis');

    const textoErro = document.querySelector('.mensagemErro span');

    if (titulo.value.length < 20 || titulo.value.length > 65) {
        sectionMensagemErro.classList.remove('sumir');
        textoErro.innerHTML = "Título deve ter entre 20 e 65 caracteres!";
    } else if (perguntas.value < 3) {
        sectionMensagemErro.classList.remove('sumir');
        textoErro.innerHTML = "Deve ter no mínimo 3 perguntas!";
    } else if (niveis.value < 2) {
        sectionMensagemErro.classList.remove('sumir');
        textoErro.innerHTML = "Deve ter no mínimo 2 níveis!";
    } else {
        CriandoPerguntas(perguntas, niveis);
    }
}

function CriandoPerguntas(perguntas, niveis) {
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
        <input type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta">
  
        <div class="subTituloSecao">Resposta correta</div>
        <input type="text" placeholder="Resposta correta">
        <input type="text" placeholder="URL da imagem">
  
        <div class="subTituloSecao">Respostas incorretas</div>
        <input type="text" placeholder="Resposta incorreta 1">
        <input type="text" placeholder="URL da imagem 1">
        <input type="text" placeholder="Resposta incorreta 2">
        <input type="text" placeholder="URL da imagem 2">
        <input type="text" placeholder="Resposta incorreta 3">
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

function verificarPerguntas() {
    //verificar Todos os campos de todas perguntas
}

function fecharMensagemErro() {
    sectionMensagemErro.classList.add('sumir');
}