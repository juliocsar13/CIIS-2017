

$(function(){



  //var finalDate = new Date('11/13/2017 09:00')
/*
  $('#clockdiv').countdown(finalDate,function(event){
    var seconds = formatTens(event.offset.seconds);
    var minutes = formatTens(event.offset.minutes);
    var hours = formatTens(event.offset.hours);
    var days = formatTens(event.offset.totalDays);

    $('.days').text(days);
    $('.hours').text(hours);
    $('.minutes').text(minutes);
    $('.seconds').text(seconds);

  })
  */

  var flag_contactEmail = false;
  var flag_contactData = false;

  var flag_preRegisterEmail = false;
  var flag_preRegisterData = false;




  $('#contactEmail1').on('input',function(e){
    if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1){
      flag_contactEmail = true;
      if(flag_contactData) $('#submitContact1').prop('disabled', false);
    }
    else $('#submitContact1').prop('disabled', true);

  })

   $('#contactName1, #contactSubject1').on('input', function(e){

    if($(this).val().length-1 >= 0){
      flag_contactData = true;
      if (flag_contactEmail) $('#submitContact1').prop('disabled', false);

    }
    else $('#submitContact1').prop('disabled', true);
   })



  $('#submitContact1').click(function(e){

    var email = $('#contactEmail1').val();
    var name = $('#contactName1').val();
    var subject = $('#contactSubject1').val();

    var contact_form = {
      'email' : email,
      'name': name,
      'subject': 'POSTMASTER: '+subject
    }

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
          $('#contactEmail1').val('');
          $('#contactName1').val('');
          $('#contactSubject1').val('');
          self.removeChild(myImage);
          self.disabled= false;
          toastr.success("Te responderemos lo mas pronto posible  =)");
        }),
        error:(function(){
          toastr.error("Hubo un error");
        }),
        always:(function(){
          $('#contactEmail1').val('');
          $('#contactName1').val('');
          $('#contactSubject1').val('');
          self.removeChild(myImage);
          self.disabled= false;
        })
      })
    }
  })


  $('#submitPreinscripcionPostMaster').click(function(e){
    var name = $('#firstnamePostMaster').val();
    var lastname = $('#lastnamePostMaster').val();
    var institute = $('#institutoPostMaster').val();
    var email = $('#emailPostMaster').val();
    var dni = $('#dniPostMaster').val();
    var type = $('#typePostMaster').val();
    var cellphone = $('#phonePostMaster').val();
    var eventType = "POSTMASTER";

    var data= {
      'email' : email,
      'dni' : dni,
      'name': name,
      'lastname': lastname,
      'institute': institute,
      'type': type,
      'cellphone': cellphone,
      'eventType': eventType
    }
    console.log(data);

    if(email && name && lastname && type){
      var myImage = document.createElement("img");
      myImage.src = "http://chatv2.velaro.com//Inline/Images/loading.gif";
      myImage.className = 'spiningAjax';
      var self = e.currentTarget;
      self.appendChild(myImage);
      self.disabled= true;


      $.ajax({
        url: '/postmaster/preregistro',
        type: "POST",
        data:JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        success:(function(){
          $('.closebt').click();
          toastr.success("Te responderemos lo mas pronto posible  =)");
          $('#firstnamePostMaster').val('');
          $('#lastnamePostMaster').val('');
          $('#emailPostMaster').val('');
          $('#institutoPostMaster').val('');
          $('#phonePostMaster').val('');
        }),
        error:(function(){
           toastr.error("Hubo un error");

        }),
        always:(function(){
          $('#firstnamePostMaster').val('');
          $('#lastnamePostMaster').val('');
          $('#emailPostMaster').val('');
          $('#typePostMaster').val('');
          $('#phonePostMaster').val('');
          self.removeChild(myImage);
          self.disabled= false;
        })
    });
    }
  })



})
