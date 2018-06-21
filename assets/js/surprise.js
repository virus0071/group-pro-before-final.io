$(document).ready(function () {



    $("#carni").on("click", function (event6) {
        event6.preventDefault();
        
    var protein = ["pork", "bacon", "ham", "hot dog", "Jamon", "prosiutto", "salami", "sausage", "beef", "lamb",
        "chicken", "turkey", "Venison", "duck", "Wild Boar", "salmon", "lobster", "scallop",]


    var vegetables = ["broccoli", "tomatoes", "potatoes","aubergine", "aubergine", "aubergine", "asparagus", "alfalfa sprouts", "azuki beans", 
        "bean sprouts", "black beans", "black-eyed peas", "borlotti bean", "broad beans", "chickpeas", "kidney beans", "green beans", "broccoflower",
    "broccoli", "brussels sprouts", "cabbage", "kohlrabi", "cauliflower", "celery", "endive", "fiddleheads", "frisee", "fennel", "beet greens",
    "bok choy", "chard", "collard greens", "kale", "mustard greens", "spinach", "quinoa", "herbs", "anise", "basil", "caraway", "cilantro", "coriander",
    "chamomile", "dill", "fennel", "lavender", "lemon Grass", "marjoram", "oregano", "parsley", "rosemary", "sage", "thyme", "lettuce", "arugula", "mushrooms",
    "nettles", "New Zealand spinach", "okra", "Chives", "Garlic", "Leek", "onion", "shallot", "scallion", "parsley", "cilantro", "bell pepper", "chili pepper", 
    "Jalapeño", "Habanero", "Paprika", "Tabasco pepper", "Cayenne pepper", "radicchio", "rhubarb", "beet", "carrot", "celeriac", "daikon", "ginger", "parsnip", "rutabaga",
    "turnip", "wasabi", "horseradish", "white radish", "salsify", "skirret", "sweetcorn", "topinambur", "acorn squash", "bitter melon", "butternut squash", "banana squash",
    "Zucchini", "cucumber", "delicata", "gem squash", "hubbard squash", "Squash", "patty pans", "pumpkin", "spaghetti squash", "tat soi", "jicama", "jerusalem artichoke",
    "quandong", "sunchokes", "sweet potato", "taro", "yam", "water chestnut", "watercress"] 


    var carb = ["rice", "pasta", "qinuoa"]


    var ing1 = protein[Math.floor(Math.random()*protein.length)];
    var ing2 = vegetables[Math.floor(Math.random()*vegetables.length)];
    var ing3 = carb[Math.floor(Math.random()*carb.length)];

    //var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1"
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + ing1 + "%2C" + ing2 + "%2C" + ing3 + "sugar&limitLicense=false&number=4&ranking=1"
    //var foodTitleArray = [];

    //console.log(foodTitleArray);

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "X-Mashape-Key": "2I6vIUjk1TmshV5d9PU7jtgjqmesp1Y3LPMjsnRMnpBlNifs8B"
        }
    }).then(function (response) {
        console.log(response)
        //debugger;
        for (var i = 0; i < response.length; i++) {
            var foodDiv = $("<div>");
            foodDiv.addClass("foodDiv");
            foodDiv.attr("id", "foodIcon");
            var foodTitle = response[i].title;

            //var foodDivArray = [];
            //console.log(foodDivArray);


            //Here we are dynamically creating a div for each recipe.
            var p1 = $("<p>").text(foodTitle);
            var titleUrl = foodTitle.replace(/\s/g, '-');
            var foodId = response[i].id;
            var foodUrl = "https://spoonacular.com/recipes/" + titleUrl + "-" + foodId + "";
            console.log(foodUrl);
            var foodImage = $("<img>");
            foodImage.attr("src", response[i].image);
            var a = $("<a>");
            a.attr("href", foodUrl);
            a.append(foodImage);
            var usedIng = response[i].usedIngredientCount;
            var p2 = $("<p>").text("No. of ingredients used: " + usedIng);

            foodDiv.append(a);
            foodDiv.append(p1);
            foodDiv.append(p2);
            

            youtubeApiCall(foodTitle, foodDiv);

            //foodDivArray.push(foodDiv);
            $("#recipesDiv").prepend(foodDiv);



        }
   
    })

    //debugger;




    function youtubeApiCall(foodTitle, foodDiv) {
        //second .ajax function starts here
        var video = "How to make " + foodTitle;
        console.log(video);

        var queryURL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
            video + "&type=video&key=AIzaSyDUCh8h4KhjDpzDmGOSdJOLxtDdzR8Swhs";
        console.log(queryURL1);
        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response1) {
            console.log(response1)

            var results = response1.items;

            //debugger;
            //var resultDiv = $("#vresults");
            var titles = results[0].snippet.title;
            var videoIds = results[0].id.videoId;
            var videoURL = "https://www.youtube.com/watch?v=" + videoIds;
            var p = $("<p>").text("Video ID: " + videoIds);
            var q = $("<p>").text(titles);



            foodDiv.append("<a href='" + videoURL + "'class='button button-caution button-box button-raised button-giant button-longshadow' id='youtube'><i class='fa fa-youtube'></i></a>");
            $("#recipesDiv").append(foodDiv);



            $(".button-caution").on("click", function (e) {
                e.preventDefault();
                href = videoURL;
                window.open(videoURL, videoIds, '_blank');
            });
        });
    }
})




$("#veget").on("click", function (event7) {
    event7.preventDefault();
    
var protein = ["pork", "bacon", "ham", "hot dog", "Jamon", "prosiutto", "salami", "sausage", "beef", "lamb",
    "chicken", "turkey", "Venison", "duck", "Wild Boar", "salmon", "lobster", "scallop",]


var vegetables = ["broccoli", "tomatoes", "potatoes","aubergine", "aubergine", "aubergine", "asparagus", "alfalfa sprouts", "azuki beans", 
    "bean sprouts", "black beans", "black-eyed peas", "borlotti bean", "broad beans", "chickpeas", "kidney beans", "green beans", "broccoflower",
"broccoli", "brussels sprouts", "cabbage", "kohlrabi", "cauliflower", "celery", "endive", "fiddleheads", "frisee", "fennel", "beet greens",
"bok choy", "chard", "collard greens", "kale", "mustard greens", "spinach", "quinoa", "herbs", "anise", "basil", "caraway", "cilantro", "coriander",
"chamomile", "dill", "fennel", "lavender", "lemon Grass", "marjoram", "oregano", "parsley", "rosemary", "sage", "thyme", "lettuce", "arugula", "mushrooms",
"nettles", "New Zealand spinach", "okra", "Chives", "Garlic", "Leek", "onion", "shallot", "scallion", "parsley", "cilantro", "bell pepper", "chili pepper", 
"Jalapeño", "Habanero", "Paprika", "Tabasco pepper", "Cayenne pepper", "radicchio", "rhubarb", "beet", "carrot", "celeriac", "daikon", "ginger", "parsnip", "rutabaga",
"turnip", "wasabi", "horseradish", "white radish", "salsify", "skirret", "sweetcorn", "topinambur", "acorn squash", "bitter melon", "butternut squash", "banana squash",
"Zucchini", "cucumber", "delicata", "gem squash", "hubbard squash", "Squash", "patty pans", "pumpkin", "spaghetti squash", "tat soi", "jicama", "jerusalem artichoke",
"quandong", "sunchokes", "sweet potato", "taro", "yam", "water chestnut", "watercress"] 


var carb = ["rice", "pasta", "qinuoa"]


var ing1 = vegetables[Math.floor(Math.random()*vegetables.length)];
var ing2 = vegetables[Math.floor(Math.random()*vegetables.length)];
var ing3 = carb[Math.floor(Math.random()*carb.length)];

//var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1"
var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + ing1 + "%2C" + ing2 + "%2C" + ing3 + "sugar&limitLicense=false&number=4&ranking=1"
//var foodTitleArray = [];

//console.log(foodTitleArray);

$.ajax({
    url: queryURL,
    method: "GET",
    headers: {
        "X-Mashape-Key": "2I6vIUjk1TmshV5d9PU7jtgjqmesp1Y3LPMjsnRMnpBlNifs8B"
    }
}).then(function (response) {
    console.log(response)
    //debugger;
    for (var i = 0; i < response.length; i++) {
        var foodDiv = $("<div>");
        foodDiv.addClass("foodDiv");
        foodDiv.attr("id", "foodIcon");
        var foodTitle = response[i].title;

        //var foodDivArray = [];
        //console.log(foodDivArray);


        //Here we are dynamically creating a div for each recipe.
        var p1 = $("<p>").text(foodTitle);
        var titleUrl = foodTitle.replace(/\s/g, '-');
        var foodId = response[i].id;
        var foodUrl = "https://spoonacular.com/recipes/" + titleUrl + "-" + foodId + "";
        console.log(foodUrl);
        var foodImage = $("<img>");
        foodImage.attr("src", response[i].image);
        var a = $("<a>");
        a.attr("href", foodUrl);
        a.append(foodImage);
        var usedIng = response[i].usedIngredientCount;
        var p2 = $("<p>").text("No. of ingredients used: " + usedIng);

        foodDiv.append(a);
        foodDiv.append(p1);
        foodDiv.append(p2);
        

        youtubeApiCall(foodTitle, foodDiv);

        //foodDivArray.push(foodDiv);
        $("#recipesDiv").prepend(foodDiv);



    }

})

//debugger;




function youtubeApiCall(foodTitle, foodDiv) {
    //second .ajax function starts here
    var video = "How to make " + foodTitle;
    console.log(video);

    var queryURL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
        video + "&type=video&key=AIzaSyDUCh8h4KhjDpzDmGOSdJOLxtDdzR8Swhs";
    console.log(queryURL1);
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response1) {
        console.log(response1)

        var results = response1.items;

        //debugger;
        //var resultDiv = $("#vresults");
        var titles = results[0].snippet.title;
        var videoIds = results[0].id.videoId;
        var videoURL = "https://www.youtube.com/watch?v=" + videoIds;
        var p = $("<p>").text("Video ID: " + videoIds);
        var q = $("<p>").text(titles);



        foodDiv.append("<a href='" + videoURL + "'class='button button-caution button-box button-raised button-giant button-longshadow' id='youtube'><i class='fa fa-youtube'></i></a>");
        $("#recipesDiv").append(foodDiv);



        $(".button-caution").on("click", function (e) {
            e.preventDefault();
            href = videoURL;
            window.open(videoURL, videoIds, '_blank');
        });
    });
}
})
});







var config = {
    apiKey: "AIzaSyAbgpedcMjLL0k9gD1GnA6LEiM8TUaR_TA",
    authDomain: "group-pro-40318.firebaseapp.com",
    databaseURL: "https://group-pro-40318.firebaseio.com",
    projectId: "group-pro-40318",
    storageBucket: "group-pro-40318.appspot.com",
    messagingSenderId: "837788682027"
};
firebase.initializeApp(config);

var database = firebase.database();

var support = 0;
var unsupport = 0;
var buttonClicked = 0;

$("#support").on("click", function (e) {
    e.preventDefault();
    support++;
    database.ref().update({
        supportNum: support
    })
})

$("#unsupport").on("click", function (event) {
    event.preventDefault();
    unsupport++;
    database.ref().update({
        unsupportNum: unsupport
    })
})

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    $("#supportNum").text("We have received: " + snapshot.val().supportNum + " supports!!!!");
    support = snapshot.val().supportNum;
    unsupport = snapshot.val().unsupportNum;
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
