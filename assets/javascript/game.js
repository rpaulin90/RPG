
$(document).ready(function() {

    var characters = ["obi", "luke", "sidius", "maul"];

    var characterFullNames = ["Obi-Wan","Luke Skywalker","Darth-Sidius","Darth-Maul"];

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

    var startGame = function(){
        for(var x = 0; x < characters.length; x++){

            var characterBtn = $("<div>");

            var character_name = $("<p>");

            var img = $("<img>");     

            var health = $("<div class='health'>");

            characterBtn.addClass("character");

            characterBtn.addClass("characterAvailable");

            characterBtn.attr("value",hp[x]);

            characterBtn.attr("power",damage_inflicted[x]);

            characterBtn.attr("fullName", characterFullNames[x])

            img.attr("src");

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
            $(".character").removeClass("characterAvailable");
            $(this).addClass("myCharacter");
            $(this).removeClass("myEnemies");
            $(".available").empty();
            characterChosen = true;
        }
    });


    $(document).on("click", ".myEnemies",function(event){

        if(enemyChosen === false && characterChosen === true){
            $(".defender").append($(this));
            $(this).addClass("currentEnemy");
            $(this).removeClass("myEnemies");
            enemyChosen = true;
        }
    });

    $(document).on("click", ".attack",function(event){

        if(characterChosen === false){
            var chooseFirst = $(".chooseReminder").html(
                "<p>Choose a character first</p>"
            );
            chooseFirst.show(1000).hide(1000);
        }

        if(characterChosen === true && enemyChosen === false){
            var chooseFirst = $(".chooseReminder").html(
                "<p>Choose an enemy to attack</p>"
            );
            chooseFirst.show(1000).hide(1000);
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
                    alert("you won! game will restart");
                    characterChosen = false;
                    enemyChosen = false;
                    attackCounter = 1;
                    enemiesDefeated = 0;
                    defenseDamage = 0;
                    $(".character_chosen").empty();
                    $(".enemies_available").empty();
                    $(".defender").empty();
                    $(".summaryOfEvents").empty();
                    startGame();
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
               // $(".summaryOfEvents").html(
               //  "<p>You were defeated by: " + $(".currentEnemy").attr("fullName") + "</p>");
                characterChosen = false;
                enemyChosen = false;
                attackCounter = 1;
                enemiesDefeated = 0;
                $(".character_chosen").empty();
                $(".enemies_available").empty();
                $(".defender").empty();
                startGame();
            }

        }

    });   


});

 // var characters = ["obi", "luke", "sidius", "maul"];

    // // var characterFullNames = ["Obi-Wan","Luke Skywalker","Darth-Sidius","Darth-Maul"];

    // // var hp = [120,100,150,180];

    // // var damage_inflicted = [8,5,20,25];

    // var characterChosen = false;

    // var enemyChosen = false;

    // $(".health").text($(".character").attr("value"));


    // $(".characterAvailable").on("click", function(event){


    //     if(characterChosen === false){
    //         $(".enemies_available").append($(".character"));
    //         $(".character_chosen").append($(this));
    //         $(".character").removeClass("characterAvailable");
    //         $(".character").addClass("myEnemies");
    //         $(this).addClass("myCharacter");
    //         $(this).removeClass("myEnemies");
    //         characterChosen = true;
    //     }

    // });


    // $(document).on("click", ".myEnemies",function(event){

    //     if(enemyChosen === false && characterChosen === true){
    //         $(".defender").append($(this));
    //         $(this).addClass("currentEnemy");
    //         $(this).removeClass("myEnemies");
    //         enemyChosen = true;
    //     }
    // });

    

    // $(".attack").on("click", function(event){

    //     if(enemyChosen === true){

    //         var attackHealth = $(".myCharacter").attr("value");
    //         var defenseHealth = $(".currentEnemy").attr("value");
    //         var attackDamage = $(".myCharacter").attr("power");
    //         var defenseDamage = $(".currentEnemy").attr("power");
            
    //         attackHealth = parseInt(attackHealth) - parseInt(defenseDamage);
    //         defenseHealth = parseInt(defenseHealth) - parseInt(attackDamage);

    //         $(".myCharacter").find(".health").text(attackHealth);
    //         $(".currentEnemy").find(".health").text(defenseHealth);
    //     }

    // })   