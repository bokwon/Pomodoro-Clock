function setting(){
  $('.setting').slideToggle();
}

function swapBtns(){
  if($(event.currentTarget).attr('src') === 'img/player.png'){
    $(event.currentTarget).attr('src', 'img/stop.png');
    pPlay();
  }else{
    $(event.currentTarget).attr('src', 'img/player.png');
    pStop();
  }
}

function pStop(){
  location.reload();
}

function pPlay(){
  var pmin = Number($('.pmin').val());
  var bmin = Number($('.bmin').val());
  var totalSecs = 0;
  var mintosec = pmin*60;
  setInterval(pcountSecs, 1000);

  function pcountSecs(){
    totalSecs++;
    if(totalSecs <= mintosec){
      if(totalSecs === 60){
        $('.sec').text(pad(Math.abs(totalSecs%60)));
        $('.min').text(pad((pmin)-parseInt(totalSecs/60)));
      }else{
        $('.sec').text(pad(Math.abs(totalSecs%60-60)));
        $('.min').text(pad((pmin-1)-parseInt(totalSecs/60)));
      }
    }else if(totalSecs === mintosec+1){
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

  function pBreak(){
    playMusic();
    $('#clock').css('border', '5px solid #00FF7F');
    var totalBSecs = 0;
    var bmintosec = (bmin)*60;
    setInterval(bcountSecs, 1000);

    function bcountSecs(){
      totalBSecs++;
      if(totalBSecs <= bmintosec){
        if(totalBSecs === 60){
          $('.sec').text(pad(Math.abs(totalBSecs%60)));
          $('.min').text(pad((bmin)-parseInt(totalBSecs/60)));
        }else{
          $('.sec').text(pad(Math.abs(totalBSecs%60-60)));
          $('.min').text(pad((bmin-1)-parseInt(totalBSecs/60)));
        }
      }else{
        pStop();
      }
    }

    function playMusic(){
      var audio = new Audio("audio/beep.mp3");
      audio.play();
      return false;
    }
  }
}

$(document).ready(function(){
  $('.setting_img').click(function(){
    setting();
  })

  $('.play img').click(function(){
    swapBtns();
  })
})