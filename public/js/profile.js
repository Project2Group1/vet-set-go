// Pet icon next to pet's name in tab section
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
            petType[i].setAttribute("class", "reptile fa-solid fa-dragon");

        } else {
            petType[i].setAttribute("class", "other fa-solid fa-paw");
        }
    }
}

// Pet's records - shown only when pet name is clicked
const selectPetHandler = async (event) => {
    event.preventDefault();
    try {
        document.querySelector(".is-active").removeAttribute("class");
    } catch {
        // This error happened because no tab is currently selected
    }

    const petId = event.target.closest('li').getAttribute("data-id");

    const response = await fetch(`/api/users/profile/pets/${petId}`, {
        cache: "no-cache"
    })
        .then(response => response.json())

    // Pet image
    if (response.petDetails.photoURL != null) {
        document.querySelector("img").setAttribute("src", `/images/uploads/${response.petDetails.photoURL}`)
    } else if (response.petDetails.petType === "dog") {
        document.querySelector("img").setAttribute("src", "/images/placeholders/dog-placeholder.png")
    } else if (response.petDetails.petType === "cat") {
        document.querySelector("img").setAttribute("src", "/images/placeholders/cat-placeholder.png")
    } else if (response.petDetails.petType === "bird") {
        document.querySelector("img").setAttribute("src", "/images/placeholders/bird-placeholder.png")
    } else if (response.petDetails.petType === "fish") {
        document.querySelector("img").setAttribute("src", "/images/placeholders/fish-placeholder.png")
    } else if (response.petDetails.petType === "reptile") {
        document.querySelector("img").setAttribute("src", "/images/placeholders/snake-placeholder.png")
    } else {
        document.querySelector("img").setAttribute("src", "/images/placeholders/other-placeholder.png")
    }
    // Add pet's id to upload image button
    document.querySelector("#photo-upload").setAttribute("data-id", `${petId}`);

    // Pet's information
    document.querySelector("#tab").setAttribute("data-id", `${petId}`);
    const petBirthday = new Date(response.petDetails.birthday);
    document.querySelector("#birthday").innerHTML = petBirthday.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });
    document.querySelector("#breed").innerHTML = response.petDetails.breed;
    document.querySelector("#sex").innerHTML = response.petDetails.sex;
    if (!response.petDetails.allergies) {
        document.querySelector("#allergies").innerHTML = "none"
    } else {
        document.querySelector("#allergies").innerHTML = response.petDetails.allergies;
    }
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
    // If it's a new pet, there won't be any records associated with it
    if (response.records === undefined) {
        document.querySelector("#details-appt").innerHTML = "You haven't had any appointments yet";
        document.querySelector("#weight").innerHTML = "Please come into the clinic so we can weigh your pet";
        document.querySelector("#vetNotes").innerHTML = "Please <a href='/client-appointment'>make an appointment</a> to see the vet";
    } else {
        const lastAppt = new Date(response.records.lastAppointment);
        document.querySelector("#lastAppointment").innerHTML = lastAppt.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });
        document.querySelector("#weight").innerHTML = `${response.records.weight} kg`;
        document.querySelector("#vetNotes").innerHTML = response.records.vetNotes
    }
    document.querySelector("#delete-btn").setAttribute("data-id", `${petId}`);
    document.querySelector("#tab").removeAttribute("hidden");

    event.target.closest('li').setAttribute("class", "is-active");
}

// Upload pet's image
const uploadPhotoHandler = async (event) => {
    event.preventDefault();

    var input = document.querySelector('input[type="file"]')
    const petId = event.target.getAttribute("data-id");

    var data = new FormData()

    data.append('file', input.files[0])
    data.append('petId', petId)

    const response = await fetch('/api/pets/photo', {
        method: 'PUT',
        body: data
    })

    const json = await response.json()

    document.querySelector("img").setAttribute("src", `/images/uploads/${json.photoURL}`)

    document.querySelector('.file-name').innerHTML = "";
}

// Delete a pet's profile
async function deletePetHandler(event) {
    event.preventDefault();

    const petId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        document.location.replace('/api/users/profile');
    } else {
        alert("Failed to delete pet profile")
    }
}

petIcon();

const allTabs = document.querySelectorAll('.pet-tab');

for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].addEventListener("click", selectPetHandler);
};

document
    .querySelector("#photo-upload")
    .addEventListener("click", uploadPhotoHandler)

document
    .querySelector("#delete-btn")
    .addEventListener("click", deletePetHandler)


// Event handlers to update file name field https://gist.github.com/micti/bca582bc4054ca7b034faea56930221c    
document.addEventListener('DOMContentLoaded', () => {
    // 1. Display file name when select file
    let fileInputs = document.querySelectorAll('.file.has-name')
    for (let fileInput of fileInputs) {
        let input = fileInput.querySelector('.file-input')
        let name = fileInput.querySelector('.file-name')
        input.addEventListener('change', () => {
            let files = input.files
            if (files.length === 0) {
                name.innerText = 'No file selected'
            } else {
                name.innerText = files[0].name
            }
        })
    }
})