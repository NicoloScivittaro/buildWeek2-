fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/412')
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nella richiesta');
    }
    return response.json();
  })
  .then(data => {
    // Accedi ai valori desiderati
    var name = data.name;
    var picture = data.picture;
    var picture_small = data.picture_small;
    var picture_medium = data.picture_medium;
    var picture_big = data.picture_big;
    var picture_xl = data.picture_xl;
    var nb_fan = data.nb_fan;

    // Ora puoi utilizzare questi valori come preferisci
    console.log("Name:", name);
    console.log("Picture:", picture);
    console.log("Picture Small:", picture_small);
    console.log("Picture Medium:", picture_medium);
    console.log("Picture Big:", picture_big);
    console.log("Picture XL:", picture_xl);
    console.log("Number of Fans:", nb_fan);
  })
  .catch(error => {
    // Gestisci gli errori qui
    console.error('Si è verificato un errore:', error);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var artistLinks = document.querySelectorAll('.artist-link');

            fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/412')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Errore nella richiesta');
                    }
                    return response.json();
                })
                .then(data => {
                    // Aggiorna i dati nell'HTML
                    var artistNameElement = document.getElementById('artista');
                    var artistNameElement1 = document.getElementById('artista1');
                    artistNameElement.textContent = data.name;
                    artistNameElement1.textContent = data.name;

                    var nbFanElement = document.getElementById('nb_fan');
                    nbFanElement.textContent = 'Ascolti mensili: ' + data.nb_fan;

                    var artistPictureElement = document.getElementById('picture');
                    artistPictureElement.src = data.picture_xl;
                    artistPictureElement.alt = 'Immagine di ' + data.name;
                })
                .catch(error => {
                    console.error('Si è verificato un errore:', error);
                });
        });

        window.addEventListener('scroll', function() {
            var navbar = document.getElementById('navbar');
            var button = document.getElementById('get');
            var artista = document.getElementById('artista1');
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > window.innerHeight / 2) {
                button.classList.remove('d-none');
                artista.classList.remove('d-none');
            } else {
                button.classList.add('d-none');
                artista.classList.add('d-none');
            }
        });
  
            // Aggiungi il codice per l'analisi del colore qui
            window.addEventListener('scroll', function() {
                var navbar = document.getElementById('navbar');
                var content = document.getElementById('btn-play');
                var contentRect = content.getBoundingClientRect();
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var scrollMiddle = scrollTop + window.innerHeight / 3;
                
                // Se il punto medio del contenuto è sopra il punto medio dello schermo
                if (contentRect.top + contentRect.height / 2 < scrollMiddle) {
                    navbar.classList.add('navbar-white');
                    navbar.classList.remove('bg-transparent');
                } else {
                    navbar.classList.remove('navbar-white');
                    navbar.classList.add('bg-transparent');
                }
            
                // Aggiungi il codice per ottenere il colore dell'immagine dell'artista qui
                const artistImageBig = document.getElementById('picture');
                const colorThief = new ColorThief();
                artistImageBig.crossOrigin = "Anonymous";
            
                if (artistImageBig.complete) {
                    const color = colorThief.getColor(artistImageBig);
                    // Utilizza il colore ottenuto per impostare il colore della navbar
                    navbar.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                } else {
                    artistImageBig.addEventListener("load", function () {
                        const color = colorThief.getColor(artistImageBig);
                        // Utilizza il colore ottenuto per impostare il colore della navbar
                        navbar.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    });
                }
            });
            const artistId = 412;

            async function getTopTracks(artistId, limit = 5) {
                const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=${limit}`;
                
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    return data.data.map(track => ({
                        rank: track.rank,
                        pictureXL: track.album.cover_xl,
                        name: track.title,
                        duration: track.duration
                    }));
                } catch (error) {
                    console.error('Error fetching data:', error);
                    return null;
                }
            }
            
            async function populateTracks(artistId, limit = 5) {
                const topTracks = await getTopTracks(artistId, limit);
                
                if (!topTracks) {
                    console.error('Failed to fetch top tracks');
                    return;
                }
            
                for (let i = 0; i < topTracks.length; i++) {
                    const track = topTracks[i];
                    const index = i + 1;
            
                    document.getElementById(`picture${index}`).innerHTML = `<img src="${track.pictureXL}" alt="Immagine canzone">`;
                    document.getElementById(`title${index}`).textContent = track.name;
                    // Assuming "view" represents number of views
                    document.getElementById(`view${index}`).textContent = track.rank;
                    // Assuming "time" represents duration
                    const minutes = Math.floor(track.duration / 60);
                    const seconds = track.duration % 60;
                    document.getElementById(`time${index}`).textContent = `${minutes}:${seconds}`;
                }
            }
            
            // Usage example
            const limit = 5; // Numero massimo di brani da ottenere
            
            populateTracks(artistId, limit)
                .catch(error => {
                    console.error('Error:', error);
                });