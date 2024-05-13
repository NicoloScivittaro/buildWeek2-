document.addEventListener('DOMContentLoaded', function() {
    
    const getAlbums = function() {
      fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=pop")
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore durante la richiesta.");
          }
        })
        .then(json => {
            console.log(json.data)
          if (json && json.data) {
            generateAlbumsCards(json.data);
          } else {
            console.log("Nessun dato trovato.");
          }
        })
        .catch(err => {
          console.error("ERRORE!", err);
        });
    };
  
    const generateAlbumsCards = function(array) {
      const row = document.getElementById("moreAlbum");
      array.forEach(element => {
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
          <div class="card h-100 d-flex flex-column border-3 bg-dark text-white">
            <img src="${element.album.cover_medium}" class="card-img-top mx-auto" alt="album image" style="width:80px,height:80px">
            <div class="card-body d-flex flex-column justify-content-around">
              <a href="album.html?albumId=${element.album.id}" class="text-decoration-none text-white "><p class="card-title">${element.album.title}</p></a>
              <a href="artist.html?artistId=${element.artist.id}" class="text-decoration-none text-white-50"><p class="card-text ">${element.artist.name}</p></a>
            </div>
          </div>
        `;
        row.appendChild(newCol);
      });
    };
  
    getAlbums();
  });
  