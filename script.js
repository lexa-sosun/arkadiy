import information from './data.json' with { type: 'json' };
import person from './person.json' with { type: 'json' };
import html2canvas from 'html2canvas';

const globalLength = Object.keys(information).length;

const urlParams = new URLSearchParams(window.location.search);

function deleteNullParam() {
    let url = new URL(window.location.href)
    url.searchParams.delete('search');
    window.history.pushState({}, '', url);
}

function search() {
    let currentTheme = document.body.classList[0];
    if (currentTheme === 'dark-theme') {
        currentTheme = 'dark';
    } else {
        currentTheme = 'light';
    }
    const inputField = document.getElementById("inputSearch");
    const searchValue = inputField.value.toLowerCase().trim().replace(/ё/g, "е");
    let results = [], searchedFiles = [];

    const currentUrl = window.location.href;
    let url = new URL(currentUrl)
    url.searchParams.set('search', inputField.value);
    window.history.pushState({}, '', url);

    let unique = 0;


    function createFiles(obj) {
        if ((!(searchedFiles.includes(obj))) || (!searchValue)) {
            let image_block = ``;
            let video_block = ``;
            if ('picture' in obj) {
                for (let i in obj.picture) {
                    image_block = image_block + `<img src="${obj.picture[i]}" alt="" class="infImage">`
                }
            }
            if ('video' in obj) {
                for (let i in obj.video) {
                    video_block = video_block + `<div class="video-container">
                        <img id="videoPreview${unique}" src="interface/video_wait.jpg" alt="">
                        <video width="600" controls class="infVideo" id="video${unique}"><source src="${obj.video[i]}" type="video/mp4" />error</video>
                        </div>`
                    unique++
                }
            }
            results.push(`<div class='block animated'><div class="topMenuCon"><span class="downloadBtn"><img class="downloadImg" src="icons/download_${currentTheme}.png" alt="download"></span></div>
                                <h1 class="title">${obj.title}</h1><p class="desc">${obj.desc}</p>
                                <div class="videoBlock">${video_block}</div>
                                <div class="imageBlock">${image_block}</div>
                            </div>`);
            searchedFiles.push(obj)
        }
    }

    for (let key in information) {
        let obj = information[key];
        if (searchValue) {
            const hasTitle = obj.title?.toLowerCase().includes(searchValue);
            const hasTag = obj.tags?.flat().includes(searchValue);
            const hasPerson = obj.persons?.some(p => person[p]?.flat().includes(searchValue));
            if (hasTitle || hasTag || hasPerson) {
                createFiles(obj);
            }
        } else {
            createFiles(obj)
        }
    }

    const searchContent = document.getElementById("searchContent");
    const counter = document.getElementById("count");
    results.reverse();

    if (results.length === globalLength) {
        counter.innerHTML = `<p>Все файлы (${globalLength})</p>`;
        searchContent.innerHTML = results.join("");
    }
    else if (results.length > 0) {
        counter.innerHTML = `<p>Найдено результатов: ${results.length}</p>`;
        searchContent.innerHTML = results.join("");
    } else {
        counter.innerHTML = ``;
        searchContent.innerHTML = "<p class='nothing'>Ничего не найдено</p>";
    }

    for (unique < 1; unique--;) {
        const video = document.getElementById(`video${unique}`);
        const preview = document.getElementById(`videoPreview${unique}`);

        if (video) {
            preview.style.display = 'block';

            video.addEventListener('canplay', function () {
                preview.style.display = 'none';
            });
        }
    }
}

let searchParam = urlParams.get('search');
if (searchParam) {
    window.addEventListener('load', function() {
        document.getElementById("inputSearch").value = searchParam;
        search();
    });
} else {
    deleteNullParam();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.activeElement.blur();
        search();
    }
});

const buttonSearch = document.getElementById('buttonSearch');
buttonSearch.addEventListener('click', () => {
    search();
});

document.addEventListener('click', async (event) => {
    const btn = event.target.closest('.downloadBtn');

    if (btn) {
        const parent = btn.parentElement.parentElement;

        if (parent) {
            const clone = parent.cloneNode(true);

            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '-9999px';
            clone.style.borderRadius = '0';
            document.body.appendChild(clone);

            clone.removeChild(clone.getElementsByClassName('topMenuCon')[0]);
            const colorsArray = {
                'light-theme': '#fff',
                'dark-theme': null
            }

            const currentBgColor = colorsArray[document.body.classList[0]];

            try {
                const canvas = await html2canvas(clone, {
                    logging: false,
                    useCORS: true,
                    scale: 3,
                    backgroundColor: currentBgColor,
                    imageTimeout: 0,
                    allowTaint: false,
                    foreignObjectRendering: false
                });

                const name = parent.getElementsByClassName('title')[0].textContent.trim();

                const link = document.createElement('a');
                link.download = name + '.jpg';
                link.href = canvas.toDataURL('image/jpeg', 1.0);
                link.click();
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                document.body.removeChild(clone);
            }
        }
    }
});


