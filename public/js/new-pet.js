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
var element = document.querySelector('#DOB');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function (datepicker) {
		console.log(datepicker.data.value());
	});
}