const songsToAlbums = {
        "Girl With The Tattoo Enter.lewd": "all_i_want_is_you",
        "Lost": "channel_orange",
        "Good News": "circles",
        "LOVE. FEAT. ZACARI.": "damn",
        "See You Again (feat. Kali Uchis)": "flower_boy"
};

const albums = {
        //optional: replace with the id you used in html, then replace the information
        //Copy and paste move if needed
        all_i_want_is_you: {
            title: 'All I Want Is You',
            artist: 'Miguel',
            releaseDate: 'November 30, 2010',
            genre: 'R&B',
            description: 'All I Want Is You is the debut studio album by American singer Miguel.',
            color: 'rgb(176, 37, 40, 0.8)'
        },
        channel_orange: {
            title: 'channel ORANGE',
            artist: 'Frank Ocean',
            releaseDate: 'July 10, 2012',
            genre: 'R&B, neo soul',
            description: 'channel ORANGE is the debut studio album by American R&B singer Frank Ocean.',
            color: 'rgba(243, 117, 33, 0.8)'
        },
        circles: {
            title: 'Circles',
            artist: 'Mac Miller',
            releaseDate: 'January 17, 2020',
            genre: 'Hip hop, soul',
            description: 'Circles is the sixth and final studio album by American rapper and singer Mac Miller.',
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
