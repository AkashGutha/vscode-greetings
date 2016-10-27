// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let unirest = require('unirest');

/*let greetings = JSON.parse(fs.readFile('./json/greetings.json', function (error) {
    console.log(error);
}));*/

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    let greet = vscode.commands.registerCommand('extension.greet', function () {
        // The code you place here will be executed every time your command is executed

        // These code snippets use an open-source library. http://unirest.io/nodejs
        unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
            .header("X-Mashape-Key", "lNzJ60W1wfmshdbNCHarQVa2yOzYp1GCICRjsnsIhFM5zUuokz")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .header("Accept", "application/json")
            .end(function (result) {
                console.log(result);
                console.log(result.status, result.headers, result.body);
                vscode.window.showInformationMessage(result.body);
            });

        const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
        item.text = 'akash';
        item.show();

        //let randomGreet = Math.floor(Math.random() * greetings.greets.length);
        //let randomWish = Math.floor(Math.random() * greetings.wishes.length);

    });

    context.subscriptions.push(greet);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {

}
exports.deactivate = deactivate;