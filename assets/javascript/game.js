
$(document).ready(function() {

    //this array helps me have a way to name images the same way as a unique id for each character
    var characters = ["batman", "ironman", "superman", "wolverine"];

    //I created this array in case the full names of the characters were longer or had spaces (e.g. Darth Sidius)
    var characterFullNames = ["Batman","Ironman","Superman","Wolverine"];

    var enemiesFought = [];

    var hp = [120,100,150,180];

    var damage_inflicted = [15,25,8,5];

    var characterChosen = false;

    var enemyChosen = false;

    var attackHealth;

    var defenseHealth; 

    var attackDamage; 

    var defenseDamage;

    // this counter will help deterine how powerful the next attack will be
    var attackCounter = 1;

    var enemiesDefeated = 0;

    var endOfGame = false;

    //this function creates most of the html. I did it this way in order to prevent copy pasting the same block of code in my html file
    //It is also helpful as a way to restart the game by just calling a single function 
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

            $(".hideFirst").hide();


        };
    };

    startGame();


    //choosing our character

    $(document).on("click", ".characterAvailable", function(event){

        $(".hideFirst").show();

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


    //choosing our enemy

    $(document).on("click", ".myEnemies",function(event){


        //If we have not chosen an enemy yet

        if(enemyChosen === false && characterChosen === true){
            $(".defender").append($(this));
            $(this).addClass("currentEnemy");
            $(this).removeClass("myEnemies");
            enemiesFought.push($(this).attr("fullName"));
            enemyChosen = true;
        }

        //This only helps the page determine how it should look depending on how many enemies are left
       
        if(enemiesFought.length === 1){
            $(this).removeClass("col-xs-4");
            $(this).addClass("col-xs-12");
            $(".myEnemies").removeClass("col-xs-4");
            $(".myEnemies").addClass("col-xs-6");
        }
        if(enemiesFought.length === 2){
            $(this).removeClass("col-xs-6");
            $(this).addClass("col-xs-12");
            $(".myEnemies").removeClass("col-xs-6");
            $(".myEnemies").addClass("col-xs-12");
        }

    });

    //when we click the attack button

    $(document).on("click", ".attack",function(event){

        //remind the user to pick a character if they are pressing the button too soon

        if(characterChosen === false && endOfGame === false){
            var chooseFirst = $(".chooseReminder").html(
                "<p>Choose a character first</p>"
            );
            chooseFirst.show(2000).hide(2000);
        }

        //remind the user to pick an enemy if they are pressing the button too soon

        if(characterChosen === true && enemyChosen === false){
            var chooseFirst = $(".chooseReminder").html(
                "<p>Choose an enemy to attack</p>"
            );
            chooseFirst.show(2000).hide(2000);
        }

        if(characterChosen === true && enemyChosen === true){

            //update some variables for enemy and user character
            attackHealth = $(".myCharacter").attr("value");
            defenseHealth = $(".currentEnemy").attr("value");
            attackDamage = $(".myCharacter").attr("power")*attackCounter;
            defenseDamage = $(".currentEnemy").attr("power");

            //update the enemy's health first because the user attacks first
            defenseHealth = parseInt(defenseHealth) - parseInt(attackDamage);

            //print what just happened
            $(".summaryOfEvents").html(
                "<p>You attacked "+ $(".currentEnemy").attr("fullName") + " for " + attackDamage + " damage!</p>" +
                "<p>"+ $(".currentEnemy").attr("fullName") + " attacked you for " + defenseDamage + " damage!</p>"
            );

            //if enemy is defeated
            if(defenseHealth <= 0){
                enemiesDefeated++;
                
                //if the number of enemies defeated is equal to the number of enemies at the beginning, you won! 
                //need to reset some values to keep the click events from triggering something
                if(enemiesDefeated === characters.length-1){
                    $(".summaryOfEvents").html(
                    "<p>You Won!!! GAME OVER!!! reset the game to play again.</P>");
                    characterChosen = false;
                    enemyChosen = false;
                    endOfGame = true;
                    defenseDamage = 0;
                    $(".defender").empty();
                    
                }

                //if there are more enemies left, we empty the "defender" div and make the user pick another enemy
                else{
                    $(".summaryOfEvents").html(
                    "<p>You have defeated: " + $(".currentEnemy").attr("fullName") + "</p>");
                    enemyChosen = false;
                    $(".defender").empty();
                    defenseDamage = 0; 
                }
            }

            //if the enemy was not defeated after the user's attack, the user's character's health gets decreased
            attackHealth = parseInt(attackHealth) - parseInt(defenseDamage);

            //after both attacks have happened, we update the attribute values and print them on the screen
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

    //if we click the reset button, we reset a few variables and use startGame function that was defined at the beginning

    $(".reset").on("click", function(){

        characterChosen = false;
        enemyChosen = false;
        attackCounter = 1;
        enemiesDefeated = 0;
        endOfGame = false;
        enemiesFought = [];
        $(".character_chosen").empty();
        $(".enemies_available").empty();
        $(".defender").empty();
        $(".summaryOfEvents").empty();
        startGame();

    });


});

 