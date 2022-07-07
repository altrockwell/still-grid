const imageContainer = document.getElementById('photo-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'VlO2sDcskS9ThUAMxmvRib3R8Li7bGv4fQbZrxOzdkw';
const redirectURL = 'urn:ietf:wg:oauth:2.0:oob';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function displayPhotos() {
	// map photosArray
	photosArray.forEach((photo) => {
		// create <a> element
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		// create image element
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt:
				photo.alt_description ||
				photo.description ||
				'random unsplash image',
			title:
				photo.alt_description ||
				photo.description ||
				'no description available',
		});

		img.classList.add('photo');
		// Put <img> inside <a>
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

async function getPhotos() {
	try {
		const response = await fetch(apiURL);
		// console.log(response);
		photosArray = await response.json();
		if (photosArray.lenght > 0) {
		}

		displayPhotos();
	} catch (error) {
		console.log(error);
	}
}

// onLoad
getPhotos();
