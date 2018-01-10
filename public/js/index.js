$.getJSON("./data.json", function(result){
  alert('d');
  console.log(result);
        $.each(result, function(i, field){
            $("div").append(field + " ");
        });
    });

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        smoothScroll(target);
      }
    }
  });

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

$( "#date" ).datepicker({
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
  ],
  dayNamesMin: [ "D", "L", "M", "M", "J", "V", "S" ],
  dateFormat: "dd MM yy"
});

$('#phone').mask('(000)000-0000', {placeholder: "Telefono (___)___-____"});

$('#catalog0').hide();

function smoothScroll(target){
  $('html, body').animate({
    scrollTop: target.offset().top
  }, 1000, function() {
    // Callback after animation
    // Must change focus!
    var $target = $(target);
    $target.focus();
    if ($target.is(":focus")) { // Checking if the target was focused
      return false;
    } else {
      $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
      $target.focus(); // Set focus again
    };
  });
}

function show_catalog(catalog_id){
  var catalog_info = $('#catalog_info');
  catalog_info.html('');
  //Create package section
  var catalog = $('<div id="catalog" class="catalog__shots"></div>');
    var catalog_title = $(`<h3>${catalogs_data[catalog_id].title}</h3>`);
    var catalog_packages = $('<div class="catalog__packages">');

  //Package items.
  var i = 1;
  catalogs_data[catalog_id].packages.map(function(package){
    var package_div = $('<div class="package">');
      var package_name = $(`<h4>${package.name}</h4>`);
      //Exception for food and extras section.
      var cat_extension ='';
      switch (catalog_id) {
        case 6:
          cat_extension = 'f';
        break;
        case 7:
          cat_extension = 'e';
        break;

      }
      var package_image = $(`<div ><img width="128px" src="/images/packages/${i}${cat_extension}.png" alt=""></div>`);
      var package_info = $('<ul class="package_info"></ul>');
        package.info.map(function(info){
          var info_item = $(`<li>${info}</li>`);
          package_info.append(info_item);
        });
      var package_button = $('<button type="button" name="button">Reservar</button>');

      package_div.append(package_name, [package_image, package_info, package_button]);
      catalog_packages.append(package_div);
      i++;
  });
  //Only if it has a message
  if(catalogs_data[catalog_id].message){
    var catalog_message = $(`<div>${catalogs_data[catalog_id].message}<div>`);
  }

  catalog.append(catalog_title, [catalog_packages, catalog_message]);


  catalog_info.append(catalog);

  //This part is for adjust the height of the package information base on how many items it has
  var max_height = 0;
  $('.package_info').each(function( index) {
    if( $(this).outerHeight() > max_height){
      max_height = $(this).outerHeight();
    }
  });
  $('.package_info').css('min-height',max_height);

  //Scroll to new section.
  smoothScroll($('#catalog'));

}

$('.catalog_item').hover( function() {
  $( this ).children( 'span' ).css('opacity', '1');
  }, function() {
  $( this ).children( 'span' ).css('opacity', '0');
});

$('.about__carousel').slick({
  autoplay: true,
  dots: true,
  autoplaySpeed: 2000,
});
