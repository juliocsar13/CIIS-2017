

$(function(){



  $('#submitContact1').click(function(e){
    var email = $('#contactEmail1').val();
    var name = $('#contactName1').val();
    var subject = $('#contactSubject1').val();

    var contact_form = {
      email : email,
      name: name,
      subject: subject
    }
    console.log("hola",contact_form)

    if(email && name && subject){
      var myImage = document.createElement("img");
      myImage.src = "http://chatv2.velaro.com//Inline/Images/loading.gif";
      myImage.className = 'spiningAjax';
      var self = e.currentTarget;
      self.appendChild(myImage);
      self.disabled= true;


      $.post('/contacto',contact_form)
        .success(function(){
          $('.closebt').click();
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



})

