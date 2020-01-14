//node packages

const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

////////////////////////////////////////////////

async function start(){
    console.log("Create your Engineering Team!");

    // variable to hold HTML
    let teamHTML = "";

    // 
    let teamSize;

    // 
    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are on your Engineering team?",
            name: "numOfTeam"
        }
    )
    .then((data) => {

        teamSize = data.numOfTeam + 1;
    });
    
    // If Team Size is 0, will end program
    if (teamSize === 0){
        console.log("You can't make a team without team members...");
        return;
    }

    // based on size 
    for(i = 1; i < teamSize; i++){

        // Global variables set
        let name;
        let id;
        let title;
        let email;

        // Questions prompted for basic employee
        await inquirer.prompt([ 
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `what the employee (${i})'s role?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
        .then((data) => {

            // Takes data from user and places value in global variables
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        
