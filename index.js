const emp = require("./lib/Employee.js");
const man = require("./lib/Manager.js");
const eng = require("./lib/Engineer.js");
const intern = require("./lib/Intern.js");
const inquirer = require("inquirer");

const fs=require("fs");
const parse = require('node-html-parser').parse;


var EMPLOYEES=[];

const questions_1=[
  {
    type: 'input',
    name: 'name',
    message: 'What is team manager"s name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is team manager"s employee ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is team manager"s email address?',
  },
  {
    type: 'input',
    name: 'number',
    message: 'What is team manager"s office number?',
  },
  {
    type: 'confirm',
    name: 'quit',
    message: 'Do you want to Quit Program?',
  },

];
const questions_2=[
  {
    type: 'list',
    name: 'emChoice',
    message: 'Do you want to add an Engineer or Intern?',
    choices: ['Engineer','Intern'],
  },
];
const questions_3=[

  {
    type: 'input',
    name: 'name',
    message: 'What is employee"s name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is employee"s ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is employee"s email address?',
  },
  {
    type: 'input',
    name: 'username',
    message: 'What is employee"s Github username?',
  },
  {
    type: 'confirm',
    name: 'quit',
    message: 'Do you want to Quit Program?',
  },
];
const questions_4=[

  {
    type: 'input',
    name: 'name',
    message: 'What is employee"s name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is employee"s ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is employee"s email address?',
  },
  {
    type: 'input',
    name: 'school',
    message: 'What is employee"s school?',
  },
  {
    type: 'confirm',
    name: 'quit',
    message: 'Do you want to Quit Program?',
  },


];


function getAnswers1() {

   return inquirer.prompt(questions_1).then((data1) => {
    
    EMPLOYEES.push(new man(data1.name,data1.id,data1.email,data1.number));
    if(data1.quit){
      generateHTML();
      return;
    }
    else {
      getAnswers2();
    }
  });
}

function getAnswers2(){
    return inquirer.prompt(questions_2).then((data2) => {   
      if(data2.emChoice=='Engineer')
        getAnswers3();
      else
        getAnswers4();
    });
}

function getAnswers3() {

  return inquirer.prompt(questions_3).then((data3) => {
   EMPLOYEES.push(new eng(data3.name,data3.id,data3.email,data3.username));
   if(data3.quit){
     generateHTML();
     return;
   }
   else {
     getAnswers2();
   }
 });
}

function getAnswers4() {

  return inquirer.prompt(questions_4).then((data4) => {
   EMPLOYEES.push(new intern(data4.name,data4.id,data4.email,data4.school));
   if(data4.quit){
     generateHTML();
     return;
   }
   else {
     getAnswers2();
   }
 });
}

function generateHTML() {

  //Basic HTML
  
  const basicHTML=
  `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Profile</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <header>
          <nav class="navbar">
              <section class="navbar-nav bg-danger text-light py-4 text-center w-100" >My Team</section>
          </nav>
      </header>
      <main>
          <section class="container">
            <section class="row justify-content-center">
            
            </section>
          </section>
      </main>
    </body>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    </html>`;


   //Write the HTML to a file  
   fs.writeFileSync('./dist/index.html',basicHTML);

  //Appending cards to each html

  fs.readFile('./dist/index.html','utf-8',(err,html)=> {
    if(err) {
        throw err;
    }
    const root=parse(html);

    var El=root.querySelector(".justify-content-center");

    

    for(var i=0;i<EMPLOYEES.length;i++){

   //checks if object is a Manager object

        if(EMPLOYEES[i].constructor.name==='Manager') {
  
            
          El.insertAdjacentHTML("afterbegin",
                `<section class="col-3 mt-4">
                    <section class="card bg-light">

                        <section class="card-header text-white bg-primary ">
                            <h5>${EMPLOYEES[i].name}</h5>
                            <h6><i class="fas fa-mug-hot">: </i>Manager</h6>
                        </section>

                        <section class="card-body">

                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${EMPLOYEES[i].id} </li>
                            <li class="list-group-item">Email: <a href="mailto:${EMPLOYEES[i].email}">${EMPLOYEES[i].email}</a></li>
                            <li class="list-group-item">Office Number: ${EMPLOYEES[i].officeNumber}</li>
                          </ul>

                        </section>

                    </section>
                  </section>`
                );
            
          }

    else if (EMPLOYEES[i].constructor.name==='Engineer') {

        El.insertAdjacentHTML("beforeend",
                  `<section class="col-3 mt-4">
                    <section class="card bg-light ">

                        <section class="card-header text-white bg-primary">
                            <h5>${EMPLOYEES[i].name}</h5>
                            <h6><i class="fas fa-glasses">: </i>Engineer</h6>
                        </section>

                        <section class="card-body">

                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${EMPLOYEES[i].id}</li>
                            <li class="list-group-item">Email: <a href="mailto:${EMPLOYEES[i].email}">${EMPLOYEES[i].email}</a></li>
                            <li class="list-group-item">GitHub:<a href="http://www.github.com/${EMPLOYEES[i].github}" target="_blank">${EMPLOYEES[i].github}</a></li>
                          </ul>

                        </section>
                    </section>
                  </section>`
          );
      }
    else {
        El.insertAdjacentHTML("beforeend",
                  `<section class="col-3 mt-4">
                    <section class="card bg-light">

                        <section class="card-header text-white bg-primary">
                            <h5>${EMPLOYEES[i].name}</h5>
                            <h6><i class="fas fa-user-graduate">: </i>Intern</h6>
                        </section>

                        <section class="card-body">

                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${EMPLOYEES[i].id}</li>
                            <li class="list-group-item">Email: <a href="mailto:${EMPLOYEES[i].email}">${EMPLOYEES[i].email}</a></li>
                            <li class="list-group-item">School: ${EMPLOYEES[i].school}</li>
                          </ul>
                    
                        </section>

                    </section>
                  </section>`
          );
       }
    }

    fs.writeFileSync('./dist/index.html',root.toString());

  })



  
};

//Main

getAnswers1();

