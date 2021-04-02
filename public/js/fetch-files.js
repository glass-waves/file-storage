const filesDiv = document.getElementById('file-div');

const classSelect = (e) => {
    const files = document.querySelectorAll('.file-image');
    const filesArr = Array.from(files);
    filesArr.forEach(node => {
        node.classList.remove('selected-file')
    })
    e.target.classList.add('selected-file');
}

const fetchFiles = () => {
    filesDiv.textContent = '';
    fetch('/api/v1/upload/files')
        .then(data => data.json())
        .then(res => res.forEach(item => {
            const imageDiv = document.createElement('div');
            const image = document.createElement('img');
            image.classList.add('file-image')
            imageDiv.classList.add('image-div')
            image.src = item.url;
            image.addEventListener('click', classSelect);
            imageDiv.appendChild(image);
            filesDiv.appendChild(imageDiv);
        }))               
}

export default fetchFiles;