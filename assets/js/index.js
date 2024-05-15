document.addEventListener("DOMContentLoaded", function () {
  const generateAlbumsCards = function (array) {
    const row = document.getElementById("moreAlbum");
    array.forEach((element) => {
      const newCol = document.createElement("div");
      newCol.classList.add("col", "py-3");
      newCol.innerHTML = `
      <div class="card h-100 d-flex flex-column border-3 bg-transparent text-white border-0 p-2">
      <img src="${element.album.cover_medium}" class="card-img-top mx-auto" alt="album image" style="width:80px,height:80px">
      <div class="card-body d-flex flex-column ">
        <a href="album.html?albumId=${element.album.id}" class="text-decoration-none text-white "><p class="card-title mb-0 ">${element.album.title}</p></a>
        <a href="artist.html?artistId=${element.artist.id}" class="text-decoration-none text-white-50"><p class="card-text small ">${element.artist.name}</p></a>
      </div>
    </div>
      `;
      row.appendChild(newCol);
    });
  };

  const albumRandom = function (array) {
    const indexRandom = Math.floor(Math.random() * array.length);
    console.log(indexRandom);
    let imgRandom = document.getElementById("imgMainAlbum");
    var imageUrl = array[indexRandom].album.cover_medium;
    imgRandom.setAttribute("src", imageUrl);
    const randomAlbum = document.getElementById("randomAlbum");
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<p>ALBUM</p>
    <a href="album.html?albumId=${array[indexRandom].album.id}" class="text-decoration-none text-white "><h1>${array[indexRandom].title_short}</h1></a>
    <a href="artist.html?artistId=${array[indexRandom].artist.id}" class="text-decoration-none text-white "><p>${array[indexRandom].artist.name}</p></a>
    <p>Ascolta il nuovo singolo di <span><a href="artist.html?artistId=${array[indexRandom].artist.id}" class="text-decoration-none text-white ">${array[indexRandom].artist.name}</a></span></p>
    `;
    randomAlbum.prepend(newDiv);
  };

  const getAlbums = function () {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=pop")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore durante la richiesta.");
        }
      })
      .then((json) => {
        console.log(json.data);
        if (json && json.data) {
          generateAlbumsCards(json.data);
          albumRandom(json.data);
        } else {
          console.log("Nessun dato trovato.");
        }
      })
      .catch((err) => {
        console.error("ERRORE!", err);
      });
  };

  getAlbums();
  albumRandom();
});

function login() {
  const email = "admin@admin.com";
  const password = 123456;

  let emailForm = document.getElementById("email");
  let passwordForm = document.getElementById("password");

  const buttonIscriviti = document.getElementById("buttonIscriviti");
  const buttonAccedi = document.getElementById("buttonAccedi");
  const buttonLogged = document.getElementById("buttonLogged");

  if (emailForm.value == email && passwordForm.value == password) {
    buttonIscriviti.classList.remove("d-sm-block");
    buttonIscriviti.classList.add("d-none");
    buttonAccedi.classList.add("d-none");
    buttonLogged.classList.remove("d-none");
    buttonLogged.classList.add("d-block");
  } else {
    alert("email o password errati!");
  }
}

const getCurrentHour = function () {
  let now = new Date();
  let hours = now.getHours();
  let h4Saluto = document.getElementById("saluto");
  if (hours > 0 && hours <= 12) {
    h4Saluto.innerText = "Buongiorno";
  } else if (hours > 12 && hours <= 19) {
    h4Saluto.innerText = "Buon pomeriggio";
  } else {
    h4Saluto.innerText = "Buonasera";
  }
};
getCurrentHour();

const generateListChart = function (array) {
  const ul = document.getElementById("random-songs");
  array.forEach((element) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = `
              <div class='d-flex gap-3 rounded-2 p-2' id='artist-list'>
                <div class='rounded-circle overflow-hidden' style='width: 2.5em'> 
                  <img src="${element.artist.picture_small}" class="img-fluid"> 
                </div> 
                <div> 
                  <h6 class='mb-0 text-light '> ${element.artist.name} </h6>
                  <p class='small mt-0'> Artista</p>
                </div> 
              </div>
        `;
    ul.appendChild(newLi);
  });
};

const getChart = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=rap")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore durante la richiesta.");
      }
    })
    .then((json) => {
      console.log(json.data);
      if (json && json.data) {
        generateListChart(json.data);
      } else {
        console.log("Nessun dato trovato.");
      }
    })
    .catch((err) => {
      console.error("ERRORE!", err);
    });
};

getChart();
