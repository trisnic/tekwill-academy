import { API_KEY } from "../../env.js";

const url = 'https://realty-in-us.p.rapidapi.com/properties/v3/list';
const options = {
    method: 'POST',
    headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '6a6ccac16dmsh4ba81cd3c74717bp132a15jsn92fc3e3cada7',
		'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
	},
    body: JSON.stringify({
        limit: 200,
        offset: 0,
        postal_code: '90004',
        status: [
            'for_sale',
            'ready_to_build'
        ],
        sort: {
            direction: 'desc',
            field: 'list_date'
        }
    })
};

let properties = [];

const fetchData = () => {
    // post - trimiti parametri si ca raspuns vin datele sortate dupa parametri
    // post - trimita datele si sa nu dea nimic inapoi (200 - Success);

const loadingSpinner = document.getElementById('loading-spinner');
loadingSpinner.style.display = 'block';

const searchContainer = document.getElementById('search-container');

if (loadingSpinner.style.display === 'block') {
    searchContainer.style.display = 'none';
} 

    const propertyList = document.getElementById('property-list');
    propertyList.innerHTML = '';

  fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const propertiesData = data.data.home_search.results;
    properties = propertiesData;
    displayProperties();
    loadingSpinner.style.display = 'none';

    if (loadingSpinner.style.display === 'none') {
        searchContainer.style.display = 'flex';
    } 

  })
  .catch(error => console.log(error));
}

let favoriteProperties = [];


const createPropertyCard = (property) => {
    const card = document.createElement('div');
    card.className = 'property-card';

    const image = document.createElement('img');
    image.src = property.primary_photo.href;
    card.appendChild(image);

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = `$${property.list_price}`;
    card.appendChild(price);

    const description = document.createElement('div');
    description.textContent = `${property.description.beds} bed | ${property.description.baths} bath | ${property.description.sqft} sqft | ${property.description.lot_sqft} acre lot`;
    card.appendChild(description);
    
    const address = document.createElement('div');
    address.textContent = `${property.location.address.line} ${property.location.address.state}, ${property.location.address.state_code} ${property.location.address.postal_code}`
    card.appendChild(address);

    const favoriteIcon = document.createElement('div');
    favoriteIcon.className = 'favorite-icon';
    if (favoriteProperties.includes(property.listing_id)) {
        favoriteIcon.classList.add('colored');
    }

    favoriteIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(property.listing_id, favoriteIcon);
    });

    card.appendChild(favoriteIcon);

    return card;
}

const displayProperties = () => {
    const propertyList = document.getElementById('property-list');

    properties.forEach(property => {
        const card = createPropertyCard(property);
        // card.addEventListener('click', () => openModal(property));
        propertyList.appendChild(card);
    })
}

fetchData();

const toggleFavorite = (id, favoriteIcon) => {
    const index = favoriteProperties.indexOf(id);
    if (index === -1) {
        favoriteProperties.push(id);
        favoriteIcon.classList.add('colored');
    } else {
        favoriteProperties.splice(index, 1);
        favoriteIcon.classList.remove('colored');
    }
}

const displayFavoriteProperties = () => {
    const favoritePropertiesContainer = document.getElementById('favorite-container');
    favoritePropertiesContainer.innerHTML = '';

    console.log('element', favoritePropertiesContainer)
    console.log('favorite', favoriteProperties)
    properties.forEach(property => {
        if (favoriteProperties.includes(property.listing_id)){
            const card = createPropertyCard(property);
            favoritePropertiesContainer.appendChild(card);
        }
    })
}

window.displayFavoriteProperties = displayFavoriteProperties;

const openModal = (property) => {
    const modal = document.getElementById('modal');
    const modalProperty = document.getElementById('modal-property');

    modalProperty.innerHTML = `
    <img src="${property.primary_photo.href}" />
    <h2> ${property.location.address.line} ${property.location.address.state}, ${property.location.address.state_code} ${property.location.address.postal_code}</h2>
    `

    modal.style.display = 'block';
}

const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.closeModal = closeModal;

const searchProperties = () => {
    const postalCodeInput = document.getElementById('postal-code-input');
    const requestBody = JSON.parse(options.body);
    requestBody.postal_code = postalCodeInput.value;
    options.body = JSON.stringify(requestBody);
console.log(options.body);
    fetchData();
}
window.searchProperties = searchProperties;
