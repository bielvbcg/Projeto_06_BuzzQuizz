// Código JS
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ
//geral: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes

let quizzSelecionado; 
//let idQuizz = 2;

function answer(response){
    quizzSelecionado = response.data
    console.log(quizzSelecionado);
    alterarBanner();
    alteraPergunta();
    // alteraResultado();
    alteraRodape();
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

    console.log(arrayPerguntas)

    for(let i = 0; i < arrayPerguntas.length; i++){
        let pergunta = arrayPerguntas[i]
        // console.log(pergunta)
    // for (let pergunta of arrayPerguntas) {

        aux = `
        <div class="visualizacao-perguntas">
            <div class="perguntaj" style="background-color: ${pergunta.color}">
                <h3 class="pergunta-text">
                    ${pergunta.title}
                </h3>
            </div>
        `
        
        exibeOpcoes = `<div class="opcoes">`

        // for (let i = 0; i < pergunta.answers.length; i++) {
        //     let alternativa = pergunta.answers[i];
        //     console.log(alternativa)

            // exibeOpcoes += `
            //     <div class="text-resposta" key="${alternativa.json()}" onclick="alternativaSelecionada(this)">
            //         <img class="img-pergunta" src="${alternativa.image}" alt="">
            //         <p>${alternativa.text}</p>
            //     </div>
        //     `
        // }
       pergunta.answers.forEach((answer, index) => { 
            exibeOpcoes += `
                <div class="text-resposta_${index}" onclick="alternativaSelecionada(this , ${answer.isCorrectAnswer})">
                    <img class="img-pergunta" src="${answer.image}" alt="">
                    <p class="nome-resposta_${index}">${answer.text}</p>
                </div>`
        })

        exibeOpcoes += `</div>`

        elementoPergunta.innerHTML += aux + exibeOpcoes + `</div>`
    }
}

// function alteraResultado(){
//     const arrayResultados = quizzSelecionado.levels;
//     const elementoResultado = document.querySelector('.tela-exibicao-quizz');

//     let exibeResultados;

//     exibeResultados = `<div class="visualizacao-resultados">`;

//     for (let i = 0; i < arrayResultados.length; i++) {
//         let resultadoQuizz = arrayResultados[i];
//         console.log(resultadoQuizz);

//         if(resultadoQuizz[0].minValue>0 && resultadoQuizz[0].minValue<60){
//         exibeResultados += `   
//             <div class="resultado">
//                 <h1 class="resultado-text">
//                     ${resultadoQuizz.title}
//                 </h1>
//             </div>
//             <div class="resultado-imagem">
//                 <img class="img-resposta" src="${resultadoQuizz.image}" alt="">
//                 <p>${resultadoQuizz.text}</p>
//             </div>
//         `}
//         if(resultadoQuizz.minValue[0]>60){
//             exibeResultados += `   
//             <div class="resultado">
//                 <h1 class="resultado-text">
//                     ${resultadoQuizz.title}
//                 </h1>
//             </div>
//             <div class="resultado-imagem">
//                 <img class="img-resposta" src="${resultadoQuizz.image}" alt="">
//                 <p>${resultadoQuizz.text}</p>
//             </div>
//         `
//         }
//         elementoResultado.innerHTML += exibeResultados + `</div>`
//     }
// }

function alteraRodape(){
    const buttonRodape = document.querySelector('.tela-exibicao-quizz');
    
    buttonRodape.innerHTML += `
        <footer class="botoes-rodape">
            <button class="reiniciar-quizz">Reiniciar Quizz</button>
            <button class="return-home" onclick="mudarTela(sectionTelaExibicaoQuizz , sectionTelaInicial)">Voltar pra home</button>
        </footer>
        `
}

function carregaQuizz(idQuizz){
// function carregaQuizz(idQuizz){
    // const url = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`)

    const url = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    
    url.then(answer);
    url.catch(error => { 
        return error
    });
}

function alternativaSelecionada(escolha, resposta){

    const alternativas = escolha.parentNode.childNodes

    if(resposta){
        escolha.classList.add("resposta-correta") 
    } 
    else {
        escolha.classList.add("resposta-errada")
    } 

    for (let i = 1; i <= alternativas.length; i+= 2) {
        if (alternativas[i].classList.contains("resposta-correta") || alternativas[i].classList.contains("resposta-errada")){
            continue;
        }
        else {
            alternativas[i].classList.add('alternativa-selecionada');
        }
    }
}