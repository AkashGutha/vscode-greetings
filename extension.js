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
        require('dns').resolve('www.google.com', function (err) {
            if (err) {
                content = getRandom();
                // setStatusBarItem(content);
                vscode.window.setStatusBarMessage(content, 30000);
            } else
                unirest
                    .post(
                    "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
                    .header(
                    "X-Mashape-Key",
                    "lNzJ60W1wfmshdbNCHarQVa2yOzYp1GCICRjsnsIhFM5zUuokz")
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .header("Accept", "application/json")
                    .end(function (result) {
                        if (typeof result.error === 'object')
                            content = getRandom();
                        else
                            content = JSON.parse(result.body).quote;
                        // setStatusBarItem(content);
                        vscode.window.setStatusBarMessage(content, 30000);
                    });
        });

        context.subscriptions.push(greet);
    });
}  
  exports.activate = activate;

  // this method is called when your extension is deactivated
  function deactivate() {}
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
    let randomGreet =
        greetings.greets[Math.floor(Math.random() * greetings.greets.length)];
    let randomWish =
        greetings.wishes[Math.floor(Math.random() * greetings.wishes.length)];
    return randomGreet + " " + randomWish;
  }