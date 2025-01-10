// script.js

// --------------------tab ---------------------------


document.addEventListener("DOMContentLoaded", () => {

    const options = document.querySelectorAll('.sidebar-options .option');
    const tabs = document.querySelectorAll('.main .tab-content');

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            tabs.forEach(tab => tab.classList.remove('active'));
            const tabId = option.getAttribute('data-tab');
            const tabToShow = document.getElementById(tabId);
            if (tabToShow) {
                tabToShow.classList.add('active');
            }
        });
    });

// ------------------Menu-icon-----------------------------------------------------------

const menuIcon = document.querySelector('.menu i');
const sidebar = document.querySelector('.sidebar');

    menuIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

});


// ------------------------------card-------------------------------------------


function createCards(data) {
    const container = document.getElementById('cards-container');
    data.Websites.forEach(item => {
        const card = document.createElement('a');
        card.href = item.link;
        card.classList.add('card');
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.classList.add('poster');
        
        card.appendChild(img);
        container.appendChild(card);
    });
}

fetch('dataset.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dataset loaded:', data);
        createCards(data); 
    })
    .catch(error => {
        console.error('Error loading dataset:', error);
    });

// --------------------------------------------------------------

