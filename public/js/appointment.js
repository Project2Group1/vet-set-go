const guestForm = document.querySelector(".guest-form");
const clientForm = document.querySelector(".client-form");

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
var element = document.querySelector("#DOB-contact");
if (element) {
  // bulmaCalendar instance is available as element.bulmaCalendar
  element.bulmaCalendar.on("select", function (datepicker) {
    console.log(datepicker.data.value());
  });
}

// Form handler for a client appointment
const clientFormHandler = async (event) => {
  event.preventDefault();

  const pet_name = document
    .querySelector("#petName-contact select")
    .value.trim();
  const concern = document.querySelector("#concern-contact").value.trim();

  if (pet_name && concern) {
    // Declare request variables
    const isUser = true;
    const {
      firstName,
      lastName,
      email,
      petType,
      breed,
      allergies,
      vaccinated,
      birthday,
      isNeuteredOrSpayed,
      sex,
    } = "";

    try {
      const response = await fetch("/api/appointment/", {
        method: "POST",
        body: JSON.stringify({
          isUser,
          firstName,
          lastName,
          email,
          pet_name,
          petType,
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
        document.location.replace("/booked");
      } else throw console.error();
    } catch (err) {
      alert("Failed to submit appointment. Please try again");
    }
  } else {
    alert("You are missing one or more required fields");
  }
};

// Form handler for a guest appointment
const guestFormHandler = async (event) => {
  event.preventDefault();

  const isUser = false;
  const firstName = document.querySelector("#firstName-contact").value.trim();
  const lastName = document.querySelector("#lastName-contact").value.trim();
  const email = document.querySelector("#email-contact").value.trim();
  const pet_name = document.querySelector("#petName-contact").value.trim();
  const petType = document
    .querySelector("#petType-contact select")
    .value.trim();
  const breed = document.querySelector("#breed-contact").value.trim();
  const birthday = document.querySelector("#DOB-contact").value.trim();
  const sex = document
    .querySelector('input[name="sex-contact"]:checked')
    .value.trim();
  const allergies = document.querySelector("#allergies-contact").value.trim();
  var isNeuteredOrSpayed = document
    .querySelector('input[name="spayNeutered-contact"]:checked')
    .value.trim();
  var vaccinated = document
    .querySelector('input[name="vaccinated-contact"]:checked')
    .value.trim();
  const concern = document.querySelector("#concern-contact").value.trim();

  vaccinated = vaccinated == "yes" ? true : false;
  isNeuteredOrSpayed = isNeuteredOrSpayed == "yes" ? true : false;

  if (
    firstName &&
    lastName &&
    email &&
    pet_name &&
    petType &&
    sex &&
    isNeuteredOrSpayed &&
    vaccinated &&
    concern
  ) {
    try {
      const response = await fetch("/api/appointment/", {
        method: "POST",
        body: JSON.stringify({
          isUser,
          firstName,
          lastName,
          email,
          pet_name,
          petType,
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
        document.location.replace("/booked");
      } else throw console.error();
    } catch (err) {
      alert("Failed to submit appointment. Please try again");
    }
  } else {
    alert("You are missing one or more required fields");
  }
};

if (guestForm) {
  guestForm.addEventListener("submit", guestFormHandler);
}

if (clientForm) {
  clientForm.addEventListener("submit", clientFormHandler);
}
