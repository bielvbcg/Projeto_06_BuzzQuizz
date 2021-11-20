// Código JS
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ
//geral: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes

let quizzSelecionado; 

function answer(response){
    quizzSelecionado = response.data
    console.log(quizzSelecionado);
    alterarBanner();
    alteraPergunta();
    alteraResultado();

    mudarTela(sectionTelaInicial , sectionTelaExibicaoQuizz)
}

function alterarBanner(){
    const titleQuizz = document.querySelector('.banner-text');
    titleQuizz.innerHTML = quizzSelecionado.title;

    const imgQuizz = document.querySelector('.banner-topo');
    imgQuizz.style.backgroundImage = `url(${quizzSelecionado.image})`;
}

function alteraPergunta(){
    const arrayPerguntas = quizzSelecionado.questions;
    const elementoPergunta = document.querySelector('.tela-exibicao-quizz');

    let aux;
    let exibeOpcoes;

    // console.log(arrayPerguntas)

    for(let i = 0; i < arrayPerguntas.length; i++){
        // console.log(pergunta)
        let pergunta = arrayPerguntas[i]
        aux = `
        <div class="visualizacao-perguntas">
            <div class="perguntaj" style="background-color: ${pergunta.color}">
                <h3 class="pergunta-text">
                    ${pergunta.title}
                </h3>
            </div>
        `
        
        exibeOpcoes = `<div class="opcoes">`

        for (let i = 0; i < pergunta.answers.length; i++) {
            let alternativa = pergunta.answers[i];
            // console.log(alternativa)

            exibeOpcoes += `
                <div class="text-resposta">
                    <img class="img-pergunta" src="${alternativa.image}" alt="">
                    <p>${alternativa.text}</p>
                </div>
            `
        }
        exibeOpcoes += `</div>`

        elementoPergunta.innerHTML += aux + exibeOpcoes + `</div>`
    }
}

function alteraResultado(){
    const arrayResultados = quizzSelecionado.levels;
    const elementoResultado = document.querySelector('.visualizacao-resultados');
}

function carregaQuizz(idQuizz){
    // const url = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`)

    const url = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    
    url.then(answer);
    url.catch(error => { 
        return error
    });
}