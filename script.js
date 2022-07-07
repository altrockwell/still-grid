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
const count = 10;
const apiKey = 'Zz4qnWpKFbUpZtl28TE7eFL-shtSs2V3vwr7BFWsXm0';
const redirectURL = 'urn:ietf:wg:oauth:2.0:oob';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function imageLoaded() {
	imagesLoaded++;
	console.log(imagesLoaded);
	if (imagesLoaded == totalImages) {
		ready = true;
		loader.hidden = true;
		console.log('ready= ', ready);
	}
}

function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	console.log('total images: ', totalImages);
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
		// console.log(photo.id);

		img.classList.add('photo');
		// Put <img> inside <a>
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
	// console.log(photosArray[photosArray.length - 1].id);
	// const lastPhoto = document.getElementById(
	// 	photosArray[photosArray.length - 1].id
	// );
	// observer.observe(lastPhoto);
}

async function getPhotos() {
	try {
		const response = await fetch(apiURL);
		// console.log(response);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log(error);
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
