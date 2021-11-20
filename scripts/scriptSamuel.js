// Código JS
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ
//geral: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes

const idQuizz = 2;
let quizzSelecionado; 

function answer(response){
    quizzSelecionado = response.data
    console.log(quizzSelecionado);
    alterarBanner();
    alteraPergunta();
    // alteraResultado();
    alteraRodape();
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
                <div class="text-resposta_${index}" onclick="alternativaSelecionada(${index}, ${answer.isCorrectAnswer})">
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
            <button class="return-home">Voltar pra home</button>
        </footer>
        `
}

function carregaQuizz(){
    const url = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    
    url.then(answer);
    url.catch(error => { 
        return error
    });
}
carregaQuizz()


function alternativaSelecionada(escolha, resposta){
    console.log({escolha, resposta});
    console.log(escolha.parentNode);
        if(resposta){
            document.querySelector(`.nome-resposta_${escolha}`).classList.add("resposta-correta") 
        } else if (!resposta){
            document.querySelector(`.nome-resposta_${escolha}`).classList.add("resposta-errada")
        }

    const arrayPerguntas = quizzSelecionado.questions;
    for (let i = 0; i <= arrayPerguntas.length; i++) {
        if(escolha !== i){
            const elementoAlternativa = document.querySelector(`.text-resposta_${i}`);
            elementoAlternativa.classList.add('alternativa-selecionada');
        
            console.log(elementoAlternativa)
        }
    }
}
