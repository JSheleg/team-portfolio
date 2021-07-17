const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path')
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const employees = [];
const render = require('./src/page-template.js');
const outputDirectory = path.resolve(__dirname, "output");
const outputPath = path.join(outputDirectory, 'team.html');
// const { rejects } = require('assert');
// const { resolve } = require('path/posix');



// prompts for manager information
const promptManager = () =>{
    inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the team managers name?'
    },
    {
       type: 'input',
       name: 'id',
       message: 'What is the managers id number?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the managers email address?'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the managers office number?'
    },     
  ])
    .then((data) => {
        console.log(data);
        const manager = new Manager(data.name,data.id,data.email,data.officeNumber)
        manager.getRole() 
        employees.push(manager)  
        console.log(employees);
    
        
        promptTeamMembers()
    
    });
}

//prompts for additional team members information
const promptTeamMembers = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employees',
            message: 'Which employee would you like to add next?',
            choices: ['Engineer','Intern', 'None']  
        
        }
    ])
    .then(userSelect=>{
        switch(userSelect.employees){
            case 'Engineer':
                promptEngineer();
                break;
            case 'Intern':
                promptIntern();
                break;
            default:
                console.log(employees)
                console.log('generate html')
                GenerateHTML();
        }
    })
}
//prompt for Engineer information
const promptEngineer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team members name?'
            
        },
        {
            type:'input',
            name: 'id',
            message: 'What is the employees id number?'

        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email address?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineers github username?'

        }        
    ])
    .then((data) => {
        console.log(data);
        const engineer = new Engineer(data.name,data.id,data.email,data.github)
        engineer.getRole();
        engineer.getGithub(); 
        employees.push(engineer);
        console.log(employees);
     
        promptTeamMembers();
       
        
    });
}
//prompt for intern
const promptIntern = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team members name?'
        },
        {
            type:'input',
            name: 'id',
            message: 'What is the employees id number?'

        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email address?'
        },
        {
            type:'input',
            name: 'school',
            message:'What school does the Intern attend?'
        }

    ])
    .then((data) => {
        console.log(data);
        const intern = new Intern(data.name,data.id,data.email,data.school)
        intern.getRole();
        intern.getSchool(); 
        employees.push(intern); 
        console.log(employees);
     
        promptTeamMembers();
               
    });
    
}

promptManager();

const GenerateHTML = (employees) =>{
    if(!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory)
    }
    fs.writeFileSync(outputPath, render(employees),"utf-8",err =>{
        if(err){
            rejects(err);
            return;
        }
        resolve({
            ok:true,
            message:'File created!'
        });
    });
}

