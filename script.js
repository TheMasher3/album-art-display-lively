const songsToAlbums = {
        "She Will Be Loved": "songs_about_jane",
        "Jet Fuel": "swimming",
        "I Ain't Mad At Cha (ft. Danny Boy)": "all_eyez_on_me",
        "LOVE. FEAT. ZACARI.": "damn",
        "See You Again (feat. Kali Uchis)": "flower_boy"
};

const albums = {
        //optional: replace with the id you used in html, then replace the information
        //Copy and paste move if needed
        songs_about_jane: {
            title: 'Songs About Jane',
            artist: 'Maroon 5',
            releaseDate: 'June 25, 2002',
            genre: 'Pop rock, funk rock',
            description: 'Songs About Jane is the debut studio album by American pop rock band Maroon 5.'
        },
        all_eyez_on_me: {
            title: 'All Eyez on Me',
            artist: '2Pac',
            releaseDate: 'February 13, 1996',
            genre: 'Hip hop',
            description: 'All Eyez on Me is the fourth studio album by American rapper 2Pac.'
        },
        swimming: {
            title: 'Swimming',
            artist: 'Mac Miller',
            releaseDate: 'August 3, 2018',
            genre: 'Hip hop, jazz rap',
            description: 'Swimming is the fifth studio album by American rapper and singer Mac Miller.',
            color: 'rgba(255, 255, 255, 0.8)'
        },
        damn: {
            title: 'DAMN.',
            artist: 'Kendrick Lamar',
            releaseDate: 'April 14, 2017',
            genre: 'Hip hop',
            description: 'DAMN. is the fourth studio album by American rapper Kendrick Lamar.',
            color: 'rgb(217, 28, 30, 0.8)'
        },
        flower_boy: {
            title: 'Flower Boy',
            artist: 'Tyler, the Creator',
            releaseDate: 'July 21, 2017',
            genre: 'Hip hop, neo soul',
            description: 'Flower Boy is the fourth studio album by American rapper Tyler, the Creator.',
            color: 'rgba(252, 175, 38, 0.8)'
        }
    };
document.addEventListener('DOMContentLoaded', function() {


    Object.keys(albums).forEach(id => {
        document.getElementById(id)?.addEventListener('click', function(event) {
            displayAlbumInfo(albums[id], event);
        });
    });

    function displayAlbumInfo(album, event) {
        const albumInfoDiv = document.getElementById('album-info');
        albumInfoDiv.innerHTML = `
            <button class="close-btn" onclick="closePopup()">×</button>
            <h2>${album.title}</h2>
            <p><strong>Artist:</strong> ${album.artist}</p>
            <p><strong>Release Date:</strong> ${album.releaseDate}</p>
            <p><strong>Genre:</strong> ${album.genre}</p>
            <p>${album.description}</p>
        `;

        // Position the pop-up
        const imgElement = event.target;
        const imgRect = imgElement.getBoundingClientRect();
        const infoDivRect = albumInfoDiv.getBoundingClientRect();

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = imgRect.right + 10; // Default position to the right of the image
        let top = imgRect.top;

        if (left + infoDivRect.width > viewportWidth) {
            left = imgRect.left - infoDivRect.width - 10; // Position to the left if it overflows
        }

        if (top + infoDivRect.height > viewportHeight) {
            top = viewportHeight - infoDivRect.height - 10; // Adjust to prevent bottom overflow
        }

        albumInfoDiv.style.left = `${left}px`;
        albumInfoDiv.style.top = `${top}px`;

        albumInfoDiv.style.display = 'block';
        albumInfoDiv.style.opacity = 1;
    }

    document.getElementById('theme-toggle').addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
});

function closePopup() {
    const albumInfoDiv = document.getElementById('album-info');
    albumInfoDiv.style.display = 'none'; // Hide the pop-up
}

function livelyCurrentTrack(data) {
    let obj = JSON.parse(data);
    if (obj != null) {
        const songTitle = obj.Title;
        const albumIds = songsToAlbums[songTitle];

        // Remove glow from all albums
        document.querySelectorAll('.glow').forEach(element => {
            element.classList.remove('glow');
            element.style.boxShadow = '';
        });

        if (albumIds) {
            // If albumIds is a string, convert it to an array for uniform processing
            const albumIdArray = Array.isArray(albumIds) ? albumIds : [albumIds];

            // Add glow to the current albums
            albumIdArray.forEach(albumId => {
                const albumElement = document.getElementById(albumId);
                if (albumElement) {
                    const albumColor = albums[albumId].color;
                    albumElement.classList.add('glow');
                    albumElement.style.boxShadow = `0 0 20px 5px ${albumColor}`;
                }
            });
        }
    }
}
