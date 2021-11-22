let arraySeusQuizzes = [];
let arrayTodosOsQuizzes = [];
let indiceQuizzes = 0;
let quizzPulblicoBool = true;

function popularPaginaInicial() {
  const listaQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")

  listaQuizzes.then((listaQuizzes) => {
    const todosOsQuizzes = document.querySelector(".todos-os-quizzes")
    const seusQuizzes = document.querySelector(".seus-quizzes")

    arraySeusQuizzes = [];
    arrayTodosOsQuizzes = [];
    indiceQuizzes = 0;

    for (let i = 0; i < listaQuizzes.data.length; i++) {
      quizzPulblicoBool = true;

      while (indiceQuizzes < quizzesUsuario.ids.length) {
        if (quizzesUsuario.ids[indiceQuizzes] == listaQuizzes.data[i].id) {
          arraySeusQuizzes.push(
            `
              <div class="quizz" 
                style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${new URL(listaQuizzes.data[i].image)})"
                onclick="carregaQuizz(${listaQuizzes.data[i].id})">
                <span>${listaQuizzes.data[i].title}</span>
              </div>
            `);
          indiceQuizzes = 0;
          quizzPulblicoBool = false;
          break;
        }

        indiceQuizzes++;
      }

      if (!quizzPulblicoBool) {
        arrayTodosOsQuizzes.push(
          `
            <div class="quizz" 
              style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${new URL(listaQuizzes.data[i].image)})"
              onclick="carregaQuizz(${listaQuizzes.data[i].id})">
              <span>${listaQuizzes.data[i].title}</span>
            </div>
      `)
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

//`
//<div class="quizz" 
//  style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${new URL(listaQuizzes.data[id].image)})"
//  onclick="carregaQuizz(${listaQuizzes.data[id].id})">
//  <span>${listaQuizzes.data[id].title}</span>
//</div>
//`  

function quizzPulblico(quizz) {
  for (let i = 0; i < quizzesUsuario.ids.length; i++) {
    if (quizzesUsuario.ids[i] === quizz) { return false }
  }
  return true;
}

//popularPaginaInicial();