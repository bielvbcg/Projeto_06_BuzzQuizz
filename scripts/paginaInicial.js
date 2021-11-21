function popularPaginaInicial()
{
  const listaQuizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")

  listaQuizzes.then((listaQuizzes) => 
  {
    const seusQuizzes = document.querySelector(".seus-quizzes")
    const todosOsQuizzes = document.querySelector(".todos-os-quizzes")

    for (let i = 0 ; i < listaQuizzes.data.length ; i++)
    {

      if (quizzPulblico(listaQuizzes.data[i].id)){
        todosOsQuizzes.innerHTML += 
        `
          <div class="quizz" 
            style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${new URL(listaQuizzes.data[i].image)})"
            onclick="carregaQuizz(${listaQuizzes.data[i].id})">
            <span>${listaQuizzes.data[i].title}</span>
          </div>
        `;
      }
      else {
        if (seusQuizzes.innerHTML.contains("Você não criou nenhum <br>quizz ainda")){
          seusQuizzes.innerHTML +=
            `
            <div class="quizz" 
              style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${new URL(listaQuizzes.data[id].image)})"
              onclick="carregaQuizz(${listaQuizzes.data[id].id})">
              <span>${listaQuizzes.data[id].title}</span>
            </div>
            `  
          }
        else {
          seusQuizzes.innerHTML +=
          `
          <div class="quizz" 
            style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${new URL(listaQuizzes.data[id].image)})"
            onclick="carregaQuizz(${listaQuizzes.data[id].id})">
            <span>${listaQuizzes.data[id].title}</span>
          </div>
          `  
        }
      }
    }
  })

  listaQuizzes.catch(() => {alert("deu ruim patrão")})
}

function quizzPulblico(quizz)
{
  for(let i = 0 ; i < quizzesUsuario.ids.length ; i++){
    if (quizzesUsuario.ids[i] === quizz) {return false}
  }
  return true;
}

//popularPaginaInicial();