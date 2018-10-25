$(document).ready(function(){

  // MODAL
  var modalText = {
    standapp: {
      title: 'StandApp',
      tag: 'SOCIAL MEDIA PLATFORM.',
      detail: 'StandApp provides users a platform to record their audio only performances to then share with the world for feedback. Being built as a mobile-app, entirely with React JS and Redux on the frontend, and AWS S3 services on the backend, StandApp is able allow users to get rid of the concept of stage-fright by taking away the stage.  Think Americas Got Talent without the stage.',
      link: 'https://www.standapp.live'
    },
    airbnb: {
      title: 'Airbnb Template ',
      tag: 'Self-created template utilizing HTML5 & CSS3',
      detail: 'My self-created airbnb website template demonstrates my ability to create a responsive homepage for companies who want to catch the user interest with a modern look/approach.',
      link: 'https://www.kevin-young.us/airbnb-template'
    },
    SGT: {
      title: 'Student Grade Table',
      tag: 'FULL-STACK STUDENT GRADE TRACKING SYSTEM.',
      detail: 'A Content Management System (CMS) that allows users to search, create, read, and delete student grade information from a MySQL database. As a full-stack web application that utilizes PHP calls to access the customized MySQL tables, SGT utilizes CRON to regularly scrub data to protect from hackers and profanity. A search bar is also implemented to easily narrow the student list down based off student name, course, and grade.',
      link: 'https://www.kevin-young.us/SGT'
    },
    whack: {
      title: 'Whack-A-Mole',
      tag: 'Real-Time Whack-a-mole game.',
      detail: 'Whack-A-Mole is a React based desktop/mobile game, utlizing animations, to give the user a real-time experience.',
      link: 'http://whack-a-mole.kevin-young.us'
    },
    audiovisualizer: {
      title: 'Audio Visualizer',
      tag: 'Loadable/Real-time audio visualizer.',
      detail: 'The Audio Visualizer brings any .mp3 file to life with the use of Canvas and .mp3 uploads.',
      link: 'https://www.kevin-young.us/audio-visualizer'
    },
    drumkit: {
      title: 'Drum Kit',
      tag: 'Interactive Freestyle Drum-Kit',
      detail: 'The Drum Kit creates a real-time drum kit, allowing the user to create their own sounds with the use of the keyboard or mouse.',
      link: 'https://www.kevin-young.us/drum-kit'
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('#gallery .mod').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close, .mask').on('click', function(){
    $('.modal-wrap').removeClass('visible');
  });

  $(window).on('resize', function(event) {
    // if (this.innerWidth < 735) {
      slideWidth = this.innerWidth;
      slideWidth = slideWidth * .75;
      setDimensions();
    // }
  });

// CLOSE MODAL ONCLICK OUTSIDE MODAL
  // $(document).click(function(event) {
  //   //if you click on anything except the modal itself or the "open modal" link, close the modal
  //   if (!$(event.target).closest(".modal").length) {
  //     $("body").find('.modal-wrap, .modal, #modal .button').removeClass("visible");
  //   }
  // });
  // CLOSE MODAL ONCLICK OUTSIDE MODAL



  

  var carousel = $('#carousel'),
      slideWidth = $(window).innerWidth() * .75,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.slide').css({
                                      'width': slideWidth,
    });
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: '90%',
        // marginTop: '.5%',
        backgroundRepeat: 'no-repeat'

      });
              
    });
  }
})
