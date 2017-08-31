

$(function(){



function formatTens(n) {
    // format integers to have at least two digits
    return (n < 10) ? '0'+n : ''+n;
  }

  var finalDate = new Date('09/15/2017 09:00')

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

})

