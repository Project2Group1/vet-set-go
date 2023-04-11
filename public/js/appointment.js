const session = require("express-session");
const { Users, Pets } = require("../../models");

// Using datepicker code from the net pet form //
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

const getPets = async () => {
  console.log("We're here!");
  const petNames = await Pets.findAll(
    { where: { user_id: session.user_id } },
    { attributes: ["name"] }
  );

  for (var name in petNames) {
    var option = document.createElement("option");
    option.text = name;
    console.log(name);
    document.querySelector("#petName-contact").appendChild(option);
  }
};

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
    document.getElementById("inner-content").innerHTML =
      "We encountered an error while creating your appointment. Please try again.";
  }
};

const clientFormHandler = async (event) => {
  event.preventDefault();

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
      petData.petType,
      petData.breed,
      petData.birthday,
      petData.sex,
      petData.allergies,
      petData.isNeuteredOrSpayed,
      petData.vaccinated
    );
  } else {
    // Prompt for missing info
  }
};

const guestFormHandler = async (event) => {
  event.preventDefault();

  const user_id = null;
  const firstName = document.querySelector("#firstName-contact").value.trim();
  const lastName = document.querySelector("#lastName-contact").value.trim();
  const email = document.querySelector("#email-contact").value.trim();
  const pet_name = document.querySelector("#petName-contact").value.trim();
  const type = document.querySelector("#species-contact").value.trim();
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
    // Prompt for missing info
  }
};

document
  .querySelector(".guest-form")
  .addEventListener("submit", guestFormHandler);

document
  .querySelector(".client-form")
  .addEventListener("submit", clientFormHandler)
  .addEventListener("DOMContentLoaded", getPets);
