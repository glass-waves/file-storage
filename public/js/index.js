import fetchFiles from "./fetch-files.js";


const uploadButton = document.getElementById('upload-button');
const fileInput = document.getElementById('file-input');
const nameInput = document.getElementById('file-name');


uploadButton.addEventListener('click', () => {
    const fd = new FormData();
    
    fd.append( 'name', nameInput.value );
    fd.append('image', fileInput.files[0]);
    
    fetch('/api/v1/upload/file', {
        method: 'POST',
        body: fd,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        fetchFiles();
    });
});

fetchFiles();

