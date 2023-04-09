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

    const petBirthday = new Date(response.petDetails.birthday);
    const lastAppt = new Date(response.records.lastAppointment)

    document.querySelector("#tab").setAttribute("data-id", `${petId}`)
    document.querySelector("#birthday").innerHTML = petBirthday.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});
    document.querySelector("#breed").innerHTML = response.petDetails.breed
    document.querySelector("#sex").innerHTML = response.petDetails.sex
    document.querySelector("#allergies").innerHTML = response.petDetails.allergies
    if (response.petDetails.vaccinated) {
        document.querySelector("#vaccinated").innerHTML = "yes"
    } else {
        document.querySelector("#vaccinated").innerHTML = "no"
    }
    if (response.petDetails.isNeuteredOrSpayed) {
        document.querySelector("#isNeuteredOrSpayed").innerHTML = "yes"
    } else {
        document.querySelector("#isNeuteredOrSpayed").innerHTML = "no"
    }
    document.querySelector("#lastAppointment").innerHTML = lastAppt.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});
    document.querySelector("#weight").innerHTML = `${response.records.weight} kg`
    document.querySelector("#vetNotes").innerHTML = response.records.vetNotes
    document.querySelector("#tab").removeAttribute("hidden")
}

const allTabs = document.querySelectorAll('.pet-tab')

for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].addEventListener("click", selectPetHandler);
}