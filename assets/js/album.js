const albumImageBig = document.querySelector(".albumImageBig");
const titleAlbumBig = document.querySelector(".titleAlbumBig");
const artistAlbum = document.querySelector(".artistAlbum");
const releaseAlbum = document.querySelector(".releaseAlbum");
const albumTracks = document.querySelector(".albumTracks");
const albumDuration = document.querySelector(".albumDuration");
const tracksAlbum = document.querySelector(".tracksAlbum");
const artistImageLittle = document.querySelector(".artistImageLittle");
const mainColumnAlbum = document.getElementById("mainColumnAlbum");
const buttonPlay = document.getElementById("buttonPlay");
const albumHero = document.querySelector(".albumHero");
const navbarAlbum = document.getElementById("navbarAlbum");

const generateTracks = function (TracksArray) {
  TracksArray.forEach((track, index) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = track.duration % 60;
    const formattedRank = track.rank.toLocaleString();

    const newCol = document.createElement("div");
    newCol.classList.add("col");
    newCol.innerHTML = `
    <div class=" d-flex  align-items-center justify-content-between mb-2"> 
      <div class="col-1 d-none d-lg-block text-center numberTrack cursorPointer text-light text-opacity-75"><p>${
        index + 1
      }</p></div>
      <div class="col-5">
        <div class="row flex-column ">
          <div class="col d-flex text-start p-0">
            <p class="titleBold text-light">${track.title}</p>
          </div>
          <div class="col p-0">
            <p class="artistAlbum text-light text-opacity-75 authorDescription
            ">${track.artist.name}</p>
          </div>
        </div>
      </div>
      <div class="col-4 d-none d-lg-block text-center text-light text-opacity-75">${formattedRank}</div>
      <div class="col-2  text-end text-light text-opacity-75 mobileChange">${minutes}:${
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
      const windowWidth = window.innerWidth;
      if (albumImageBig.complete) {
        const color = colorThief.getColor(albumImageBig);
        applyGradient(color, windowWidth);
        applyTextColor(color);
        applyNavbarColor(color);
      } else {
        albumImageBig.addEventListener("load", function () {
          const color = colorThief.getColor(albumImageBig);
          applyGradient(color, windowWidth);
          applyTextColor(color);
          applyNavbarColor(color);
        });
      }

      generateTracks(albumArray.tracks.data);
      numberTransform();
    })
    .catch((err) => {
      console.error("ERRORE", err);
    });
};

getAlbumCard();

function applyGradient(color, windowWidth) {
  const gradientColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  let gradient;

  if (windowWidth < 576) {
    gradient = `linear-gradient(to bottom, ${gradientColor} 525px, black 600px)`;
  } else if (windowWidth >= 576 && windowWidth < 768) {
    gradient = `linear-gradient(to bottom, ${gradientColor} 680px, black 740px)`;
  } else if (windowWidth >= 768 && windowWidth < 992) {
    gradient = `linear-gradient(to bottom, ${gradientColor} 190px, black 300px)`;
  } else if (windowWidth >= 992 && windowWidth < 1200) {
    gradient = `linear-gradient(to bottom, ${gradientColor} 285px, black 380px)`;
  } else if (windowWidth >= 1200 && windowWidth < 1400) {
    gradient = `linear-gradient(to bottom, ${gradientColor} 380px, black 420px)`;
  } else {
    gradient = `linear-gradient(to bottom, ${gradientColor} 380px, black 460px)`;
  }

  mainColumnAlbum.style.background = gradient;
}

function applyTextColor(color) {
  const backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  const textColor =
    chroma.contrast(backgroundColor, "black") >
    chroma.contrast(backgroundColor, "white")
      ? "black"
      : "white";
  titleAlbumBig.style.color = textColor;
  artistAlbum.style.color = textColor;
  releaseAlbum.style.color = textColor;
  albumTracks.style.color = textColor;
  albumDuration.style.color = textColor;
  albumHero.style.color = textColor;
}

function applyNavbarColor(color) {
  const backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  const textColor =
    chroma.contrast(backgroundColor, "black") >
    chroma.contrast(backgroundColor, "white")
      ? "black"
      : "white";
  navbarAlbum.style.backgroundColor = backgroundColor;
  navbarAlbum.style.color = textColor;
}

const numberTransform = function () {
  const numberTracks = document.querySelectorAll(".numberTrack");

  numberTracks.forEach((track, index) => {
    track.addEventListener("mouseover", () => {
      track.innerHTML = '<i class="bi bi-play-fill"></i>';
    });

    track.addEventListener("mouseout", () => {
      track.innerHTML = `<p>${index + 1}</p>`;
    });
  });
};

const icons = document.querySelectorAll(".iconTop");

icons.forEach((icon) => {
  icon.addEventListener("mouseover", () => {
    icon.style.opacity = "1";
  });

  icon.addEventListener("mouseout", () => {
    icon.style.opacity = "0.5";
  });
});

const buttonsIndietro = document.querySelectorAll(".buttonIndietro");
buttonsIndietro.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
