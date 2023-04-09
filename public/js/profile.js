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

const selectPetHandler = async (event) => {
    event.preventDefault();

    const petId = event.target.closest('li').getAttribute("data-id");

    const response = await fetch(`/api/users/profile/pets/${petId}`, {
        cache: "no-cache"
    })
        .then(response => response.json())

    console.log(response)

    document.querySelector("#tab").setAttribute("data-id", `${petId}`)
    document.querySelector("#birthday").innerHTML = response[0].birthday
    document.querySelector("#petType").innerHTML = response[0].petType
    document.querySelector("#breed").innerHTML = response[0].breed
    document.querySelector("#sex").innerHTML = response[0].sex
    document.querySelector("#allergies").innerHTML = response[0].allergies
    document.querySelector("#vaccinated").innerHTML = response[0].vaccinated
    document.querySelector("#isNeuteredOrSpayed").innerHTML = response[0].isNeuteredOrSpayed
    document.querySelector("#lastAppointment").innerHTML = response[0].lastAppointment
    document.querySelector("#weight").innerHTML = `${response[0].weight} kg`
    document.querySelector("#vetNotes").innerHTML = response[0].vetNotes
    document.querySelector("#tab").removeAttribute("hidden")
}

const allTabs = document.querySelectorAll('.pet-tab')

for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].addEventListener("click", selectPetHandler);
}