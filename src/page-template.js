
const employees = require('../index.js')

// console.log(employees + " page-template")
const buildTeam = (team) => {
    const teamArray = [];
    // console.log('top of buildteam', team)

    //create Manager card
    const generateManager = (manager) =>{
        console.log(manager, ' gen manager func')
        return `
        <div class="card bg-primary shadow p-1 mx-2 my-2" style="width: 18rem;">
            <div class="card-header text-white">
                <h3>${manager.name} </h3>
                <h4> <i class="fas fa-coffee"></i>  Manager</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${manager.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
                <li class="list-group-item">Office Number: ${manager.officeNumber}</li>
            </ul>
        </div>
    `;
    };
    
    //create Engineer Card
    const generateEngineer = (engineer) => {
        return `
        <div class="card bg-primary shadow p-1 mx-2 my-2" style="width: 18rem;">
            <div class="card-header text-white">
                <h3>${engineer.name}</h3>
                <h4><i class="fas fa-glasses"></i>  Engineer</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${engineer.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
                <li class="list-group-item">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></li>
            </ul>
        </div>
    `;
    };
    
    //create Intern Card
    const generateIntern = (intern) => {
        return `

        <div class="card bg-primary shadow p-1 mx-2 my-2" style="width: 18rem;">
            <div class="card-header text-white">
                <h3>${intern.name}</h3>
                <h4><i class="fas fa-user-graduate"></i>  Intern</h4>
            </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${intern.id}</li>
                    <li class="list-group-item"> Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
                    <li class="list-group-item"> School: ${intern.school}</li>
                </ul>
            </div>
        </div>
    `;
    };

    const manager = team.filter(employee => employee.getRole()=== 'Manager')
    console.log(manager, 'filter')

    teamArray.push(manager.map(x => generateManager(x)))
    console.log(teamArray, "team array")

    const engineer = team.filter(employee => employee.getRole()=== 'Engineer')
    teamArray.push(engineer.map(x => generateEngineer(x)))

    const intern = team.filter(employee => employee.getRole()=== 'Intern')
    teamArray.push(intern.map(x => generateIntern(x)))


   console.log(teamArray);
    return teamArray;
}
   module.exports = team => { 
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Team Portfolio</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
        <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <div class="container-lg flex-row justify-space-between text-align-center py-3">
                <h1 class="page-title text-light bg-danger py-2 px-3 text-center ">My Team</h1>
            </div>
        </header>
        <main class="container-fluid d-inline-flex p-2 flex-wrap mxy-5 col-12 justify-content-center ml-auto ">
             ${buildTeam(team)}
        </main>
    </body>
    </html>
    `;
   }

    







