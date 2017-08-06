const $page  = $('.page'); // div to append
const $header = $('.page-header') // div to append search
const $studentList = $('.student-list'); // ul to append
const $studentItems = $('.student-item'); // every li, cost -- all the values available all time
const amountPage = 10;
let $buttonSearch = $('.student-search button');
let $studentMatch = [];

function appendSearchBox() {
  let $searchDiv = $('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
  //append to the page
  $header.append($searchDiv);
   //Listening the search
  $('.student-search button').on('click', function() {
    fillStudentMatch();
    appendPageLinks();
    createPage(0);
    activePagButtons();
   });
}

function activePagButtons() {
  let $listButton = $('.pagination li a');
    for(let i=0; i<$listButton.length; i +=1) {
      let initP = i * amountPage;
      let $button = $listButton[i];
      $('.pagination li a').eq(i).on('click', function() {
        createPage(initP);
        for(let i=0; i<$listButton.length; i += 1) {
          if($listButton.eq(i).hasClass('active')) {
            $listButton.eq(i).removeClass('active');
          }
        }
        $(this).attr('class', 'active');
      });
    }
}

function appendPageLinks() {
  //cleaning previous page links
  if ($('.pagination')) {
    $('.pagination').remove();
  }
  //Calculate the number of buttons
  let amountButtons = parseInt($studentMatch.length/amountPage);
  if($studentMatch.length%amountPage > 0 && amountButtons > 1) {
    amountButtons += 1;
  }
  //Append buttons
  if(amountButtons > 1) { // with 1 we don't need pagination
    let $div = $('<div></div>').attr('class', 'pagination');
    let $ul = $('<ul></ul>');
    for ( let i = 0; i < amountButtons; i += 1) {
      let $li = $('<li></li>');
      let $a = $('<a></a>');
      $a.attr('href', '#');
      $a.text(i+1);
      $li.append($a);
      $ul.append($li);
    }
    $div.append($ul);
    $page.append($div);
  }
}

function fillStudentMatch() {
  let textToSearch = $('.student-search input').val(); // search box
  $studentMatch = []; // reset the list
  textToSearch = textToSearch.toLowerCase();
  for (let i = 0; i < $studentItems.length; i += 1) { //create the list
    console.log(i);
    let imgSrc = $studentItems.find('.avatar').eq(i)[0].currentSrc  // or  $('.avatar')[i].src;
    let name = $studentItems.find('h3').eq(i).text();  // or $('h3')[i].textContent
    let email = $studentItems.find('.email').eq(i).text();
    let date = $studentItems.find('.date').eq(i).text();
    if( name.includes(textToSearch) || email.includes(textToSearch) ) { // if textToSearch == "" its included in all
      $student = {
        imgSrc: imgSrc,
        name: name,
        email: email,
        date: date
      }
      $studentMatch.push($student);
    }
  }
}

function createPage(initPosition) {
  //cleaning
  while ($studentList.children()[0]) {
    $studentList.children().remove();
  }
  //control no results message
  if (!$studentMatch[0]) {
    let $message = $('<p></p>');
    $message.text("There are no matches.");
    $studentList.append($message);
  } else {
    //Create HTML
    //control you show 10 by 10 and no exceed the items --> &&
    for (let i = initPosition; i<(initPosition+amountPage) && i<$studentMatch.length; i +=1) {
      let $liStudent = $('<li></li>');
      $liStudent.attr('class', 'student-item cf');
      let $divStudent = $('<div></div>');
      $divStudent.attr('class', 'student-details');
      let $img = $('<img>');
      $img.attr('class', 'avatar');
      $img.attr('src', $studentMatch[i].imgSrc);
      let $h3 = $('<h3></h3>');
      $h3.text($studentMatch[i].name);
      let $span = $('<span></span>');
      $span.attr('class', 'email');
      $span.text($studentMatch[i].email);
      let $div2 = $('<div></div>');
      $div2.attr('class', 'joined-details');
      let $span2 = $('<span></span>');
      $span2.attr('class', 'date');
      $span2.text($studentMatch[i].date);
      //append to page
      $studentList.append($liStudent);
      $liStudent.append($divStudent);
      $divStudent.append($img);
      $divStudent.append($h3);
      $divStudent.append($span);
      $liStudent.append($div2);
      $div2.append($span2);
    }
  }
}
appendSearchBox();
fillStudentMatch();
appendPageLinks();
createPage(0);
activePagButtons();
