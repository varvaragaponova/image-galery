let url;
const imgWrapper = document.querySelector('.img_wrapper');

window.addEventListener("load", () => {
    url = `https://api.unsplash.com/search/photos?query=nature&per_page=30&page=${getRandomNumber(1, 150)}&client_id=QeEezdXf5jbb0onIJwCZLOykIigLacF63HjPlPEWdmw`;
});

async function getData() {
    url = `https://api.unsplash.com/search/photos?query=nature&per_page=30&page=${getRandomNumber(151, 334)}&client_id=QeEezdXf5jbb0onIJwCZLOykIigLacF63HjPlPEWdmw`;
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
};

function showData(data) {
    for (let i = 0; i < 12; i++) {
        const div = document.createElement('div');
        div.classList.add('img_content');
        imgWrapper.appendChild(div);

        const img = document.createElement('img');
        img.classList.add('img_unsplash');
        img.src = data.results[i].urls.regular;
        div.appendChild(img);
    }
}

getData();

function getRandomNumber(min, max) {
    let minNum = Math.ceil(min);
    let maxNum = Math.floor(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

/*FIND*/

const findInput = document.querySelector('.find');
const deleteBtn = document.querySelector('.delete_btn');
const findBtn = document.querySelector('.find_btn');

function changeFindInputBtn() {
    findInput.addEventListener('input', () => {
        if (findInput.value !== "") {
            findBtn.classList.remove('visible');
            findBtn.classList.add('hidden');
            deleteBtn.classList.add('visible');
            deleteBtn.classList.remove('hidden');
        } else {
            findBtn.classList.add('visible');
            findBtn.classList.remove('hidden');
            deleteBtn.classList.remove('visible');
            deleteBtn.classList.add('hidden');
        }
    })
}

changeFindInputBtn();

deleteBtn.addEventListener('click', () => {
    findInput.value = "";
    findBtn.classList.add('visible');
    findBtn.classList.remove('hidden');
    deleteBtn.classList.remove('visible');
    deleteBtn.classList.add('hidden');
});