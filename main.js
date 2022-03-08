var windows = Array.from(document.getElementsByClassName("window"));

windows.forEach(element => {

    let data = localStorage.getItem(element.dataset.name);
    let isActive = element.classList.contains('window--active');

    console.log(element.dataset.name, isActive);
    
    if (data == null) {
        localStorage.setItem(element.dataset.name, isActive)
    }else{
        if(data == "true"){
            if(!isActive) element.classList.add('window--active');
        }else{
            if (isActive) element.classList.remove('window--active');
        }
    }

    element.getElementsByClassName("window__title")[0].addEventListener('click', () => {
        element.classList.toggle('window--active');

        console.log(element.dataset.name);
        localStorage.setItem(element.dataset.name, element.classList.contains('window--active'));
    })
});

