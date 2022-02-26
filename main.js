var windows = Array.from(document.getElementsByClassName("window"));
console.log(windows.length);

windows.forEach(element => {
    element.getElementsByClassName("window__title")[0].addEventListener('click', () => {
        element.classList.toggle('window--active');
    })
});
