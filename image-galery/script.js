let url;
const imgWrapper = document.querySelector('.img_wrapper');
const findInput = document.querySelector('.find');
const deleteBtn = document.querySelector('.delete_btn');
const findBtn = document.querySelector('.find_btn');
const findForm = document.querySelector('.find_input');

let submitText;
let downloadBtn;

window.addEventListener("load", () => {
    url = `https://api.unsplash.com/search/photos?query=nature&per_page=30&page=${getRandomNumber(1, 150)}&client_id=QeEezdXf5jbb0onIJwCZLOykIigLacF63HjPlPEWdmw`;
});

async function getData() {
    if(findInput.value !== '') {
        url = `https://api.unsplash.com/search/photos?query=${submitText}&per_page=30&page=${getRandomNumber(151, 334)}&client_id=QeEezdXf5jbb0onIJwCZLOykIigLacF63HjPlPEWdmw`;
    } else {
        url = `https://api.unsplash.com/search/photos?query=nature&per_page=30&page=${getRandomNumber(151, 334)}&client_id=QeEezdXf5jbb0onIJwCZLOykIigLacF63HjPlPEWdmw`;
    }
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
};

async function showData(data) {
    for (let i = 0; i < 6; i++) {
        if (!data.results[i]?.urls?.regular) {
            const div = document.createElement('div');
            div.classList.add('error');
            imgWrapper.appendChild(div);
            div.textContent = "No images found. Try another word";
        } else {
            const div = document.createElement('div');
            div.classList.add('img_content');
            imgWrapper.appendChild(div);

            const img = document.createElement('img');
            img.classList.add('img_unsplash');
            img.src = data.results[i].urls.regular;
            img.alt = "image";
            div.appendChild(img);

            downloadBtn = document.createElement('button');
            downloadBtn.classList.add('download');
            div.appendChild(downloadBtn);

            const link = document.createElement('a');
            link.classList.add('download_link');
            link.target = "_blank";
            link.download = `${data.results[i].id}`;
            downloadBtn.appendChild(link);

            link.href = await downloadImg(data.results[i].links.download_location);
        }
    }
}

getData();

function getRandomNumber(min, max) {
    let minNum = Math.ceil(min);
    let maxNum = Math.floor(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

/*FIND BUTTON*/

function changeFindInputBtn() {
    findInput.addEventListener('input', () => {
        if (findInput.value !== "") {
            deleteBtn.classList.add('visible');
            deleteBtn.classList.remove('hidden');
        } else {
            deleteBtn.classList.remove('visible');
            deleteBtn.classList.add('hidden');
        }
    })
}

changeFindInputBtn();

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    findInput.value = "";
    deleteBtn.classList.remove('visible');
    deleteBtn.classList.add('hidden');
});

/*SUBMIT FORM*/

findForm.addEventListener('submit', submit);

findInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        e.preventDefault();
        submit(e);
    }
});

function submit(e) {
    e.preventDefault();
    submitText = findInput.value;
    imgWrapper.innerHTML = '';
    getData();
}

/*DOWNLOAD*/

async function downloadImg(link) {
    const imgUrl = `${link}&client_id=QeEezdXf5jbb0onIJwCZLOykIigLacF63HjPlPEWdmw`;
    const response = await fetch(imgUrl);
    const jsonData = await response.json();
    const imgResult = await fetch(jsonData.url);
    const blob = await imgResult.blob();
    return window.URL.createObjectURL(blob);
}