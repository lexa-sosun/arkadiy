const themeButton = document.getElementById("themeToggle");

function changeTheme() {
    const currentTheme = document.body.classList[0];
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme animated';
        localStorage.setItem("theme", "dark-theme");
        themeButton.innerHTML = '<img alt="" src="icons/light.png">';
    } else {
        document.body.className = 'light-theme animated';
        localStorage.setItem("theme", "light-theme");
        themeButton.innerHTML = '<img alt="" src="icons/dark.png">';
    }
    document.getElementById("inputSearch").classList.add("animated");
    document.getElementById("themeToggle").classList.add("animated");
    document.getElementById("buttonSearch").classList.add("animated");
}

let theme = localStorage.getItem("theme")
if (!(theme)) {
    localStorage.setItem("theme", "light-theme");
    theme = localStorage.getItem("theme")
}
window.addEventListener('load', function() {
    document.body.className = theme;
    if (theme === "light-theme") {
        themeButton.innerHTML = '<img alt="" src="icons/dark.png">';
    } else {
        themeButton.innerHTML = '<img alt="" src="icons/light.png">';
    }
});
