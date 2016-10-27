// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let unirest = require('unirest');
let fs = require('fs');

let greetings = {
    "greets": [
        "Hello Coder!",
        "Hello Programmer!",
        "Hello Geek!",
        "Hello TechGeek!",
        "Hello Coder!"
    ],
    "wishes": [
        "Have a great day ahead.",
        "Have a wonderful day.",
        "Happy programming.",
        "Have a marvelous day."
    ]
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    let greet = vscode.commands.registerCommand('extension.greet', function () {
        // The code you place here will be executed every time your command is executed

        let randomGreet = Math.floor(Math.random() * greetings.greets.length);
        let randomWish = Math.floor(Math.random() * greetings.wishes.length);

        // These code snippets use an open-source library. http://unirest.io/nodejs
        unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
            .header("X-Mashape-Key", "lNzJ60W1wfmshdbNCHarQVa2yOzYp1GCICRjsnsIhFM5zUuokz")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .header("Accept", "application/json")
            .end(function (result) {
                if (typeof result.error === 'object')
                    console.log('errored');
                else
                    console.log(result);
                console.log(result.status, result.headers, result.body);
                vscode.window.showInformationMessage(result.body);
            });

        const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        item.text = '${content} ' + '$(sync)';
        item.show();
    });

    context.subscriptions.push(greet);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {

}
exports.deactivate = deactivate;