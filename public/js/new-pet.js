var options = {
	color: 'primary',
	isRange: false,
	allowSameDayRange: true,
	lang: 'en-US',
	startDate: undefined,
	endDate: undefined,
	minDate: null,
	maxDate: null,
	disabledDates: [],
	disabledWeekDays: undefined,
	highlightedDates: [],
	weekStart: 0,
	dateFormat: 'MM/dd/yyyy',
	enableMonthSwitch: true,
	enableYearSwitch: true,
	displayYearsCount: 50,
}

// Initialize all input of type date
var calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
for (var i = 0; i < calendars.length; i++) {
	// Add listener to select event
	calendars[i].on('select', date => {
		console.log(date);
	});
}

// To access to bulmaCalendar instance of an element
var element = document.querySelector('#DOB-newPet');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function (datepicker) {
		console.log(datepicker.data.value());
	});
}

const newPetFormHandler = async (event) => {
	event.preventDefault();
	resetValidation();

	try {
		const name = document.querySelector('#name-newPet').value.trim();
		const birthday = document.querySelector('#DOB-newPet').value.trim();
		const petType = document.querySelector('#petType-newPet select').value;
		const breed = document.querySelector('#breed-newPet').value.trim();
		let sex = "";
		try {
			sex = document.querySelector('input[name="sex-newPet"]:checked').value;
		} catch {
			sex = "";
		};
		let vaccinated = "";
		try {
			vaccinated = document.querySelector('input[name="vaccinations-newPet"]:checked').value;
		} catch {
			vaccinated = "";
		};
		let isNeuteredOrSpayed = "";
		try {
			isNeuteredOrSpayed = document.querySelector('input[name="isNeuteredOrSpayed-newPet"]:checked').value;
		} catch {
			isNeuteredOrSpayed = "";
		};
		const allergies = document.querySelector('#allergies-newPet').value.trim();

		if (name.length === 0) {
			document.querySelector("#no-name").removeAttribute("hidden");
		} else if (birthday.length === 0) {
			document.querySelector("#no-DOB").removeAttribute("hidden");
		} else if (petType.length === 0) {
			document.querySelector("#no-type").removeAttribute("hidden");
		} else if (breed.length === 0) {
			document.querySelector("#no-breed").removeAttribute("hidden");
		} else if (sex.length === 0) {
			document.querySelector("#no-sex").removeAttribute("hidden");
		} else if (vaccinated.length === 0) {
			document.querySelector("#no-vaccinations").removeAttribute("hidden");
		} else if (isNeuteredOrSpayed.length === 0) {
			document.querySelector("#no-neutered").removeAttribute("hidden");
		} else {
			vaccinated = vaccinated == "yes" ? true : false;
			isNeuteredOrSpayed = isNeuteredOrSpayed == "yes" ? true : false;

			const response = await fetch('/api/pets/', {
				method: 'POST',
				body: JSON.stringify({ name, birthday, petType, breed, sex, vaccinated, isNeuteredOrSpayed, allergies }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				document.location.replace('/api/users/profile');
			} else {
				alert('Failed to submit new pet');
			}
		}
	} catch (err) {
		alert("Please make sure you answer all questions")
	}
};

function resetValidation() {
		document.querySelector("#no-name").setAttribute("hidden", "hidden");
		document.querySelector("#no-DOB").setAttribute("hidden", "hidden");
		document.querySelector("#no-type").setAttribute("hidden", "hidden");
		document.querySelector("#no-breed").setAttribute("hidden", "hidden");
		document.querySelector("#no-sex").setAttribute("hidden", "hidden");
		document.querySelector("#no-vaccinations").setAttribute("hidden", "hidden");
		document.querySelector("#no-neutered").setAttribute("hidden", "hidden");
}

	document
		.querySelector('.newPet-form')
		.addEventListener('submit', newPetFormHandler);