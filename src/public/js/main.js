


$(function(){


  //-window.onload = pre_modal;

  function pre_modal(){
    $('#pre_modal').modal('show');
  }
  $('#subscribe').prop('disabled', true);

  toastr.options = {
    "preventDuplicates": true,
    "positionClass": "toast-bottom-right",
    "closeButton": true
  //

  }




 $("#contactBtn").animatedModal({
    animatedOut:'bounceOutDown',
    color:'#00AAD4',
 });

 $("#preRegisterBtn").animatedModal({
        modalTarget:'preRegisterModal',
        animatedOut:'bounceOutUp',
        color:'#9ec32b'
      });

$(".add-participant").click(function () {
  var participant = $($(".participant-temp")[0]).clone();
  participant.removeClass("hide");
  participant.find("input").val("");
  participant.attr('required','');
  if($(".participant").length<4){
    $($(".participant")[$(".participant").length-1]).after(participant);
    $(".delete-participant").unbind('click').click(deleteParticipant)
  }
})
$("#preRegisterConcurseBtn").animatedModal({
  modalTarget:'preRegisterConcurseModal',
  animatedOut:'bounceOutUp',
  color:'#9ec32b'

})

// 
// $(".preRegisterConcurseForm").submit(function (e) {
//   e.preventDefault();
//   e.stopPropagation();
//   var data = {};
//   var participants_name = []
//   var participants_lastname = []
//   var participants_dni = []
//   for (var i = 0; i < $(".participant").length; i++) {
//     participants_name.push($($(".participant")[i]).find("[name='name']").val())
//     participants_lastname.push($($(".participant")[i]).find("[name='lastname']").val())
//     participants_dni.push($($(".participant")[i]).find("[name='DNI']").val())
//   }
//   data.team = $("[name='team']").val()
//   data.participants_name = participants_name;
//   data.participants_lastname = participants_lastname;
//   data.participants_dni = participants_dni;
//
//   $.ajax({
//     url:'/concurso',
//     type:'POST',
//     data:data,
//     success:function (res) {
//       $('.closebt').click();
//       toastr.success('Se preinscribio al concurso =)');
//     },
//     error:function (err) {
//       toastr.error('Intentelo de nuevo');
//     }
//
//   })
//   // console.log(participants);
// })
//
//
// function deleteParticipant(e) {
//   e.preventDefault();
//   $(this).parent().parent().parent().remove();
//
// }
// $(".delete-participant").click(deleteParticipant)
//   //SCRIPTS AJAX
//   $('#subscribe').click(subscribeMailChimp);




  $('#email').on('input',function(e){

    if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1) $('#subscribe').prop('disabled', false);
    else $('#subscribe').prop('disabled', true);

  })

  var flag_contactEmail = false;
  var flag_contactData = false;

  var flag_preRegisterEmail = false;
  var flag_preRegisterData = false;



  $('#contactEmail').on('input',function(e){
    if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1){
      flag_contactEmail = true;
      if(flag_contactData) $('#submitContact').prop('disabled', false);
    }
    else $('#submitContact').prop('disabled', true);

  })

   $('#contactName, #contactSubject').on('input', function(e){

    if($(this).val().length-1 >= 0){
      flag_contactData = true;
      if (flag_contactEmail) $('#submitContact').prop('disabled', false);

    }
    else $('#submitContact').prop('disabled', true);
   })


   $('#preRegisterEmail').on('input',function(e){
    if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1){
      flag_preRegisterEmail = true;
      if(flag_preRegisterData) $('#submitPreRegister').prop('disabled', false);
    }
    else $('#submitPreRegister').prop('disabled', true);

  })


    $(' #preRegisterFirstName,' +
      ' #preRegisterLastName,' +
      ' #preRegisterDNI,' +
      ' #preRegisterType,' +
      ' #preRegisterVoucher').on('input', function(e){
        //console.log('inputs',$(this));
        if($(this).val().length-1 >= 0){

          flag_preRegisterData = true;
          if (flag_preRegisterEmail) $('#submitPreRegister').prop('disabled', false);
        }
        else $('#submitPreRegister').prop('disabled', true);
    })


  $('#submitContact').click(function(e){
    var email = $('#contactEmail').val();
    var name = $('#contactName').val();
    var subject = $('#contactSubject').val();

    var contact_form = {
      'email' : email,
      'name': name,
      'subject': 'CIIS: '+subject
    }
    console.log(contact_form);
    if(email && name && subject){

      var myImage = document.createElement("img");
      myImage.src = "http://chatv2.velaro.com//Inline/Images/loading.gif";
      myImage.className = 'spiningAjax';
      var self = e.currentTarget;
      self.appendChild(myImage);
      self.disabled= true;

      $.ajax({
          url: '/contacto',
          type: "POST",
          data:JSON.stringify(contact_form),
          contentType:"application/json; charset=utf-8",
        success:(function(){
          $('.closebt').click();
          toastr.success("Te responderemos lo mas pronto posible  =)");
        }),
        error:(function(){
          toastr.error("Hubo un error");
        }),
        always:(function(){
          $('#contactEmail').val('');
          $('#contactName').val('');
          $('#contactSubject').val('');
          self.removeChild(myImage);
          self.disabled= false;
        })
      })
    }
  })



    $('#submitPreRegister').click(function(e){
    var email = $('#preRegisterEmail').val();
    var firstName = $('#preRegisterFirstName').val();
    var lastName = $('#preRegisterLastName').val();
    var dni = $('#preRegisterDNI').val();
    var type = $('#preRegisterType').val();
    var city = $('#preRegisterCity').val();
    var cellphone = $('#preRegisterCellphone').val();
    var eventType = "CIIS";

    //var image = $('#preRegisterVoucher')[0].files[0]
    //var image_val = $('#preRegisterVoucher').val();
    //var files = $('#preRegisterVoucher').get(0).files[0];
   var formData = new FormData();

    //var photo = document.getElementById("preRegisterVoucher");
    //var image = photo.files[0];

    //var form = document.getElementById('preRegisterForm')
    //var form = $('preRegisterForm')[0];

    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dni', dni);
    formData.append('type', type);
    formData.append('city', city);
    formData.append('cellphone', cellphone);

    //formData.append('image', new Blob([JSON.stringify(files)]),{type:'application/json'});



    var data = {
      'email': formData.get("email"),
      'name': formData.get("firstName"),
      'lastname': formData.get("lastName"),
      'dni': formData.get("dni"),
      'type': formData.get("type"),
      'city': formData.get("city"),
      'cellphone': formData.get("cellphone"),
      'eventType':eventType

      //image:{
      //      'name':files.name,
       //     'size':files.size,
       //     'type':files.type
      //},
      //images:formData.get('image')
    };

    //if(email && firstName && lastName && dni && type && city && image_val){

    //if(email && firstName && lastName && dni && type && city){

    if(email && firstName && lastName && dni && type && city){
      var myImage = document.createElement("img");
      myImage.src = "http://chatv2.velaro.com//Inline/Images/loading.gif";
      myImage.className = 'spiningAjax';
      var self = e.currentTarget;
      self.appendChild(myImage);
      self.disabled= true;


        $.ajax({
          url: '/preregistro',
          type: "POST",
          data:JSON.stringify(data),
          contentType:"application/json; charset=utf-8",

        //}).success(function(){
          //console.log("EMAIL DE ENVIO",email)
            //return subscribeMailChimpEmail(email)

          success:(function(){
            //-console.log('success')
            $('.closebt').click();
            $('#preRegisterEmail').val('');
            $('#preRegisterFirstName').val('');
            $('#preRegisterLastName').val('');
            $('#preRegisterDNI').val('');
            $('#preRegisterCity').val('');
            $('#preRegisterCellphone').val('');
            toastr.success("Gracias por preinscribirte =)");
          }),
          error:(function(){

            toastr.error("Hubo un error");
          }),
          always:(function(){
            $('#preRegisterEmail').val('');
            $('#preRegisterFirstName').val('');
            $('#preRegisterLastName').val('');
            $('#preRegisterDNI').val('');
            $('#preRegisterType').val('');
            $('#preRegisterCity').val('');
            $('#preRegisterCellphone').val('');
            self.removeChild(myImage);
            self.disabled= false;
          })
        });

      }
      else{
        toastr.error("Llene todos los campos");
      }
    })
  function subscribeMailChimp(e){
    var email = $('#email');
    if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1) $('#subscribe').prop('disabled', false);
    $.post('/mailchimp/listas/ceef9aabad/suscribir',{email: email.val()})
      .done(function(data){
        toastr.success('Gracias por suscribirte, te informaremos por correo cualquier novedad', 'Genial!')

      })
      .fail(function(err){
        toastr.error('Hubo un error en la petición, intente nuevamente', 'Error!')
      })
    }

    function subscribeMailChimpEmail(email){

      return $.post('/mailchimp/listas/ceef9aabad/suscribir',{email: email});
    }

  //INIT MEDIA PLAYER
  $('video,audio').mediaelementplayer();

  function formatTens(n) {
    return (n < 10) ? '0'+n : ''+n;
  }

  var finalDate = new Date('11/13/2017 09:00')

  $('#countdown').countdown(finalDate,function(event){
    var seconds = formatTens(event.offset.seconds);
    var minutes = formatTens(event.offset.minutes);
    var hours = formatTens(event.offset.hours);
    var days = formatTens(event.offset.totalDays);

    $('#days').text(days);
    $('#hours').text(hours);
    $('#minutes').text(minutes);
    $('#seconds').text(seconds);

  })

  //INIT MAPS
  google.maps.event.addDomListener(window, 'load', init);
  var coordenadas=new google.maps.LatLng(-18.025352, -70.249157);


  function init() {

    var myOptions = {
        scrollwheel: false,
        zoom: 15,
        center: coordenadas,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // styles:
        //       [
        //           {
        //               "featureType": "landscape",
        //               "stylers": [
        //                               {
        //                                   "saturation": -100
        //                               },
        //                               {
        //                                   "lightness": 65
        //                               },
        //                               {
        //                                   "visibility": "on"
        //                               }
        //                           ]
        //           },
        //           {
        //               "featureType": "poi",
        //               "stylers": [
        //                               {
        //                                   "saturation": -100
        //                               },
        //                               {
        //                                   "lightness": 51
        //                               },
        //                               {
        //                                   "visibility": "simplified"
        //                               }
        //                           ]
        //           },
        //           {
        //               "featureType": "road.highway",
        //               "stylers": [
        //                               {
        //                                   "saturation": -100
        //                               },
        //                               {
        //                                   "visibility": "simplified"
        //                               }
        //                           ]
        //           },
        //           {
        //               "featureType": "road.arterial",
        //               "stylers": [
        //                               {
        //                                   "saturation": -100
        //                               },
        //                               {
        //                                   "lightness": 30
        //                               },
        //                               {
        //                                   "visibility": "on"
        //                               }
        //                            ]
        //           },
        //           {
        //               "featureType": "road.local",
        //               "stylers": [
        //                               {
        //                                   "saturation": -100
        //                               },
        //                               {
        //                                   "lightness": 40
        //                               },
        //                               {
        //                                   "visibility": "on"
        //                               }
        //                           ]
        //           },
        //           {
        //               "featureType": "transit",
        //               "stylers": [
        //                               {
        //                                   "saturation": -100
        //                               },
        //                               {
        //                                   "visibility": "simplified"
        //                               }
        //                           ]
        //           },
        //           {
        //               "featureType": "administrative.province",
        //               "stylers": [
        //                               {
        //                                   "visibility": "off"
        //                               }
        //                           ]
        //           },
        //           {
        //               "featureType": "water",
        //               "elementType": "labels",
        //               "stylers": [
        //                               {
        //                                   "visibility": "on"
        //                               },
        //                               {
        //                                   "lightness": -25
        //                               },
        //                               {
        //                                   "saturation": -100
        //                               }
        //                           ]
        //           },
        //           {
        //               "featureType": "water",
        //               "elementType": "geometry",
        //               "stylers": [
        //                               {
        //                                   "hue": "#ffff00"
        //                               },
        //                               {
        //                                   "lightness": -25
        //                               },
        //                               {
        //                                   "saturation": -97
        //                               }
        //                           ]
        //           }
        //       ]
    };

    var map = new google.maps.Map(document.getElementById('map'), myOptions);

    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map,
      //icon:'images/ciis.png',
      title:"CIIS",
      animation: google.maps.Animation.DROP
    });
  };
})
