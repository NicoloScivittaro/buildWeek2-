document.addEventListener("DOMContentLoaded", function () {
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
        } else {
          console.log("Nessun dato trovato.");
        }
      })
      .catch((err) => {
        console.error("ERRORE!", err);
      });
  };

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

  getAlbums();
});

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
