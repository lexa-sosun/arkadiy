const themeButton = document.getElementById("themeToggle");

function changeTheme() {
    const currentTheme = document.body.className;
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
        localStorage.setItem("theme", "dark-theme");
        themeButton.innerHTML = '<img alt="" src="icons/light.png">';
    } else {
        document.body.className = 'light-theme';
        localStorage.setItem("theme", "light-theme");
        themeButton.innerHTML = '<img alt="" src="icons/dark.png">';
    }
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