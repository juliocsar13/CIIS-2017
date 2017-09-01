

$(function(){



  $('#submitContact1').click(function(e){
    var email = $('#contactEmail1').val();
    var name = $('#contactName1').val();
    var subject = $('#contactSubject1').val();

    var contact_form = {
      'email' : email,
      'name': name,
      'subject': 'POSTMASTER: '+subject
    }
    alert(contact_form);

    if(email && name && subject){
      var myImage = document.createElement("img");
      myImage.src = "http://chatv2.velaro.com//Inline/Images/loading.gif";
      myImage.className = 'spiningAjax';
      var self = e.currentTarget;
      self.appendChild(myImage);
      self.disabled= true;


      $.post('/contacto',contact_form)
        .success(function(){
          alert('succes');
          toastr.success("Te responderemos lo mas pronto posible  =)");

        })
        .error(function(){
          toastr.error("Hubo un error");
        })
        .always(function(){
          $('#contactEmail').val('');
          $('#contactName1').val('');
          $('#contactSubject1').val('');
          self.removeChild(myImage);
          self.disabled= false;
        })
    }
  })


  $('#submitPreinscripcionPostMaster').click(function(e){
    var name = $('#firstnamePostMaster').val();
    var lastname = $('#lastnamePostMaster').val();
    var institute = $('#institutoPostMaster').val();
    var email = $('#emailPostMaster').val();
    var type = $('#typePostMaster').val();
    var cellphone = $('#phonePostMaster').val();
    var eventType = "POSTMASTER";

    var data= {
      'email' : email,
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
