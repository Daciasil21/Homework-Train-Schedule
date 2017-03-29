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
	
	// initialize variables 
	var name = ""; 
	var startDate; 
	var monthRate; 
	var role;
	var totalBilled;
	var monthsWorked;

// When ever employee hits submit button
	$("#search-button").on("click", function(event){
	
	// get employee input values
	name = $("#train-name").val().trim();
	destination = $("#train-destination").val().trim();
	time = $("#train-time").val().trim();
	frequency =  parseInt($("#train-frequency").val().trim());

	// console.log user values 
	console.log(name + " " + destination + " " + time);

	// adding user input to database
	database.ref().push({
		name: name,
		destination: destination,
		time: time,
		frequency: frequency,
	});

		// 	database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
		// $("#employee-table").empty();
			
}); //end search button

database.ref().on("child_added", function(snapshot){
	$("#train-name").html(snapshot.val().name);
	$("#train-destination").html(snapshot.val().destination);
	$("#train-time").html(snapshot.val().time);
	$("#train-frequency").html(snapshot.val().frequency);

	 //adding user input to the table
    var tRow = $("<tr>");
		tRow.append("<td>"+ snapshot.val().name+ "</td>");
		tRow.append("<td>"+ snapshot.val().destination + "</td>");
		tRow.append("<td>"+ snapshot.val().time + "</td>");
		tRow.append("<td>"+ snapshot.val().frequency +"</td>");
		// tRow.append("<td>"+ snapshot.val().monthRate + "</td>");
		// tRow.append("<td>"+ snapshot.val().totalBilled +"</td>");
		$("#train-table").append(tRow);
		console.log(name);

	},
	function(errorObject){
		console.log("errors handled:" + errorObject.code);
		
});


}); //end of document ready





// moment().format("DD/MM/YY hh:mm A")
//database.ref().orderByChild("dateAdded")



