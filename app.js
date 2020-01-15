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
                message: `What is employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is employee (${i})'s email?`,
                name: "email"
            },
            {
                type: "list",
                message: `What employee (${i})'s role?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
        .then((data) => {

            // puts user data in global variables
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        // switch prompts if MANAGER
        switch (title){
            case "Manager":

                //  Manager's Office Number
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the Manager's office number?",
                        name: "officeNo"
                    }
                ])
                .then((data) => {

                    // Create new object with user data
                    const manager = new Manager(name, id, email, data.officeNo);

                    // Read and place HTML from manager.html in teamMember Variable
                    teamMember = fs.readFileSync("templates/manager.html");

                    // Add string to team HTML
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

                                //INTERN

            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school does your Intern attend?",
                        name: "school"
                    }
                ])
                .then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("templates/intern.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

                //ENGINEER

            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "github"
                    }
                ])
                .then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    teamMember = fs.readFileSync("templates/engineer.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

        } // switch case end
    } // end of loop

    