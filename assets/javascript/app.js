
var config = {
    apiKey: "AIzaSyAOgDMxTCPakorEubLP4zu33bWX3lTAEDc",
    authDomain: "train-scheduler-d61d8.firebaseapp.com",
    databaseURL: "https://train-scheduler-d61d8.firebaseio.com",
    projectId: "train-scheduler-d61d8",
    storageBucket: "",
    messagingSenderId: "749100028969"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    
    event.preventDefault();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: trainFirstTime,
        frequency: trainFrequency 
    };

    console.log(newTrain); 

    database.ref().push(newTrain); 

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");

  });

