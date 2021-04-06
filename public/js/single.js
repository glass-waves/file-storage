const singleImage = document.getElementById('single-image');

const searchParams = new URLSearchParams(window.location.search);
const photoId = searchParams.get('id');

fetch(`/api/v1/upload/files/${photoId}`)
    .then(data => data.json())
    .then(photo => singleImage.src = photo.url)


