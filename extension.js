// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let fs = require('fs');


let greetings = JSON.parse(fs.readFile('./json/greetings.json', function (error) {
    console.log(error);
}));

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    let greetFunction = vscode.commands.registerCommand('extension.greet', function () {
        // The code you place here will be executed every time your command is executed
        let randomGreet = Math.floor(Math.random() * greetings.greets.length);
        let randomWish = Math.floor(Math.random() * greetings.wishes.length);
        // Display a message box to the user
        vscode.window.showInformationMessage(randomGreet + ' ' + randomWish);
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(greetFunction);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {

}
exports.deactivate = deactivate;