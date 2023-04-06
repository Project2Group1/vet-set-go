const clientFormHandler = async (event) => {
  event.preventDefault();

  // get user
  // get pet
};

const guestFormHandler = async (event) => {
  event.preventDefault();

  const user_id = null;
  const firstName = document.querySelector("#firstName-contact").value.trim();
  const lastName = document.querySelector("#lastName-contact").value.trim();
  const email = document.querySelector("#email-contact").value.trim();
  const pet_name = document.querySelector("#petName-contact").value.trim();
  const species = document.querySelector("#species-contact").value.trim();
  const breed = document.querySelector("#breed-contact").value.trim();
  const birthday = document.querySelector("#birthday-contact").value.trim();
  const sex = document.querySelector("#sex-contact").value.trim();
  const allergies = document.querySelector("#allergies-contact").value.trim();
  const isNeuteredOrSpayed = document
    .querySelector("#spayNeutered-contact")
    .value.trim();
  const vaccinated = document.querySelector("#vaccinated-contact").value.trim();
  const concern = document.querySelector("#concern-contact").value.trim();

  if (
    firstName &&
    lastName &&
    email &&
    pet_name &&
    species &&
    sex &&
    isNeuteredOrSpayed &&
    vaccinated &&
    concern
  ) {
    const response = await fetch("/api/appointments", {
      method: "POST",
      body: JSON.stringify({
        user_id,
        firstName,
        lastName,
        email,
        pet_name,
        species,
        breed,
        allergies,
        vaccinated,
        birthday,
        isNeuteredOrSpayed,
        sex,
        concern,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
      // want to show the message "Your appointment request has been received! Keep an eye on your email."
    } else {
      alert("Failed to make appointment.");
    }
  }
};

document
  .querySelector(".guest-form")
  .addEventListener("submit", guestFormHandler);

document
  .querySelector(".client-form")
  .addEventListener("submit", clientFormHandler);
