$(document).ready(function () {

    $(document).on("click", "#run", function (event) {
        event.preventDefault();
        var ing1 = $("#ing1").val().trim();
        var ing2 = $("#ing2").val().trim();
        var ing3 = $("#ing3").val().trim();

        $("#ing1").val("");
        $("#ing2").val("");
        $("#ing3").val("");



        //var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1"
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+ing1+"%2C"+ing2+"%2C"+ing3+"&limitLicense=false&number=4&ranking=1"
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
                //console.log(foodUrl);
                var foodImage = $("<img>");
                foodImage.attr("src", response[i].image);
                var a = $("<a>");
                a.attr("href", foodUrl);
                a.append(foodImage);
                var usedIng = response[i].usedIngredientCount;
                var p2 = $("<p>").text("Ingredients used: " + usedIng);
                foodDiv.append(p1);
                foodDiv.append(p2);
                foodDiv.append(a);
                
                youtubeApiCall(foodTitle, foodDiv);

                //foodDivArray.push(foodDiv);
                $("#recipesDiv").append(foodDiv);



            }


        })

        //debugger;


    })

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
  
    $("#support").on("click", function(e){
      e.preventDefault();
      support++;
      database.ref().update({
        supportNum: support
      })
    })
  
    $("#unsupport").on("click", function(event){
      event.preventDefault();
      unsupport++;
      database.ref().update({
        unsupportNum: unsupport
      })
    })
  
    database.ref().on("value", function(snapshot) {
      console.log(snapshot.val());
      $("#supportNum").text("We have received: " + snapshot.val().supportNum + " supports!!!!");
      support = snapshot.val().supportNum;
      unsupport = snapshot.val().unsupportNum;
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
