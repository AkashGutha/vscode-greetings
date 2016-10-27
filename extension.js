// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let unirest = require('unirest');

let greetings = {
    "greets": [
        "Hello Coder!", "Hello Programmer!", "Hello Geek!", "Hello TechGeek!",
        "Hello Coder!"
    ],
    "wishes": [
        "Have a great day ahead.", "Have a wonderful day.", "Happy programming.",
        "Have a marvelous day."
    ]
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let greet = vscode.commands.registerCommand('extension.greet', function () {
        // The code you place here will be executed every time your command is
        // executed

        let content = "";

        // These code snippets use an open-source library. http://unirest.io/nodejs
        if (hostReachable()) {
            unirest
                .post(
                "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
                .header(
                "X-Mashape-Key",
                "lNzJ60W1wfmshdbNCHarQVa2yOzYp1GCICRjsnsIhFM5zUuokz")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept", "application/json")
                .end(function (result) {
                    if (typeof result.error === 'object') {
                        content = getRandom();
                    } else
                        content = JSON.parse(result.body).quote;

                });
        } else {
            content = getRandom();
            setStatusBarItem(content);
        }


    });

    context.subscriptions.push(greet);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


// set status bar item
function setStatusBarItem(content) {
    let item =
        vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -100);
    item.text = content + '   $(sync)';
    item.show();
}
// get random content
function getRandom() {
    let randomGreet = Math.floor(Math.random() * greetings.greets.length);
    let randomWish = Math.floor(Math.random() * greetings.wishes.length);
    return randomGreet + " " + randomWish;
}

// check for internet connection.
function hostReachable() {
    require('dns').resolve('www.google.com', function (err) {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
}