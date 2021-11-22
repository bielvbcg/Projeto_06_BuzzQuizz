let arraySeusQuizzes = [];
let arrayTodosOsQuizzes = [];

function popularPaginaInicial() {
  const listaQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")

  listaQuizzes.then((listaQuizzes) => {
    const todosOsQuizzes = document.querySelector(".todos-os-quizzes")
    const seusQuizzes = document.querySelector(".seus-quizzes")
        
    arraySeusQuizzes = [];
    arrayTodosOsQuizzes = [];

    for (let i = 0 ; i < listaQuizzes.data.length ; i++){

      const imagem = listaQuizzes.data[i].image
      const idQuizz = listaQuizzes.data[i].id
      const tituloQuizz = listaQuizzes.data[i].title
      
      if (verficaQuizz(listaQuizzes.data[i].id)){
        arraySeusQuizzes.push(
        `
          <div class="quizz" 
            style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${imagem})"
            onclick="carregaQuizz(${idQuizz})">
            <span>${tituloQuizz}</span>
          </div>
        `);
      }
      else {
        arrayTodosOsQuizzes.push(
        `
          <div class="quizz" 
            style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${imagem})"
            onclick="carregaQuizz(${idQuizz})">
            <span>${tituloQuizz}</span>
          </div>
        `);
      }
    }

    for (let i = 0; i < arrayTodosOsQuizzes.length; i++) {
      todosOsQuizzes.innerHTML += arrayTodosOsQuizzes[i];
    }

    for (let i = 0; i < arraySeusQuizzes.length; i++) {
      seusQuizzes.innerHTML += arraySeusQuizzes[i];
    }

    if (arraySeusQuizzes.length !== 0) {
      semQuizzes.classList.add("sumir")
      sectionQuizzesUsuario.classList.remove("sumir")
    }
    else {
      sectionQuizzesUsuario.classList.add("sumir")
      semQuizzes.classList.remove("sumir")
    }
  })

  listaQuizzes.catch(() => { alert("deu ruim patrão") })
}

function verficaQuizz(quizz)
{
  for(let i = 0 ; i < quizzesUsuario.ids.length ; i++){
    if (quizzesUsuario.ids[i] == quizz) {return true}
  }
  return false;
}

popularPaginaInicial();