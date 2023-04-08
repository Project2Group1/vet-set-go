function petIcon() {
    const petType = document.querySelectorAll("[data-type*='petType']");

    for (let i = 0; i < petType.length; i++) {
        if (petType[i].classList.contains('dog')) {
            petType[i].setAttribute("class", "dog fa-solid fa-dog");

        } else if (petType[i].classList.contains('cat')) {
            petType[i].setAttribute("class", "cat fa-solid fa-cat");

        } else if (petType[i].classList.contains('bird')) {
            petType[i].setAttribute("class", "bird fa-solid fa-dove");

        } else if (petType[i].classList.contains('fish')) {
            petType[i].setAttribute("class", "fish fa-solid fa-fish-fins");

        } else if (petType[i].classList.contains('reptile')) {
            petType[i].setAttribute("class", "reptile fa-solid fa-snake");

        } else {
            petType[i].setAttribute("class", "other fa-solid fa-paw");
        }
    }
}

petIcon();