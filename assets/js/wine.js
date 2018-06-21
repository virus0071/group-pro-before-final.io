$(document).ready(function () {

    $(document).on("click", "#run", function (event) {
        event.preventDefault();
        var price = $("#price").val().trim();
        var wineType = $("#wineType").val().trim();
        

        $("#price").val("");
        $("#wineType").val("");
        



        //var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1"
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/recommendation?maxPrice="+price+"&minRating=0.7&number=4&wine="+wineType+"";
        //var foodTitleArray = [];

        //console.log(foodTitleArray);

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "X-Mashape-Key": "2I6vIUjk1TmshV5d9PU7jtgjqmesp1Y3LPMjsnRMnpBlNifs8B"
            }
        }).then(function (response) {
            //console.log(response)
            //debugger;
            for (var i = 0; i < response.recommendedWines.length; i++) {
                var wineDiv = $("<div>");
                wineDiv.addClass("wineDiv");
                wineDiv.attr("id", "wineIcon");
                var wineTitle = response.recommendedWines[i].title;

                //var foodDivArray = [];
                //console.log(foodDivArray);


                //Here we are dynamically creating a div for each recipe.
                var p1 = $("<p>").text(wineTitle);
                //var titleUrl = foodTitle.replace(/\s/g, '-');
                //var foodId = response[i].id;
                var wineUrl = response.recommendedWines[i].link;
                //console.log(foodUrl);
                var wineImage = $("<img>");
                wineImage.attr("src", response.recommendedWines[i].imageUrl);
                var a = $("<a>");
                a.attr("href", wineUrl);
                a.append(wineImage);
                // var aveRating = response.recommendedWines[i].averageRating;
                // var p2 = $("<p>").text("Average Rating: " + aveRating);
                var winePrice = response.recommendedWines[i].price;
                var p3 = $("<p>").html("Price: <strong>" + winePrice + "</strong>");
                wineDiv.append(p1);
                //wineDiv.append(p2);
                wineDiv.append(a);
                wineDiv.append(p3);
                
                //youtubeApiCall(foodTitle, foodDiv);

                //foodDivArray.push(foodDiv);
                $("#winesDiv").append(wineDiv);



            }


        })

        //debugger;


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