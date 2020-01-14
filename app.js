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
