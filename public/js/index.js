$(window).scroll( function() {
  if(window.scrollY > 100 ){
    $("#header").addClass("header__background");
    $('#logo_title').attr('src','/images/title_sm.png');
    $('#logo').width(40);
  }else{
    $("#header").removeClass("header__background");
    $('#logo_title').attr('src','/images/title.png');
    $('#logo').width(70);
  }
});
