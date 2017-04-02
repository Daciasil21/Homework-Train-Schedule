$(document).ready(function () {  

	  // Initialize Firebase
	  var config = {
    apiKey: "AIzaSyD98qt-C8awcWRXQyQp1yl_IfVvUbKobeg",
    authDomain: "train-schedule-d3c0e.firebaseapp.com",
    databaseURL: "https://train-schedule-d3c0e.firebaseio.com",
    storageBucket: "train-schedule-d3c0e.appspot.com",
    messagingSenderId: "970057883510"
  };
  firebase.initializeApp(config);
	  // Create a variable to reference the database.
	var database = firebase.database();

	// When ever employee hits submit button
	//(s - e /f)
	// initialize variables 
	var name =""; 
	var destination=""; 
	var frequency=0; 
	var initialTime=0;


// When ever employee hits submit button
	$("#search-button").on("click", function(event){
			
	// get employee input values
	name = $("#train-name").val().trim();
	destination = $("#train-destination").val().trim();
	 // Note that .subtract(10, years) will break the output for differenceTimes,
	 // because 10 years will be added to that output, which is in minutes.
	initialTime = moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
	frequency =  $("#train-frequency").val().trim();

	//empty the form
		$("#train-name").val("");
		$("#train-destination").val("");
		$("#train-time").val("");
		$("#train-frequency").val("");

	// adding user input to database
	database.ref().push({
		name: name,
		destination: destination,
		initialTime: initialTime,
		frequency: frequency,
	}); //end Database

	
	
}); //end search button

     // moment().toNow(Boolean);


	//first start time HH:MM(convert to minutes) 
	//+ frequency (MM) =
	// convert to HH:MM => next departure

	// newStartTime - next departure = minutesAway 

		//time since first = currentT - firstT
		//time since last = tsf % frequency
		//time to next = frequency-tsl

	// var totalBilled = minutesAway * snapshot.val().monthRate;

database.ref().on("child_added", function(snapshot){
	// $("#train-name").html(snapshot.val().name);
	// $("#train-destination").html(snapshot.val().destination);
//local variables
	var name = snapshot.val().name;
	var destination=snapshot.val().destination;
	var initialTime=snapshot.val().initialTime; 
	var frequency = snapshot.val().frequency;


	 // Note that .subtract(10, years) will break the output for differenceTimes, 
	 //because 10 years will be added to that output, which is in minutes.

	 //the difference in time between now (moment()) and the initial time of the train.
	var timeDisparity= moment().diff(moment.unix(initialTime), "minutes");
	//
	var timeRemainder = timeDisparity % frequency;
		//number of minutes away
	var minutesAway = frequency - timeRemainder;

	//time when the train will arrive
	var trainArrival = moment().add(minutesAway,"m").format("hh:mm A");

	
	 //adding user input to the table
    var tRow = $("<tr>");
		tRow.append("<td>"+ snapshot.val().name+ "</td>");
		tRow.append("<td>"+ snapshot.val().destination + "</td>");
		tRow.append("<td>"+ snapshot.val().frequency + "</td>");
		tRow.append("<td>"+ trainArrival +"</td>");
		tRow.append("<td>"+ minutesAway +"</td>");
		
		$("#train-table").append(tRow);
	

	},
	function(errorObject){
		console.log("errors handled:" + errorObject.code);
		
});

}); //end of document ready








