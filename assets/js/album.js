const albumImageBig = document.querySelector(".albumImageBig");
const titleAlbumBig = document.querySelector(".titleAlbumBig");
const artistAlbum = document.querySelector(".artistAlbum");
const releaseAlbum = document.querySelector(".releaseAlbum");
const albumTracks = document.querySelector(".albumTracks");
const albumDuration = document.querySelector(".albumDuration");
const tracksAlbum = document.querySelector(".tracksAlbum");
const artistImageLittle = document.querySelector(".artistImageLittle");

const generateTracks = function (TracksArray) {
  TracksArray.forEach((track, index) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = track.duration % 60;
    const formattedRank = track.rank.toLocaleString();

    const newCol = document.createElement("div");
    newCol.classList.add("col");
    newCol.innerHTML = `
    <div class=" d-flex"> 
      <div class="col-1 text-center numberTrack"><p>${index + 1}</p></div>
      <div class="col-5">
        <div class="row flex-column">
          <div class="col d-flex text-start p-0">
            <p>${track.title}</p>
          </div>
          <div class="col p-0">
            <p class="artistAlbum">${track.artist.name}</p>
          </div>
        </div>
      </div>
      <div class="col-4 text-center">${formattedRank}</div>
      <div class="col-2 text-end">${minutes}:${
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
      albumTracks.innerText = albumArray.nb_tracks;
      albumDuration.innerText = albumArray.duration;
      artistImageLittle.src = albumArray.artist.picture_small;
      generateTracks(albumArray.tracks.data);
    })
    .catch((err) => {
      console.err("ERRORE", err);
    });
};

getAlbumCard();
