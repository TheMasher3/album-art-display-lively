document.addEventListener('DOMContentLoaded', function() {
    const albums = {
        //optional: replace with the id you used in html, then replace the information
        //Copy and paste move if needed
        flower_boy: {
            title: 'Flower Boy',
            artist: 'Tyler, the Creator',
            releaseDate: 'July 21, 2017',
            genre: 'Hip hop, neo soul',
            description: 'Flower Boy is the fourth studio album by American rapper Tyler, the Creator.'
        },
        hollywoods_bleeding: {
            title: 'Hollywood\'s Bleeding',
            artist: 'Post Malone',
            releaseDate: 'September 6, 2019',
            genre: 'Hip hop, pop, trap',
            description: 'Hollywood\'s Bleeding is the third studio album by American rapper Post Malone.'
        },
        swimming: {
            title: 'Swimming',
            artist: 'Mac Miller',
            releaseDate: 'August 3, 2018',
            genre: 'Hip hop, jazz rap',
            description: 'Swimming is the fifth studio album by American rapper and singer Mac Miller.'
        },
        all_eyez_on_me: {
            title: 'All Eyez on Me',
            artist: '2Pac',
            releaseDate: 'February 13, 1996',
            genre: 'Hip hop',
            description: 'All Eyez on Me is the fourth studio album by American rapper 2Pac.'
        },
        miss_education: {
            title: 'The Miseducation of Lauryn Hill',
            artist: 'Lauryn Hill',
            releaseDate: 'August 25, 1998',
            genre: 'R&B, hip hop, soul',
            description: 'The Miseducation of Lauryn Hill is the debut solo album by American singer and rapper Lauryn Hill.'
        },
        songs_about_jane: {
            title: 'Songs About Jane',
            artist: 'Maroon 5',
            releaseDate: 'June 25, 2002',
            genre: 'Pop rock, funk rock',
            description: 'Songs About Jane is the debut studio album by American pop rock band Maroon 5.'
        }
    };

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
        albumInfoDiv.style.display = 'block';  // Make the pop-up visible
        const imgElement = event.target;
        const imgRect = imgElement.getBoundingClientRect();
        const popUpWidth = albumInfoDiv.offsetWidth;
        const popUpHeight = albumInfoDiv.offsetHeight;

        let top = imgRect.top + window.scrollY;
        let left = imgRect.right + 10;

        // Adjust if pop-up would go outside the right edge of the screen
        if (left + popUpWidth > window.innerWidth) {
            left = imgRect.left - popUpWidth - 10;
        }

        // Adjust if pop-up would go outside the bottom edge of the screen
        if (top + popUpHeight > window.innerHeight + window.scrollY) {
            top = window.innerHeight + window.scrollY - popUpHeight - 10;
        }

        // Make sure it doesn't go outside the left edge
        if (left < 0) {
            left = 10; // Add some padding
        }

        // Make sure it doesn't go outside the top edge
        if (top < window.scrollY) {
            top = window.scrollY + 10; // Add some padding
        }

        albumInfoDiv.style.top = `${top}px`;
        albumInfoDiv.style.left = `${left}px`;
        albumInfoDiv.style.opacity = 1;
    }

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', themeToggle.checked);
    });
});

function closePopup() {
    const albumInfoDiv = document.getElementById('album-info');
    albumInfoDiv.style.display = 'none'; // Hide the pop-up
}
