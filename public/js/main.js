
$(document).ready(function(){

    var colour = "-c01",
        bootstrapButton = $.fn.button.noConflict(); // return $.fn.button to previously assigned value
    $.fn.bootstrapBtn = bootstrapButton;            // give $().bootstrapBtn the bootstrap functionality
    $("input").button();

//    $("fieldset[name=bodice_choice]").buttonset();
//    $("fieldset[name=skirt_choice]").buttonset();
//    $("fieldset[name=sleeves_choice]").buttonset();
//    $("fieldset[name=trim_choice]").buttonset();
//    $("fieldset[name=effect_choice]").buttonset();

//    $.fn.btn = btn // assigns bootstrap button functionality to $.fn.btn

    $(".design_radio_option").click(function(){
        var element_type = $(this).attr("name"),
            element = $(this).val(),
            colour = $("input[name=" + element_type + "-colour]:checked").val();

//        alert("input[name=" + element_type + "-colour]:checked --- element: "+ element + " colour: " + colour);
        if(element_type) {
            $('.'+ element_type).html('<img class="pic ' + element_type + '" src="img/dress/2.2-'+ element + "-" + colour +'.png' + '" />');
        } else {
            $('.'+ element_type).html('');
        }
    });

    $(".design_radio_colour").click(function(){
//        alert("colour");
        var colour_type = $(this).attr("name"),
            colour = $(this).val(),
            element = $("input[name=" + colour_type.slice(0, -7) + "]:checked").val(),
            element_type = $("input[name=" + colour_type.slice(0, -7) + "]:checked").attr("name");

//        alert("input[name=" + element_type + "-colour]:checked --- element: "+ element + " colour: " + colour);
        if(element_type) {
            $('.'+ element_type).html('<img class="pic ' + element_type + '" src="img/dress/2.2-'+ element + "-" + colour +'.png' + '" />');
        } else {
            $('.'+ element_type).html('');
        }
    });

    // TODO - Not convinced I need colour for checkboxes
    $(".design_check_option").click(function(){
        var element_type = $(this).attr("name"),
            element = $(this).val(),
            colour = $("input[name=" + element_type + "-colour]:checked").val();

//        alert("input[name=" + element_type + "-colour]:checked --- element: "+ element + " colour: " + colour);
        if(element_type && $(this).is(":checked")) {
            $('.'+ element_type).html('<img class="pic ' + element_type + '" src="img/dress/2.2-'+ element + "-" + colour +'.png' + '" />');
        } else {
            $('.'+ element_type).html('');
        }
    });

    // TODO - Not convinced I need colour for checkboxes
    $(".design_check_colour").click(function(){
//        alert("colour");
        var colour_type = $(this).attr("name"),
            colour = $(this).val(),
            element = $("input[name=" + colour_type.slice(0, -7) + "]:checked").val(),
            element_type = $("input[name=" + colour_type.slice(0, -7) + "]:checked").attr("name");

//        alert("input[name=" + element_type + "-colour]:checked --- element: "+ element + " colour: " + colour);
        if(element_type) {
            $('.'+ element_type).html('<img class="pic ' + element_type + '" src="img/dress/2.2-'+ element + "-" + colour +'.png' + '" />');
        } else {
            $('.'+ element_type).html('');
        }
    });



    var draw_dress = function () {
        // balls to this  - I should make a dress object, with a draw method - maybe this should be in a seperate file? - maybe not
        // this method should be used to initialize the dress area with defaults
        // also to draw the review picture and review list/
        // also to draw a new page when someone has chosen a style or inspiration starting point (how to send in params?)
        // also draw a stored dress (params) or shared dress (params)
        // then need a method to store a dress..... (server side) or share (url prams...)

//        var dress_parts = ['bodice', 'skirt', 'sleeves', 'belt' , 'extras', 'sizing'];
        var dress_coloured_parts = ['bodice', 'skirt', 'sleeves', 'belt'],
            dress_other_parts = ['extras', 'sizing'],
            dress_coloured_part_vals = [],
            dress_other_part_vals = [];

        // loop through coloured parts to get vals
        // show html for coloured parts
        // loop through other parts to get vals
        // show html for other parts


        var bodice = $("input[name=bodice]:checked").val(),
            bodice_colour = $("input[name=bodice-colour]:checked").val(),
            skirt =  $("input[name=skirt]:checked").val(),
            skirt_colour =  $("input[name=skirt-colour]:checked").val(),
            sleeve =  $("input[name=sleeve]:checked").val(),
            sleeve_colour =  $("input[name=sleeve-colour]:checked").val(),
            belt =  $("input[name=belt]:checked").val(),
            belt_colour =  $("input[name=belt-colour]:checked").val(),

            extras =  $("input[name=extras]:checked").val(),
            sizing =  $("input[name=sizing]:checked").val();

        if(element_type) {
            $('.bodice').html('<img class="pic bodice" src="img/dress/2.2-' + bodice + '-' + colour +'.png' + '" />');
        } else {
            $('.'+ element_type).html('');
        }

    };

    var drawBodice = function () {

    };


//    // TODO - need to make this cope with multiple accessories gracefully (array anyone?)
//    $("input[name=belt]").click(function(){
//        var belt = $(this).attr("value"),
//            checked = $(this).is(":checked");
//
//        if(belt  && checked) {
//            $('.accessory').html('<img class="pic accessory" src="img/dress/2.2-' + belt + colour + '.png' + '" />');
//        } else {
//            $('.accessory').html('');
//        }
//        $('img.pic.accessory').effect("pulsate", {times : 3 }, 1000);
//    });

//    $("input[name=effect]").click(function(){
//
//    });

});
