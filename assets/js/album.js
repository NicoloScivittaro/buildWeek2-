const albumImageBig = document.querySelector(".albumImageBig");
const titleAlbumBig = document.querySelector(".titleAlbumBig");
const artistAlbum = document.querySelector(".artistAlbum");
const releaseAlbum = document.querySelector(".releaseAlbum");
const albumTracks = document.querySelector(".albumTracks");
const albumDuration = document.querySelector(".albumDuration");
const tracksAlbum = document.querySelector(".tracksAlbum");
const artistImageLittle = document.querySelector(".artistImageLittle");
const mainColumnAlbum = document.getElementById("mainColumnAlbum");

const generateTracks = function (TracksArray) {
  TracksArray.forEach((track, index) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = track.duration % 60;
    const formattedRank = track.rank.toLocaleString();

    const newCol = document.createElement("div");
    newCol.classList.add("col");
    newCol.innerHTML = `
    <div class=" d-flex  align-items-center mb-2"> 
      <div class="col-1 text-center numberTrack"><p>${index + 1}</p></div>
      <div class="col-5">
        <div class="row flex-column">
          <div class="col d-flex text-start p-0">
            <p class="titleBold">${track.title}</p>
          </div>
          <div class="col p-0">
            <p class="artistAlbum text-light text-opacity-50 authorDescription
            ">${track.artist.name}</p>
          </div>
        </div>
      </div>
      <div class="col-4 text-center text-light text-opacity-75">${formattedRank}</div>
      <div class="col-2 text-end text-light text-opacity-75">${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}</div> 
      </div>
    `;
    tracksAlbum.appendChild(newCol);
  });
};

const getAlbumCard = function () {
  const addressBarContent = new URLSearchParams(location.search);
  const albumId = addressBarContent.get("albumId");

  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento");
      }
    })
    .then((albumArray) => {
      albumImageBig.src = albumArray.cover_big;
      titleAlbumBig.innerText = albumArray.title;
      artistAlbum.innerText = albumArray.artist.name;
      releaseAlbum.innerText = albumArray.release_date;
      const durataTotaleAlbumSec = albumArray.duration;
      const durataTotaleAlbumMin = Math.floor(durataTotaleAlbumSec / 60);
      const durataTotaleAlbumSecRimasti = durataTotaleAlbumSec % 60;
      const durataTotaleAlbumStringa = `${durataTotaleAlbumMin} min ${durataTotaleAlbumSecRimasti} sec`;
      albumTracks.innerText = `${albumArray.nb_tracks} brani,  ${durataTotaleAlbumStringa}`;
      artistImageLittle.src = albumArray.artist.picture_small;
      const colorThief = new ColorThief();
      albumImageBig.crossOrigin = "Anonymous";

      if (albumImageBig.complete) {
        const color = colorThief.getColor(albumImageBig);
        mainColumnAlbum.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      } else {
        albumImageBig.addEventListener("load", function () {
          const color = colorThief.getColor(albumImageBig);
          mainColumnAlbum.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        });
      }

      generateTracks(albumArray.tracks.data);
    })
    .catch((err) => {
      console.error("ERRORE", err);
    });
};

getAlbumCard();
