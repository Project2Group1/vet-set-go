const session = require("express-session");
const { Users, Pets } = require("../../models");

// Using datepicker for birthday input //
var options = {
  color: "primary",
  isRange: false,
  allowSameDayRange: true,
  lang: "en-US",
  startDate: undefined,
  endDate: undefined,
  minDate: null,
  maxDate: null,
  disabledDates: [],
  disabledWeekDays: undefined,
  highlightedDates: [],
  weekStart: 0,
  dateFormat: "MM/dd/yyyy",
  enableMonthSwitch: true,
  enableYearSwitch: true,
  displayYearsCount: 50,
};

// Initialize all input of type date
var calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
for (var i = 0; i < calendars.length; i++) {
  // Add listener to select event
  calendars[i].on("select", (date) => {
    console.log(date);
  });
}

// To access to bulmaCalendar instance of an element
var element = document.querySelector("#DOB-newPet");
if (element) {
  // bulmaCalendar instance is available as element.bulmaCalendar
  element.bulmaCalendar.on("select", function (datepicker) {
    console.log(datepicker.data.value());
  });
}

// Generate a client's pets as dropdown options
const getPets = async () => {
  const { petNames, count } = await Pets.findAndCountAll({
    where: { user_id: session.user_id },
    attributes: ["name"],
  });

  if (count > 0) {
    const el = document.getElementById("petName-contact");
    for (var i = 0; i < count; i++) {
      var option = document.createElement("option");
      option.text = petNames[i];
      option.value = petNames[i];
      el.appendChild(option);
    }
  }
};

// Same POST request for both forms
const sendRequest = async (
  user_id,
  firstName,
  lastName,
  email,
  pet_name,
  type,
  breed,
  allergies,
  vaccinated,
  birthday,
  isNeuteredOrSpayed,
  sex,
  concern
) => {
  const response = await fetch("/api/appointment", {
    method: "POST",
    body: JSON.stringify({
      user_id,
      firstName,
      lastName,
      email,
      pet_name,
      type,
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
    document.getElementById("inner-content").innerHTML =
      "Your appointment request has been received! Keep an eye on your email for updates.";
  } else {
    alert("Failed to submit appointment");
  }
};

const clientFormHandler = async (event) => {
  event.preventDefault();

  try {
    const pet_name = document.querySelector("#petName-contact").value.trim();
    const concern = document.querySelector("#concern-contact").value.trim();

    const userData = await Users.findByPk(session.user_id);
    const petData = await Pets.findOne({
      where: { user_id: userData.id, name: pet_name },
    });

    if (userData && petData && concern) {
      sendRequest(
        userData.id,
        userData.firstName,
        userData.lastName,
        userData.email,
        petData.name,
        petData.petType,
        petData.breed,
        petData.allergies,
        petData.vaccinated,
        petData.birthday,
        petData.isNeuteredOrSpayed,
        petData.sex,
        concern
      );
    }
  } catch (err) {
    alert("You are missing one or more required fields");
  }
};

const guestFormHandler = async (event) => {
  event.preventDefault();

  const user_id = null;
  const firstName = document.querySelector("#firstName-contact").value.trim();
  const lastName = document.querySelector("#lastName-contact").value.trim();
  const email = document.querySelector("#email-contact").value.trim();
  const pet_name = document.querySelector("#petName-contact").value.trim();
  const type = document.querySelector("#petType-contact").value.trim();
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
    type &&
    sex &&
    isNeuteredOrSpayed &&
    vaccinated &&
    concern
  ) {
    sendRequest(
      user_id,
      firstName,
      lastName,
      email,
      pet_name,
      type,
      breed,
      allergies,
      vaccinated,
      birthday,
      isNeuteredOrSpayed,
      sex,
      concern
    );
  } else {
    document.getElementById("warning").innerHTML =
      "You are missing one or more required fields";
  }
};

var guestForm = document.querySelector(".guest-form");
var clientForm = document.querySelector(".client-form");

if (guestForm) {
  guestForm.addEventListener("submit", guestFormHandler);
}
if (clientForm) {
  getPets();
  clientForm.addEventListener("submit", clientFormHandler);
}
