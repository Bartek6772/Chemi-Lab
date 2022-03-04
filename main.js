var windows = Array.from(document.getElementsByClassName("window"));

windows.forEach(element => {
    element.getElementsByClassName("window__title")[0].addEventListener('click', () => {
        element.classList.toggle('window--active');
    })
});
