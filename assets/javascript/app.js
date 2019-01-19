
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

    var trainName = $("#train-name-input").val();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTime = $("#first-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: trainFirstTime,
        frequency: trainFrequency 
    };

    console.log(newTrain); 

    database.ref().push(newTrain); 

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {
    
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemainder = timeDiff % trainFrequency; 

    var timeMinutesTillTrain = trainFrequency - timeRemainder;

    var nextTrain = moment().add(timeMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("HH:mm"); 

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(timeMinutesTillTrain),
    );

    $("#train-table").append(newRow); 

  });

