function setting(){
  $('.setting').slideToggle();
}

function swapBtns(){
  if($(event.currentTarget).attr('src') === 'img/player2.png'){
    $(event.currentTarget).attr('src', 'img/stop.png');
    pPlay();
  }else{
    $(event.currentTarget).attr('src', 'img/player2.png');
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
      $('.sec').text(pad(totalSecs%60));
      $('.min').text(pad(pmin-parseInt(totalSecs/60)));
    }
    else {
      pBreak();
      return false;
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
    $('#clock').css('border', '5px solid #00FF7F');
    var totalBSecs = 0;
    var bmintosec = bmin*60;
    setInterval(bcountSecs, 1000);

    function bcountSecs(){
     totalBSecs++;
      if(totalBSecs <= bmintosec){
        $('.sec').text(pad(totalBSecs%60));
        $('.min').text(pad(bmin-parseInt(totalBSecs/60)));
      }else{
        pStop();
      }
    }

    // function playMusic(){
    //   var audio = new Audio("audio/beep21.mp3");
    //   audio.play();
    // }
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