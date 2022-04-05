const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const {
    writeFile, copyFile
} = require('./src/page-gen');
const generateManager = require('./src/template');

const employeeInformation = [];


const promptUser = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'managerName',
            message: 'Type manager Name (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please type the name of the manager...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerEmployeeId',
            message: 'Type manager ID (Required)',
            validate: employeeIdInput => {
                if (employeeIdInput) {
                    return true;
                } else {
                    console.log('Please enter the Manager ID...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'Provide an email for the Manager (Required)',
            validate: managerEmailInput => {
                if (managerEmailInput) {
                    return true;
                } else {
                    console.log('Please provide an email...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: 'Provide phone number for manager (Required)',
            validate: managerNumberInput => {
                if (managerNumberInput) {
                    return true;
                } else {
                    console.log('Please provide a phone number...');
                    return false;
                }
            }
        },
    ]).then(managerInfo => {

        let manager = new Manager(managerInfo.managerName, managerInfo.managerEmployeeId, managerInfo.managerEmail, managerInfo.managerOfficeNumber)
        employeeInformation.push(manager);
    })
};


const promptMenu = () => {

    return inquirer.prompt([{
        type: 'checkbox',
        name: 'menu',
        message: 'Would you like to do anything else?',
        choices: ['Add Engineer', 'Add Intern', 'Finish']
    }]).then(options => {

        if (options.menu[0] === 'Add an Engineer') {
            return promptEngineer();
        };

        if (options.menu[0] === 'Add an Intern') {
            return promptIntern();
        };
        if (options.menu[0] === 'Finish') {
            console.log('Completed Team')
            return promptFinishedTeam();
        };
    })

};


promptEngineer = async () => {
    const engineerInfo = await inquirer.prompt([{
        type: 'input',
        name: 'engineerName',
        message: 'Provide a name for the engineer',
        validate: engineerNameInput_1 => {
            if (engineerNameInput_1) {
                return true;
            } else {
                console.log('Please provide a name');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'engineerId',
        message: 'Provide engineer ID',
        validate: engineerIdInput_1 => {
            if (engineerIdInput_1) {
                return true;
            } else {
                console.log('Please provide engineer ID...');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'Provide engineer email',
        validate: engineerEmailInput_1 => {
            if (engineerEmailInput_1) {
                return true;
            } else {
                console.log('Please provide engineer email...');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'engineerGit',
        message: 'Provide GitHub username for the engineer',
        validate: engineerGitInput_1 => {
            if (engineerGitInput_1) {
                return true;
            } else {
                console.log('Please provide a username...');
                return false;
            }
        }
    },]);
    let engineer = new Engineer(engineerInfo.engineerName, engineerInfo.engineerId, engineerInfo.engineerEmail, engineerInfo.engineerGit);
    employeeInformation.push(engineer);
    const result = undefined;
    return promptMenu(result);
};

promptIntern = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'internName',
            message: 'Provide intern name',
            validate: internNameInput => {
                if (internNameInput) {
                    return true;
                } else {
                    console.log('Please provide a name...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internId',
            message: 'Provide intern ID',
            validate: internIdInput => {
                if (internIdInput) {
                    return true;
                } else {
                    console.log('Please provide an ID...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'Provide intern email',
            validate: internEmailInput => {
                if (internEmailInput) {
                    return true;
                } else {
                    console.log('Please provide intern email...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'Provide intern school',
            validate: internSchoolInput => {
                if (internSchoolInput) {
                    return true;
                } else {
                    console.log('Please provide school name...');
                    return false;
                }
            }
        }
    ]).then(internInfo => {
        let intern = new Intern(internInfo.internName, internInfo.internId, internInfo.internEmail, internInfo.internSchool)
        employeeInformation.push(intern);
        console.log(intern);
    }).then(promptMenu)
};

promptFinishedTeam = () => {
    let generateHtmlPage = generateManager(employeeInformation)
    writeFile(generateHtmlPage);
};

promptUser()
    .then(promptMenu)