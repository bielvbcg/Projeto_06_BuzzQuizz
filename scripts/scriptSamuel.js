// Código JS
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ
//geral: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes

let quizzSelecionado; 

function carregaQuizz(idQuizz){

    const url = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    
    url.then(response => {
        
        quizzSelecionado = response.data
        
        const arrayPerguntas = quizzSelecionado.questions;
        const sectionTelaExibicaoQuizz = document.querySelector('.tela-exibicao-quizz');
        
        let aux;
        let exibeOpcoes;
            
        sectionTelaExibicaoQuizz.innerHTML =
        `<div class='banner-topo' style='background-image: url(${quizzSelecionado.image})'>
            <h1 class='banner-text'>${quizzSelecionado.title}</h1>
        </div>`;

        for(let i = 0; i < arrayPerguntas.length; i++){
    
            const pergunta = arrayPerguntas[i]
            let respostas = []
    
            for (let k = 0 ; k < pergunta.answers.length ; k++) {
                respostas.push(pergunta.answers[k])
            };
    
            respostas.sort(() => {return Math.random() - 0.5})
            
            aux = `
            <div class="visualizacao-perguntas">
                <div class="perguntaj" style="background-color: ${pergunta.color}">
                    <h3 class="pergunta-text">
                        ${pergunta.title}
                    </h3>
                </div>
            `
            
            exibeOpcoes = `<div class="opcoes">`
    
            for (let j = 0 ; j < respostas.length ; j++){ 
                exibeOpcoes += `
                    <div onclick="alternativaSelecionada(this , ${respostas[j].isCorrectAnswer})">
                        <img class="img-pergunta" src="${respostas[j].image}" alt="">
                        <p class="nome-resposta">${respostas[j].text}</p>
                    </div>`
            }
    
            exibeOpcoes += `</div>`
    
            sectionTelaExibicaoQuizz.innerHTML += aux + exibeOpcoes + `</div>`
        }
    
        //a div "visualizacao-resultados" logo abaixo esta aqui apenas para testar o layout
        //deve ser somente incluida nessa parte do codigo como <div class="visualizacao-resultados sumir"></div>
        //e seu conteudo setado com .innerHTML na função que verifica o resultado do quizz utilizando
        //string literals para deixar com as imagens e textos certos
        sectionTelaExibicaoQuizz.innerHTML += `
            <div class="visualizacao-resultados sumir"> 
                <div class="resultado">
                    <span>88% de acerto: Você é praticamente um aluno de Hogwarts!</span>
                </div>
                <div class="descricao-nivel">
                  <div class="imagem-nivel"></div>
                  <p>Gato</p>
                </div>
            </div>
            <footer class="botoes-rodape">
                <button class="reiniciar-quizz" onclick="carregaQuizz(${quizzSelecionado.id})">Reiniciar Quizz</button>
                <button class="return-home" onclick="mudarTela(sectionTelaExibicaoQuizz , sectionTelaInicial)">Voltar pra home</button>
            </footer>
            `

        mudarTela(sectionTelaInicial , sectionTelaExibicaoQuizz)
        sectionTelaExibicaoQuizz.scrollIntoView()
    });

    url.catch(error => { 
        return error
    });
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

            if (alternativas[i].innerHTML.contains("true")) {alternativas[i].classList.add("resposta-correta")}
            else {alternativas[i].classList.add("resposta-errada")}
        }
    }
}