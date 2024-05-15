document.addEventListener('DOMContentLoaded', async function() {
  const artistId = new URLSearchParams(location.search).get("artistId");
  if (artistId) {
    await fetchAndDisplayArtistData(artistId);
  }

  // Event listener for window scroll to handle navbar color change and visibility of elements
  window.addEventListener('scroll', handleScroll);
});

// Function to fetch and display artist data
const fetchAndDisplayArtistData = async (artistId) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`);
    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }
    const data = await response.json();

    // Update artist information in the DOM
    document.getElementById('artista').textContent = data.name;
    document.getElementById('artista1').textContent = data.name;
    document.getElementById('nb_fan').textContent = 'Ascolti mensili: ' + data.nb_fan;

    const artistPictureElement = document.getElementById('picture');
    artistPictureElement.src = data.picture_xl;
    artistPictureElement.alt = 'Immagine di ' + data.name;

    // Fetch and display top tracks
    const topTracks = await getTopTracks(artistId);
    if (topTracks) {
      generateTracks(topTracks);
    } else {
      console.error('No top tracks found');
    }
  } catch (error) {
    console.error('Si è verificato un errore:', error);
  }
};

// Function to get top tracks of the artist
const getTopTracks = async (artistId, limit = 5) => {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }
    const data = await response.json();
    return data.data.map(track => ({
      rank: track.rank,
      pictureXL: track.album.cover_xl,
      title: track.title,
      duration: track.duration,
      artistName: track.artist.name
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Function to generate and display tracks
const generateTracks = (tracksArray) => {
  const tracksArtist = document.querySelector(".tracksArtist");
  tracksArtist.innerHTML = ''; // Clear existing tracks

  tracksArray.forEach((track, index) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = track.duration % 60;
    const formattedRank = track.rank.toLocaleString();

    const newCol = document.createElement("div");
    newCol.classList.add("col");
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

// Handle scroll event to change navbar style
const handleScroll = () => {
  const navbar = document.getElementById('navbar');
  const button = document.getElementById('get');
  const artista = document.getElementById('artista1');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > window.innerHeight / 2) {
    button.classList.remove('d-none');
    artista.classList.remove('d-none');
  } else {
    button.classList.add('d-none');
    artista.classList.add('d-none');
  }

  const content = document.getElementById('btn-play');
  const contentRect = content.getBoundingClientRect();
  const scrollMiddle = scrollTop + window.innerHeight / 3;

  if (contentRect.top + contentRect.height / 2 < scrollMiddle) {
    navbar.classList.add('navbar-white');
    navbar.classList.remove('bg-transparent');
  } else {
    navbar.classList.remove('navbar-white');
    navbar.classList.add('bg-transparent');
  }

  applyColorToNavbar();
};

// Apply color from artist image to navbar
const applyColorToNavbar = () => {
  const artistImageBig = document.getElementById('picture');
  const navbar = document.getElementById('navbar');
  const colorThief = new ColorThief();

  artistImageBig.crossOrigin = "Anonymous";

  if (artistImageBig.complete) {
    const color = colorThief.getColor(artistImageBig);
    navbar.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  } else {
    artistImageBig.addEventListener("load", () => {
      const color = colorThief.getColor(artistImageBig);
      navbar.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    });
  }
};

// Event listener for back button
const buttonsIndietro = document.querySelectorAll(".buttonIndietro");
buttonsIndietro.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "index.html";
  });
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