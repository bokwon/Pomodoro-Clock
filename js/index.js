//TODO
//What happens if setting is changed while pomodoro clock is running?

var pMin,
    bMin,
    totalSecs = 0,
    totalBSecs = 0,
    bmintosec,
    minToSec,
    handle;


function swapBtns(){
  if($(event.currentTarget).attr('src') === 'img/player.png'){
    $(event.currentTarget).attr('src', 'img/stop.png');
    Play();
  }else{
    $(event.currentTarget).attr('src', 'img/player.png');
    Stop();
  }
}

function Stop(){
  var newPomodoro = $('.pmin').val();
  var newBreak = $('.bmin').val();

  $('.pmin').val(newPomodoro);
  $('.bmin').val(newBreak);

  $('.min').text(pad(newPomodoro));
  $('.sec').text('00');
  clearInterval(handle);

}

function Play() {
  totalSecs = 0;
  totalBSecs = 0;
  pMin = Number($('.pmin').val());
  bMin = Number($('.bmin').val());
  minToSec = pMin * 60;
  handle = setInterval(pcountSecs, 1000);
}

function pcountSecs() {
  totalSecs++;
  if(totalSecs <= minToSec) {
    if (totalSecs % 60 === 0) {
      $('.sec').text(pad(Math.abs(totalSecs % 60)));
      $('.min').text(pad((pMin) - parseInt(totalSecs / 60)));
    } else {
      $('.sec').text(pad(Math.abs(totalSecs % 60 - 60)));
      $('.min').text(pad((pMin - 1) - parseInt(totalSecs / 60)));
    }
  }else if (totalSecs === minToSec + 1) {
    pBreak();
  }
}


function pad(val){
  var valString = val + "";
  if(valString.length < 2){
    return "0" + valString;
  }
  else
  {
    return valString;
  }
}

function pBreak() {
  playMusic();
  $('#clock').css('border', '5px solid #4CA64C');
  totalBSecs = 0;
  bmintosec = bMin * 60;
  setInterval(bcountSecs, 1000);
}

function bcountSecs(){
  totalBSecs++;
  if(totalBSecs <= bmintosec){
    if(totalBSecs % 60 === 0){
      $('.sec').text(pad(Math.abs(totalBSecs % 60)));
      $('.min').text(pad((bMin) - parseInt(totalBSecs / 60)));
    }else{
      $('.sec').text(pad(Math.abs(totalBSecs % 60 - 60)));
      $('.min').text(pad((bMin - 1) - parseInt(totalBSecs / 60)));
    }
  }else{
    Stop();
  }
}

function playMusic(){
  var audio = new Audio("audio/beep.mp3");
  audio.play();
  return false;
}

$(document).ready(function(){
  $('.setting_img').click(function(){
    $('.setting').slideToggle("fast", function(){
      $('input[name="pomodoro"]').select();
    });
  });

  $('#pomodoro_setup').on('submit', function(e){
    e.preventDefault();
    var newPomodoro = $('.pmin').val();
    var newBreak = $('.bmin').val();

    $('.pmin').val(newPomodoro);
    $('.bmin').val(newBreak);

    $('.min').text(pad(newPomodoro));
    $('.setting').slideUp();

  });

  $('.play img').click(function(){
    swapBtns();
  });
});