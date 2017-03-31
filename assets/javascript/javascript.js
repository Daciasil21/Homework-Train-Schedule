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
	var name = ""; 
	var destination; 
	var frequency; 
	var initialTime;

	var minutesAway;
	var nextDeparture;

// When ever employee hits submit button
	$("#search-button").on("click", function(event){
	
	// get employee input values
	name = $("#train-name").val().trim();
	destination = $("#train-destination").val().trim();
	initialTime = $("#train-time").val().trim();
	frequency =  parseInt($("#train-frequency").val().trim());

	// console.log user values 
	console.log(name + " " + destination + " " + initialTime);

	// adding user input to database
	database.ref().push({
		name: name,
		destination: destination,
		initialTime: initialTime,
		frequency: frequency,
	}); //end Database

	
	
}); //end search button

     moment().toNow(Boolean);


	//first start time HH:MM(convert to minutes) 
	//+ frequency (MM) =
	// convert to HH:MM => next departure

	// newStartTime - next departure = minutesAway 

		//time since first = currentT - firstT
		//time since last = tsf % frequency
		//time to next = frequency-tsl

	// var totalBilled = minutesAway * snapshot.val().monthRate;

database.ref().on("child_added", function(snapshot){
	$("#train-name").html(snapshot.val().name);
	$("#train-destination").html(snapshot.val().destination);
	$("#train-time").html(snapshot.val().initialTime);
	$("#train-frequency").html(snapshot.val().frequency);

	// calcMinutes(snapshot.val().initialTime
	 //adding user input to the table
    var tRow = $("<tr>");
		tRow.append("<td>"+ snapshot.val().name+ "</td>");
		tRow.append("<td>"+ snapshot.val().destination + "</td>");
		tRow.append("<td>"+ snapshot.val().initialTime + "</td>");
		tRow.append("<td>"+ snapshot.val().frequency +"</td>");
		// tRow.append("<td>"+ snapshot.val().monthRate + "</td>");
		// tRow.append("<td>"+ snapshot.val().totalBilled +"</td>");
		$("#train-table").append(tRow);
	

	},
	function(errorObject){
		console.log("errors handled:" + errorObject.code);
		
});
function calcMinutes(sd){

// 	//take sd and format it in unix time THENNNNN do diff opp  THHEENNNN to months
	 var unixStart = moment(sd).format('X');

	 console.log(unixStart);


	var convertStart = moment(new Date(sd));
	console.log(convertStart + "CONVERT START");
	console.log(moment().diff(moment(convertStart), "minutes"));
    minutesAway = moment().diff(moment(convertStart), "minutes");
};

}); //end of document ready





// moment().format("DD/MM/YY hh:mm A")
//database.ref().orderByChild("dateAdded")



