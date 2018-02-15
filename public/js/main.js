$(document).ready(function(){
  /**Chatbot**/
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
  /**!Chatbot end**/
});
