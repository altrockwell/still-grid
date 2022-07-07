const imageContainer = document.getElementById('photo-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// check to see if scrolling near bottom of page , Load more photos
// const observer = new IntersectionObserver(
// 	(entries) => {
// 		entries.forEach((entry) => {
// 			const image = entry.target;
// 			if (
// 				entry.isIntersecting &&
// 				image.complete &&
// 				image.naturalHeight !== 0
// 			) {
// 				alert('You have reached the bottom');
// 			}
// 		});
// 	},
// 	{
// 		threshold: 0.25,
// 	}
// );

// Unsplash API
let count = 5;
let apiKey = 'Zz4qnWpKFbUpZtl28TE7eFL-shtSs2V3vwr7BFWsXm0';
const redirectURL = 'urn:ietf:wg:oauth:2.0:oob';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded == totalImages) {
		ready = true;
		loader.hidden = true;
		count = 30;
	}
}

function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// map photosArray
	photosArray.forEach((photo) => {
		// create <a> element
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		item.classList.add('photo');

		console.log(photo);

		// create image element

		const img = document.createElement('img');
		setAttributes(img, {
			id: photo.id,
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
		img.addEventListener('load', imageLoaded);

		const caption = document.createElement('div');
		caption.classList.add('caption');
		caption.innerHTML += `Photo by <a href="${photo.user.links.html}?utm_source=still-grid2&utm_medium=referral">${photo.user.first_name} ${photo.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>`;

		// img.classList.add('photo');
		// Put <img> inside <a>
		item.appendChild(img);
		item.appendChild(caption);

		imageContainer.appendChild(item);
	});
	// const lastPhoto = document.getElementById(
	// 	photosArray[photosArray.length - 1].id
	// );
	// observer.observe(lastPhoto);
}

async function getPhotos() {
	try {
		const response = await fetch(apiURL);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		const newApikey = 'VlO2sDcskS9ThUAMxmvRib3R8Li7bGv4fQbZrxOzdkw';
		if (apiKey !== newApikey) {
			apiKey = newApikey;
			getPhotos();
		}
	}
}

window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// onLoad
getPhotos();
