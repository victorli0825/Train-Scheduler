$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyBn1spVmkzp_nI3CsYieKgFY0VhPdqVrNg",
    authDomain: "victorliproject-be775.firebaseapp.com",
    databaseURL: "https://victorliproject-be775.firebaseio.com",
    projectId: "victorliproject-be775",
    storageBucket: "victorliproject-be775.appspot.com",
    messagingSenderId: "1085083359010"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

 

  $("#addTrain-btn").on("click", function(event) {
  		event.preventDefault();

	
	  var trainName = $("#trainName-input").val().trim();
	  var trainDestination = $("#destination-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var trainFrequency = $("#frequency-input").val().trim();

	 
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDestination,
	  	start: firstTrain,
	  	frequency: trainFrequency
	  };

	  
  		database.ref().push(newTrain);


	   
  		alert("Train successfully added");

	 
	  $("#trainName-input").val("");
	  $("#destination-input").val("");
	  $("#firstTrain-input").val("");
	  $("#frequency-input").val("");
  	});

  	
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  
	  var trainName = childSnapshot.val().name;
	  var trainDestination = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFrequency = childSnapshot.val().frequency;


	  
  		var trainFrequency;

  		
   		 var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	  
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	  
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		
	    var tRemainder = diffTime % trainFrequency;
	    console.log(tRemainder);

	    
	    var tMinutesTillTrain = trainFrequency - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


	  
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});