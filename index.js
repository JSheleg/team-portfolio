const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path')
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const render = require('./src/page-template.js');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const outputDirectory = path.resolve(__dirname, "output");
const outputPath = path.join(outputDirectory, 'team.html');
const employees = [];

// const { rejects } = require('assert');
// const { resolve } = require('path/posix');



// prompts for manager information
const promptManager = () =>{
    inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the team managers name?',
        validate: nameInput => {
            if(nameInput){
                return true;
            }
            else{
                console.log("Please enter Managers Name!");
                return false;
            }
        }
    },
    {
       type: 'input',
       name: 'id',
       message: 'What is the managers id number?',
        validate: idNumber => {
            if(isNaN(idNumber)){
                console.log("Please enter the Managers ID Number!");
                return false;
            }
            else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the managers email address?',
        validate: email => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if(valid){
                return true;
            }
            else{
                console.log("Please enter a proper email!")
                return false;
            } 
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the managers office number?',
        validate: officeNumber => {
            if(isNaN(officeNumber)){
                console.log("Please enter the Managers office Number");
                return false;
            }
            else{
                return true;
            }
        }
    }     
  ])
    .then((data) => {
        const manager = new Manager(data.name,data.id,data.email,data.officeNumber)
        manager.getRole(); 
        employees.push(manager)          
    
        promptTeamMembers(employees)
    
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
                GenerateHTML(employees);
        }
    })
}
//prompt for Engineer information
const promptEngineer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team members name?',
            validate: nameInput => {
                if(nameInput){
                    return true;
                }
                else{
                    console.log("Please enter the Engineers Name!");
                    return false;
                }
            }
            
        },
        {
            type:'input',
            name: 'id',
            message: 'What is the employees id number?',
            validate: idNumber => {
                if(isNaN(idNumber)){
                    console.log("Please enter the employees ID Number!");
                    return false;
                }
                else{
                    return true;
                }
            }

        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email address?',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if(valid){
                    return true;
                }
                else{
                    console.log("Please enter a proper email!")
                    return false;
                } 
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineers github username?',
            validate: githubInput => {
                if(githubInput){
                    return true;
                }
                else{
                    console.log("Please enter the employees github username!");
                    return false;
                }
            }

        }        
    ])
    .then((data) => {
        // console.log(data);
        const engineer = new Engineer(data.name,data.id,data.email,data.github)
        engineer.getRole();
        engineer.getGithub(); 
        employees.push(engineer);
        // console.log(employees)
        
     
        promptTeamMembers(employees);
       
        
    });
}
//prompt for intern
const promptIntern = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team members name?',
            validate: nameInput => {
                if(nameInput){
                    return true;
                }
                else{
                    console.log("Please enter the Interns Name!");
                    return false;
                }
            }
        },
        {
            type:'input',
            name: 'id',
            message: 'What is the employees id number?',
            validate: idNumber => {
                if(isNaN(idNumber)){
                    console.log("Please enter the employees ID Number!");
                    return false;
                }
                else{
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email address?',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if(valid){
                    return true;
                }
                else{
                    console.log("Please enter a proper email!")
                    return false;
                } 
            }
        },
        {
            type:'input',
            name: 'school',
            message:'What school does the Intern attend?',
            validate: school => {
                if(school){
                    return true;
                }
                else{
                    console.log("Please enter the Interns school!");
                    return false;
                }
            }
        }

    ])
    .then((data) => {
        // console.log(data);
        const intern = new Intern(data.name,data.id,data.email,data.school)
        intern.getRole();
        intern.getSchool(); 
        employees.push(intern); 
        // console.log(employees);
     
        promptTeamMembers();
               
    });
    
}

promptManager();



const GenerateHTML = (employees) =>{
    // console.log(employees +" index")
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

