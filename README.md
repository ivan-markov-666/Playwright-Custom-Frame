# Introduction 
This project is a custom Playwright frame using the Jest.  
The framework supports TS languages.  

# Precondition
Please make sure you read the Playwright documentation, which is here: https://playwright.dev.  
Because Playwright is using Jest by default (and we are using Jest in this frame) - it will be good to cover this documentation, too: https://jestjs.io/.  
Playwright uses node.js, so it would be good to have a basic knowledge of it: https://nodejs.org/en/.  
If you have any questions, please refer to the original documentation. This framework doesn't have anything unique. It uses technologies that are combined with working together. Please review their official documentation if you have any questions about the technologies.  

# Getting Started
Please follow the steps to set up the project:  

### Installation process
1. Clone the repository.  
2. If you don't have Node.js - download and install it: https://nodejs.org/en/ . The LTS version should be OK.  
3. Open the project from your IDE. The IDE should have installed TypeScript. We prefer to use Visual Studio Code - which comes with installed TypeScript.  
4. Navigate to the project root folder from the terminal.  
5. Get all dependencies:  
> npm install  
6. To start the Playwright test runner, execute the following command in the root folder of the project:  
> npx playwright test {testName.spec.ts}
- If you are using VSCode IDE, you can install the following extension For easy execution of the tests (locally):  
-- https://marketplace.visualstudio.com/items?itemName=ortoni.ortoni  
-- https://marketplace.visualstudio.com/items?itemName=mskelton.playwright-test-snippets  
- If you see some error related to the browser, maybe you need to execute the following command in the terminal into the root folder of the project:  
> npx Playwright install    
7. If there is a new version of Playwright, you can update it by normal behavior.  
8. Read the readme.md file to understand how to use the framework.  
10. Enjoy and automate with pleasure!  

# Build and Test  
To develop new tests:  
1. Make sure that you read the Playwright's documentation carefully. It would help if you knew how to create tests with Playwright.  
2. In this frame, we are using a POM design pattern. You must create a PO class in the "pom/" folder. For more details, you can see comments inside "page-object-model-examples". It would be best to create the PO classes like in example one.  
3. Create a spec class in the "tests/" folder. For more details, you can see comments in the examples. It would be best to create the SPEC classes like in example one.  
4. Before starting the tests, you must change the 'testDir' value from 'playwright.config.ts' to your test folder. For example, if your tests are inside '{root}/tests/my-tests', you should set the 'testDir' value to this relative location. Example "testDir: './tests/my-tests'".  
5. You can start the tests by executing the following command in the terminal:  
> npx playwright test {testName.spec.ts}
For example, if your test class is named "myTestClass.spec.ts", the command will look like "npx playwright test myTestClass.spec.ts".  

Make sure you execute the command at the root of the project folder.  

# What you should review:
Make sure that you cover those classes. Read the comments inside, and you will learn the framework:  
- See the "scripts" area from the "package.json". You can see the available commands for running the tests if you don't mind.  
- Every test folder has each config class. All classes with the name *.config.ts contain configurations for tests. "playwright.config.ts" is the default config class for Playwright.  
- Review class and comments inside the ./baseClass/baseClass.ts class.  
- Review class and comments inside the ./configs/Configuration.ts class.
- Review class and comments inside the ./custom-methods/**/*.ts classes.  
- Review class and comments inside the ./pom/**/*.po.ts  classes.
- Review class and comments inside the ./tests/**/*.spec.ts  classes.

# What this framework contains
Because this is a custom framework - the following section shows what was added to the frame and how the automation QAs can use it.  
If you have questions about the technologies, please refer to the official documentation for the technology used.  

### Custom Methods (Domain-Specific Language):
Two folders are inside the "{root}/custom-methods/".  
In "other-methods," all custom TS functions are placed.  
In "domain-specific-language", - are placed all functions used for Domain-Specific Language (DSL). DSL functions are just a combination of custom Playwright commands. For example, this can be:  
- Selecting an element and verifying that the element is visible and not disabled.  
- Send some text string to input the text element and verify that the text is there (verify that the text was sent).  
- Navigate to the URL and verify that the loaded URL is the same as the one used.  
- etc.  
More about what is DSL you can find here: https://en.wikipedia.org/wiki/Domain-specific_language .  

### Installed Packages:  
A few packages have been added to the frame. Please take a look at the official documentation for installation and usage.   
1. faker-js/faker: https://www.npmjs.com/package/@faker-js/faker .  
2. grep.js: https://www.npmjs.com/package/grep .  

### Design Patterns:
The frame uses a POM design pattern.  

### Test Suites:
The framework can run multiple tests grouped in different suites. For more details review: https://playwright.dev/docs/test-annotations  
1. First, you need to add an annotation inside the name of your test. For example, if you want to group smoke tests, add "@smoke" to the name of your test block.  
2. Second, execute the following command inside the terminal:
> npx playwright test --grep smoke

Please take a look at the examples for more details.  
Don't forget to add your test folder to the "playwright.config.ts" file if needed.  

### Configuration:
There is a configuration class. You can find it in the "{root}/configs/configuration.ts".  

### Reports:
Use Playwright default report: https://playwright.dev/docs/test-reporters  

### Data-Driven Testing:
For now, we can read data from JSON files. Please take a look at the examples for more details. You can add the JSON files to the "{root}/fixtures" folder.  
We will add a mechanism for reading testing data from the EXCEL file in the future.

### Uploads:
Sometimes, we will need to upload files, and there is a folder where we can put those files. The folder is located in "{root}/uploads". Of course, you can use any other folder inside your storage.  

### Log:
The frame has error logs, alert logs, and information logs.  
The logs can be turned on and off from the config class.  
- The automation will show the error log if something is wrong with the execution of a function (if the operation fails for some reason).  
- The automation will show the alert log if the executed function does not cover something.
- The automation will show the information log whenever we pass some function.  

### Colorize the log:
Because reading log data from the terminal is not easy, you can use three methods to colorize the log from the "{root}/custom-methods/other-methods/tsMethods.ts" class. The methods are: "informLog()", "alertLog()" and "errorLog()".  
Разбира се! Ето по-кратък и ясен текст, който можеш да добавиш в `README.md` файла за секцията за дебъгване:

### Debugging
This project supports debugging via Visual Studio Code. To use the debugging features, follow these simple steps:
1. Open the project in VS Code.
2. Navigate to the Run and Debug section by clicking the play icon in the sidebar or pressing `Ctrl+Shift+D` (Windows/Linux) or `Cmd+Shift+D` (MacOS).
3. Select a debug configuration from the dropdown menu corresponding to the script you want to debug from the `package.json` file.
4. Start the debugging session by clicking the green play button or pressing `F5`.
These steps will allow you to effectively debug the scripts configured in the `.vscode/launch.json` file.

### Environment
The project uses the `dotenv` package to manage environment variables. To set up environment variables, follow these steps:  
1. Rename the Create a new file named `.env-example` located in the project's root directory to `.env`.
2. Fill with your environment variables in the `.env` file.  
Hint: Because this framework is mainly created for educational purposes, you can use the following environment variables:
```
DEMOQA_URL="demoqa.com/"
DEMOQA_PROTOCOL="https"
DEMOQA_USERNAME="testUser"
DEMOQA_PASSWORD="TestingPassword123!@#"
```

### Ide Extensions:
If you are using VSCode, there are a few excellent extensions that you need to install. With them, working with Playwright is much easier.  
Playwright Test for VScode: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright  
Playwright Runner: https://marketplace.visualstudio.com/items?itemName=ortoni.ortoni  
Playwright Trace Viewer for VScode: https://marketplace.visualstudio.com/items?itemName=ryanrosello-og.playwright-vscode-trace-viewer  
PlayWright/Cypress Step Definition Generator: https://marketplace.visualstudio.com/items?itemName=RajUppadhyay.playwritecypress-steps-definition-generator  

### Debugging:
If you are using VSCode, you can debug the tests using the plugin 'Playwright Test for VScode' mechanism. Just check the plugin documentation.

### Software dependencies
NodeJS will download the dependencies automatically.  
Faker-js is added to generate dynamic data for testing purposes.  
Official repository: https://github.com/faker-js/faker   
Official documentation: https://fakerjsdocs.netlify.app/  
Grep.js is added too.  
Official repository: https://www.npmjs.com/package/grep  
Dotenv is added to read the environment variables.
Official repository: https://www.npmjs.com/package/dotenv

### To Do:
The frame could be better. That's why a to-do list is located in "{root}/toDo/toDo.txt".  
Inside the file, you can see what we need to add or what issues we need to fix.

# Contribute
You can use the framework for free and make changes to it. The frame will save a lot of time.
