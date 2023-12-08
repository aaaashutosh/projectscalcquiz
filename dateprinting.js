function init() {

    $(document).ready(function() {
    
      var d = new Date();
      var folderIf = 'folder';
      var searched = false;
      var currentMonth;
      var saveMonth;
      var currentYear;
      var timesLoaded = 0;
    
    function printDates() {
      
      console.log(d)
    
    function dayOfWeek(d, m, y) {
      var monthCodes = [6,2,2,5,0,3,5,1,4,6,2,4];
      var cen = Math.floor(y/100);
      var fy = y
      y-=(100*cen);
      if (cen % 4 === 1) {
        cen = 5;
      } else if (cen % 4 === 2) {
        cen = 3;
      } else if (cen % 4 === 3) {
        cen = 1;
      } else if (cen % 4 === 0) {
        cen = 0;
      }
      if ((fy % 100 !== 0 && fy % 4 === 0) || (fy % 400 === 0)) {
        monthCodes[0] = 5;
        monthCodes[1] = 1;
      }
      var leapYears = Math.floor(y/4);
      var yCode = (leapYears+y+cen) % 7;
      var mCode = monthCodes[m-1];
      return ((yCode + mCode + d) % 7);
    }
    
      var tdate = d.getDate();
      var month = d.getMonth();
      var year = d.getFullYear();
      var datePrint = 1;
      var firstOfMonth;
      var monthBG;
      var days = document.getElementsByClassName('day');
      var leap = false;
      var daysInMonth;
      saveMonth = month;
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var bgColors = ['#66eaff', '#ff6ddf', '#dbe564', 'rgb(0,156,54)', '#ce54c2', '#05fc95', '#e8e800', '#6f0cf2', '#00d652', '#ff8e1e', '#2600af', '#ea2e2e']
    
      $('.extraweek').show();
      $('.yearshow').text(year);
    
      //leap year designation
      if (year % 4 === 0 && ((year % 100) !== 0 || Math.floor(year % 400) === 0)) {
          leap = true;
      }
    
      //reset .day css/text
      $('.day').css({'background-color': 'white', 'color': 'black'}).text('');
    
      //month text, bgcolor & date object
      for (var i = 0; i < 12; i++) {
        if (i === month) {
          monthBG = bgColors[i];
          $('.monthcenter').text(months[i]);
          firstOfMonth = dayOfWeek(1,i+1,year);
        }
      }
    
      //date printing
      if (folderIf === 'folder') {
        if (month === 3 || month === 5 || month === 8 || month === 10) {
          daysInMonth = 30;
        } else if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
          daysInMonth = 31;
        } else if (month === 1 && leap === false) {
          daysInMonth = 28;
        } else if (month === 1 && leap === true) {
          daysInMonth = 29;
        }
    
        for (var list = firstOfMonth; list < firstOfMonth + daysInMonth; list++) {
          days[list].innerHTML = datePrint;
          datePrint++;
        }
      }
    
      //banner css
      $('.month, .weekdaybg').css('background-color', monthBG);
    
      //highlight current day
      if (timesLoaded === 0 || ($('.monthcenter').text() === currentMonth && $('.yearshow').text() === currentYear)) {
      $('.day').filter(function () {
        return $(this).text() === tdate.toString();
      }).css({'background-color': monthBG, 'color': 'white'});
      }
      timesLoaded++;
    
      //make unused days grey
      $('.day').each(function() {
        if ($(this).text() === '') {
          $(this).css('background-color', '#c2c4c6');
        }
      });
    
      //hide extra row of days, if necessary
      if (!((month !== 1) && ((daysInMonth === 30 && firstOfMonth === 6) || (daysInMonth === 31 && firstOfMonth >= 5))) || (month === 1)) {
        $('.extraweek').hide();
      }
    
    }
    
      printDates();
    
      //month scrolling/searching functions
      if (folderIf === 'folder') {
    
      var currentMonth = $('.monthcenter').text();
      var currentYear = $('.yearshow').text();
    
      function scrollForward () {
        d.setMonth(saveMonth+1)
        searched = true;
          $('.outerborder').fadeOut(400);
          setTimeout(function () {
            printDates();
          }, 400);
          $('.outerborder').delay(100).fadeIn(400);
      }
    
      function scrollBack () {
        d.setMonth(saveMonth-1)
        searched = true;
        $('.outerborder').fadeOut(400);
        setTimeout(function() {
          printDates();
        }, 400);
        $('.outerborder').delay(100).fadeIn(400);
      }
    
      function searchMonth () {
        if ((parseFloat($('.iyear').val()) <= 9999) && (parseFloat($('.iyear').val()) >= 0) && (parseFloat($('.imonth').val()) <= 12) && (parseFloat($('.imonth').val()) >=1) && ((parseFloat($('.imonth').val()) + parseFloat($('.iyear').val())) % 1 === 0)) {
        var currentDay = new Date();
        d.setFullYear(parseInt($('.iyear').val()),parseInt(($('.imonth').val()))-1,currentDay.getDate())
        $('.outerborder').fadeOut(400);
    
        searched = true;
        setTimeout(function() {
          printDates();
        }, 400);
        $('.outerborder').delay(100).fadeIn(400);
        } else {
          alert('Invalid input!');
        }
      }
    
      $('.scrollforward').click(function() {
          scrollForward();
        });
      $('.scrollback').click(function() {
        scrollBack();
      });
      $('.monthsearch').click(function() {
        searchMonth();
      });
    
      //keyboard shortcuts
      document.addEventListener('keyup', function(e) {
        if (e.which === 13) {
          if ($('.imonth').is(':focus') || $('.iyear').is(':focus')) {
            searchMonth();
          }
        } else if (e.which === 37) {
          if (!($('.imonth').is(':focus') || $('.iyear').is(':focus'))) {
            scrollBack();
          }
        } else if (e.which === 39) {
          if (!($('.imonth').is(':focus') || $('.iyear').is(':focus'))) {
            scrollForward();
          }
        }
      });
    
      }
    
      });
    }
    