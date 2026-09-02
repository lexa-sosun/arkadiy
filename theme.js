const themeButton = document.getElementById("themeToggle");

function animateElements() {
    document.getElementById("inputSearch").classList.add("animated");
    document.getElementById("themeToggle").classList.add("animated");
    document.getElementById("buttonSearch").classList.add("animated");
}

function recolorAllDownloadImages(theme = 'light') {
    const downloadImages = document.getElementsByClassName('downloadImg');
    for (let d = 0; d < downloadImages.length; d++) {
        downloadImages[d].src = `icons/download_${theme}.png`;
    }
}

toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () =>  {
    const currentTheme = document.body.classList[0];

    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme animated';
        localStorage.setItem("theme", "dark-theme");
        themeButton.innerHTML = '<img alt="" src="icons/light.png">';
        recolorAllDownloadImages('dark');
    } else {
        document.body.className = 'light-theme animated';
        localStorage.setItem("theme", "light-theme");
        themeButton.innerHTML = '<img alt="" src="icons/dark.png">';
        recolorAllDownloadImages('light');
        animateElements();
    }
});

let theme = localStorage.getItem("theme");
if (!(theme)) {
    localStorage.setItem("theme", "light-theme");
    theme = localStorage.getItem("theme");
}
window.addEventListener('load', function() {
    document.body.className = theme;
    if (theme === "light-theme") {
        themeButton.innerHTML = '<img alt="" src="icons/dark.png">';
    } else {
        themeButton.innerHTML = '<img alt="" src="icons/light.png">';
    }

    async function animateWithDelay() {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);
        animateElements();
    }
    animateWithDelay();
});
