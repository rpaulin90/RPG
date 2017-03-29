
$(document).ready(function() {

    var characters = ["obi", "luke", "sidius", "maul"];

    var characterFullNames = ["Obi-Wan","Luke Skywalker","Darth-Sidius","Darth-Maul"];

    var hp = [120,100,150,180];

    var characterChosen = false;

    var enemyChosen = false;

    var startGame = function(){
        for(var x = 0; x < characters.length; x++){

            var characterBtn = $("<div>");

            var character_name = $("<p>");

            var img = $("<img>");     

            var health = $("<div>");

            characterBtn.addClass("character");

            characterBtn.addClass("characterAvailable");

            characterBtn.attr("value",hp[x])

            img.attr("src");

            health.text(hp[x]);

            character_name.text(characterFullNames[x]);

            characterBtn.append(character_name);

            characterBtn.append(img);

            characterBtn.append(health);

            $("."+characters[x]).append(characterBtn);


        };
    };

    startGame();

    $(".characterAvailable").on("click", function(event){


        if(characterChosen === false){
            $(".enemies_available").append($(".character"));
            $(".character").addClass("myEnemies");
            $(".character_chosen").append($(this));
            $(".character").removeClass("characterAvailable");
            $(this).addClass("myCharacter");
            $(this).removeClass("myEnemies");
            $(".available").hide();
            characterChosen = true;
        }

        $(".myEnemies").on("click", function(event){

            console.log("you clicked on myEnemies");

            if(enemyChosen === false && characterChosen === true){
                $(".defender").append($(this));
                $(this).addClass("currentEnemy");
                $(this).removeClass("myEnemies");
                enemyChosen = true;
            }

        });


    });


});
