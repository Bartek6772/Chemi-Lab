var windows = Array.from(document.getElementsByClassName("window"));
console.log(windows.length);

windows.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('window--active');
    })
});
