// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, window, ExtensionContext, ViewColumn, Uri } from 'vscode';
import { getWebviewContent } from './utils/panel';

import {Parser} from './parser';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-graphql-client" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('graphql-client.request', () => {
		// The code you place here will be executed every time your command is executed
		let editor = window.activeTextEditor;
		if (!editor || !editor.document) {
			return;
		}

		// Grab text selected by user
		let selectedText: string;
		if (editor.selection.isEmpty) {
			selectedText = editor.document.getText();
		} else {
			selectedText = editor.document.getText(editor.selection);
		}

		if (selectedText === '') {
			return;
		}

		let query;
		try {
			query = Parser.parse(selectedText);
			console.log(query);
		} catch (err) {
			console.log('AHHHHHHHHHHHHHH THERE WAS AN ERROR');
			console.log(err.message);
		}
		// window.showInformationMessage(selectedText); // for debug purpose only

		// Create a panel to display the response
		let panel = window.createWebviewPanel(
			'graphqlResponse',
			'Graphql Response',
			ViewColumn.Two
		);

		// for debug purpose only
		let fakeResponse = {
			"data": {
				"hero": {
					"name": "R2-D2",
					"friends": [
						{
							"name": "Luke Skywalker"
						},
						{
							"name": "Han Solo"
						},
						{
							"name": "Leia Organa"
						}
					]
				}
			}
		};

		panel.webview.html = getWebviewContent(fakeResponse);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
