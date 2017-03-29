
$(document).ready(function() {

    var characters = ["batman", "ironman", "superman", "wolverine"];

    var characterFullNames = ["Batman","Ironman","Superman","Wolverine"];

    var hp = [120,100,150,180];

    var damage_inflicted = [8,5,20,25];

    var characterChosen = false;

    var enemyChosen = false;

    var attackHealth;
    var defenseHealth; 
    var attackDamage; 
    var defenseDamage;

    var attackCounter = 1;

    var enemiesDefeated = 0;

    var endOfGame = false;

    var enemiesLeft = 3;

    var startGame = function(){
        for(var x = 0; x < characters.length; x++){

            var characterBtn = $("<div class='col-xs-6 col-md-3 text-center'>");

            var character_name = $("<p>");

            var img = $("<img>");     

            var health = $("<div class='health'>");

            characterBtn.addClass("character");

            characterBtn.addClass("characterAvailable");

            characterBtn.attr("value",hp[x]);

            characterBtn.attr("power",damage_inflicted[x]);

            characterBtn.attr("fullName", characterFullNames[x])

            img.attr("src","assets/images/"+characters[x]+".png");

            health.text(characterBtn.attr("value"));

            character_name.text(characterFullNames[x]);

            characterBtn.append(character_name);

            characterBtn.append(img);

            characterBtn.append(health);

            $("."+characters[x]).append(characterBtn);


        };
    };

    startGame();

    $(document).on("click", ".characterAvailable", function(event){


        if(characterChosen === false){
            $(".enemies_available").append($(".character"));
            $(".character").addClass("myEnemies");
            $(".character_chosen").append($(this));
            $(".character").removeClass("col-xs-6 col-md-3");
            $(".character").removeClass("characterAvailable");
            $(this).addClass("myCharacter");
            $(this).removeClass("myEnemies");
            $(".myEnemies").addClass("col-xs-4");
            $(".available").empty();
            characterChosen = true;
        }
    });


    $(document).on("click", ".myEnemies",function(event){

        enemiesLeft--;

        if(enemyChosen === false && characterChosen === true){
            $(".defender").append($(this));
            $(this).addClass("currentEnemy");
            $(this).removeClass("myEnemies");
            enemyChosen = true;
        }
        if(enemiesLeft == 2){
            $(this).removeClass("col-xs-4");
            $(this).addClass("col-xs-12");
            $(".myEnemies").removeClass("col-xs-4");
            $(".myEnemies").addClass("col-xs-6");
        }
        if(enemiesLeft == 1){
            $(this).removeClass("col-xs-6");
            $(this).addClass("col-xs-12");
            $(".myEnemies").removeClass("col-xs-6");
            $(".myEnemies").addClass("col-xs-12");
        }

    });

    $(document).on("click", ".attack",function(event){

        if(characterChosen === false && endOfGame === false){
            var chooseFirst = $(".chooseReminder").html(
                "<p>Choose a character first</p>"
            );
            chooseFirst.show(2000).hide(2000);
        }

        if(characterChosen === true && enemyChosen === false){
            var chooseFirst = $(".chooseReminder").html(
                "<p>Choose an enemy to attack</p>"
            );
            chooseFirst.show(2000).hide(2000);
        }

        if(characterChosen === true && enemyChosen === true){

            attackHealth = $(".myCharacter").attr("value");
            defenseHealth = $(".currentEnemy").attr("value");
            attackDamage = $(".myCharacter").attr("power")*attackCounter;
            defenseDamage = $(".currentEnemy").attr("power");
            defenseHealth = parseInt(defenseHealth) - parseInt(attackDamage);

            $(".summaryOfEvents").html(
                "<p>You attacked "+ $(".currentEnemy").attr("fullName") + " for " + attackDamage + " damage!</p>" +
                "<p>"+ $(".currentEnemy").attr("fullName") + " attacked you for " + defenseDamage + " damage!</p>"
            );

            if(defenseHealth <= 0){
                enemiesDefeated++;
                console.log(enemiesDefeated);
                if(enemiesDefeated === characters.length-1){
                    $(".summaryOfEvents").html(
                    "<p>You Won!!! GAME OVER!!! reset the game to play again.</P>");
                    characterChosen = false;
                    enemyChosen = false;
                    endOfGame = true;
                    defenseDamage = 0;
                    $(".defender").empty();
                    
                }
                else{
                    $(".summaryOfEvents").html(
                    "<p>You have defeated: " + $(".currentEnemy").attr("fullName") + "</p>");
                    enemyChosen = false;
                    $(".defender").empty();
                    defenseDamage = 0; 
                }
            }
            attackHealth = parseInt(attackHealth) - parseInt(defenseDamage);
            $(".myCharacter").attr("value",attackHealth);
            $(".currentEnemy").attr("value",defenseHealth);
            attackCounter++;
            $(".myCharacter").find(".health").html(attackHealth);
            $(".currentEnemy").find(".health").html(defenseHealth);
            if(attackHealth <= 0){
               $(".summaryOfEvents").html(
                "<p>You were defeated by: " + $(".currentEnemy").attr("fullName") + ". Press reset to play again.</p>");
                characterChosen = false;
                enemyChosen = false;
                endOfGame = true;
            }

        }

    });   

    $(".reset").on("click", function(){

        characterChosen = false;
        enemyChosen = false;
        attackCounter = 1;
        enemiesDefeated = 0;
        endOfGame = false;
        enemiesLeft = 3;
        $(".character_chosen").empty();
        $(".enemies_available").empty();
        $(".defender").empty();
        $(".summaryOfEvents").empty();
        startGame();

    });


});

 