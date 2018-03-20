$(document).ready(function(){ 
  /*SideNav*/
    $(".button-collapse").sideNav();
   // $("ul#slide-out").addClass('fixed hide-on-med-and-down');
    if($(window).width() <= 992){
      $("ul#slide-out").removeClass('fixed hide-on-med-and-down');
    }
  
   /*profile*/
   $('input#input_text, textarea#textarea1').characterCounter();


  /*Chatbot*/
    $(".mychatbot").click(function(){
      if($(this).css("transform") == "none"){
          $(this).css("transform","rotate(225deg)");
      }else{
          $(this).css("transform","");
      }
      $("#mychatbot").toggle();
    });

    $("#close").click(function(){
      $("#mychatbot").hide();
    });

});
