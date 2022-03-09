const setTheme = theme => document.documentElement.className = theme;

const themeButtons = Array.from(document.getElementsByClassName('theme-btn'));

themeButtons.forEach(button => {
    button.style.backgroundColor = `var(--${button.dataset.theme}-theme)`;

    button.addEventListener('click', () => {
        setTheme(button.dataset.theme);
        localStorage.setItem("theme", button.dataset.theme)
    })
});

if (localStorage.getItem("theme") == null){
    localStorage.setItem("theme", "green")
}else{
    setTheme(localStorage.getItem("theme"));
}