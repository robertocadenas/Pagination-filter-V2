const page  = document.querySelector('.page'); // div to append
const header = document.querySelector('.page-header') // div to append search
const studentList = document.querySelector('.student-list'); // ul to append
const studentItems = document.querySelectorAll('.student-item'); // every li, cost -- all the values available all time
const amountPage = 10;
let studentMatch = [];

function appendSearchBox() {
  //create the search box
  let div = document.createElement('div');
  div.setAttribute('class', 'student-search');
  let input = document.createElement('input');
  input.placeholder = 'Search for students...';
  let button = document.createElement('button');
  button.textContent = 'Search';
  //append to the page
  div.appendChild(input);
  div.appendChild(button);
  header.appendChild(div);
}

function activePagButtons() {
  let listButton = document.querySelectorAll('.pagination li a');
  console.log(listButton.length);
    for(let i=0; i<listButton.length; i +=1) {
      let initP = i * amountPage;
      console.log(initP);
      listButton[i].addEventListener('click', (e) => {
      createPage(initP);
        for(let i=0; i<listButton.length; i += 1) {
          if(listButton[i].hasAttribute('class')) {
            listButton[i].removeAttribute('class');
          }
        }
        e.target.setAttribute('class', 'active');
      });
    }
}

function appendPageLinks() {
  //cleaning previous page links
  if (document.querySelector('.pagination')) {
    page.querySelector('.pagination').remove();
  }
  //Calculate the number of buttons
  let amountButtons = parseInt(studentMatch.length/amountPage);
  if(studentMatch.length%amountPage > 0 && amountButtons > 1) {
    amountButtons += 1;
  }
  //Append buttons
  if(amountButtons > 1) { // with 1 we don't need pagination
    let div = document.createElement('div');
    div.setAttribute('class', 'pagination');
    let ul = document.createElement('ul');
    for ( let i = 0; i < amountButtons; i += 1) {
      let li = document.createElement('li');
      li.innerHTML = '<a href="#">' + (i+1) + '</a>'; //+1 because the pagination starts with 1, no with 0
      ul.appendChild(li);
    }
    div.appendChild(ul);
    page.appendChild(div);
    console.log(div);
  }
}

function fillStudentMatch() {
  let textToSearch = document.querySelector('.student-search input').value; // search box
  studentMatch = []; // reset the list
  textToSearch = textToSearch.toLowerCase();
  console.log(textToSearch);
  for (let i = 0; i < studentItems.length; i += 1) {
    //we need studentItems and not the html directly, because we need all the values, no only 10.
    let imgSrc = studentItems[i].getElementsByClassName('avatar')[0].src;
    let name = studentItems[i].getElementsByTagName('h3')[0].textContent;
    let email = studentItems[i].getElementsByTagName('span')[0].textContent;
    let date = studentItems[i].getElementsByClassName('date')[0].textContent;
    if(name.includes(textToSearch) || email.includes(textToSearch)) { // if textToSearch == "" its included in all
      student = {
        imgSrc: imgSrc,
        name: name,
        email: email,
        date: date
      }
      studentMatch.push(student);
    }
  }
}

function createPage(initPosition) {
  //cleaning
  while (studentList.children[0]) {
    studentList.children[0].remove();
  }
  //control no results message
  if (!studentMatch[0]) {
    let message = document.createElement('p');
    message.textContent = "There are no matches.";
    studentList.appendChild(message);
  } else {
    //Create HTML
    //control you show 10 by 10 and no exceed the items --> &&
    for (let i = initPosition; i<(initPosition+amountPage) && i<studentMatch.length; i +=1) {
      let li = document.createElement('li');
      li.setAttribute('class', 'student-item cf');
      let div = document.createElement('div');
      div.setAttribute('class', 'student-details');
      let img = document.createElement('img');
      img.setAttribute('class', 'avatar');
      img.setAttribute('src', studentMatch[i].imgSrc);
      let h3 = document.createElement('h3');
      h3.textContent = studentMatch[i].name;
      let span = document.createElement('span');
      span.setAttribute('class', 'email');
      span.textContent = studentMatch[i].email;
      let div2 = document.createElement('div');
      div2.setAttribute('class', 'joined-details');
      let span2 = document.createElement('span');
      span2.setAttribute('class', 'date');
      span2.textContent = studentMatch[i].date;
      //append to page
      studentList.appendChild(li);
      li.appendChild(div);
      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(span);
      li.appendChild(div2);
      div2.appendChild(span2);
    }
  }
}

appendSearchBox();
fillStudentMatch();
appendPageLinks();
createPage(0);
activePagButtons();

//Listening the search
let buttonSearch = document.querySelector('.student-search button'); // button search box
buttonSearch.addEventListener('click', () => {
  // load all again when the user searchs
  fillStudentMatch();
  appendPageLinks();
  createPage(0);
  activePagButtons();
});
