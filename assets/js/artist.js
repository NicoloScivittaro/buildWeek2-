document.addEventListener("DOMContentLoaded", async function () {
  const artistId = new URLSearchParams(location.search).get("artistId");
  if (artistId) {
    await fetchAndDisplayArtistData(artistId);
  }
});

// Function to fetch and display artist data
const fetchAndDisplayArtistData = async (artistId) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`);
    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }
    const data = await response.json();

    // Update artist information in the DOM
    document.getElementById("artista").textContent = data.name;
    document.getElementById("artista1").textContent = data.name;
    document.getElementById("nb_fan").textContent = "Ascolti mensili: " + data.nb_fan;

    const artistPictureElement = document.getElementById("picture");
    artistPictureElement.src = data.picture_xl;
    artistPictureElement.alt = "Immagine di " + data.name;

    // Fetch and display top tracks
    const topTracks = await getTopTracks(artistId);
    if (topTracks) {
      generateTracks(topTracks);
    } else {
      console.error("No top tracks found");
    }
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

// Function to get top tracks of the artist
const getTopTracks = async (artistId, limit = 5) => {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }
    const data = await response.json();
    return data.data.map((track) => ({
      rank: track.rank,
      pictureXL: track.album.cover_xl,
      title: track.title,
      duration: track.duration,
      artistName: track.artist.name,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Function to generate and display tracks
const generateTracks = (tracksArray) => {
  const tracksArtist = document.querySelector(".tracksArtist");
  tracksArtist.innerHTML = ""; // Clear existing tracks

  tracksArray.forEach((track, index) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = track.duration % 60;
    const formattedRank = track.rank.toLocaleString();

    const newCol = document.createElement("div");
    newCol.classList.add("col", "divTracks");
    newCol.innerHTML = `
      <div class="row d-flex align-items-center justify-content-between mb-2">
        <div class="col-1 d-lg-block text-center numberTrack cursorPointer text-light text-opacity-75">
          <p>${index + 1}</p>
        </div>
        <div class="col-2 d-flex justify-content-start">
          <img src="${track.pictureXL}" alt="${track.title}" class="img-fluid">
        </div>
        <div class="col-3">
          <div class="row flex-column">
            <div class="col d-flex text-start p-0">
              <p class="titleBold text-light">${track.title}</p>
            </div>  
          </div>
        </div>
        <div class="col-3 d-lg-block text-center text-light text-opacity-75">${formattedRank}</div>
        <div class="col-2 text-end text-light text-opacity-75 mobileChange">${minutes}:${seconds < 10 ? "0" : ""}${seconds}</div>
      </div>
    `;
    tracksArtist.appendChild(newCol);
  });
};

// Event listener for back button
document.querySelectorAll(".buttonIndietro").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

const generateListChart = function (array) {
  const ul = document.getElementById("random-songs");
  ul.innerHTML = ""; // Clear existing list
  array.forEach((element) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = `
    <a href="artist.html?artistId=${element.artist.id}" class='text-decoration-none'>
    <div class='d-flex gap-3 rounded-2 p-2 artist-list'>
      <div class='rounded-circle overflow-hidden' style='width: 2.5em'> 
          <img src="${element.artist.picture_small}" class="img-fluid"> 
        </div> 
        <div> 
          <h6 class='mb-0 text-light '> ${element.artist.name} </h6>
          <p class='small mt-0'> Artista</p>
        </div> 
      </div>
    </a>
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

let currentAudio = null;

const addTrackEventListeners = (tracksArray) => {
  const divTracks = document.querySelectorAll(".divTracks");
  divTracks.forEach((divTrack, index) => {
    divTrack.addEventListener("dblclick", () => {
      const previewUrl = tracksArray[index].preview;
      if (currentAudio && currentAudio.src === previewUrl) {
        if (currentAudio.paused) {
          currentAudio.play();
        } else {
          currentAudio.pause();
        }
      } else {
        if (currentAudio) {
          currentAudio.pause();
        }
        const audio = new Audio(previewUrl);
        audio.play();
        currentAudio = audio;
      }
    });
  });
};
