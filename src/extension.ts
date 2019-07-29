// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, window, ExtensionContext, ViewColumn, Uri } from 'vscode';
import { getWebviewContent } from './utils/panel';
import { getResponse } from './utils/request';

import { Parser } from './parser';
import { GraphqlRequest } from './models/GraphqlRequest';

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

		// Define the query/mutation as a GraphqlRequest
		let req: GraphqlRequest;
		try {
			req = Parser.parse(selectedText);
		} catch (err) {
			window.showErrorMessage(err.message);
			return;
		}

		// Create a panel to display the response
		let panel = window.createWebviewPanel(
			'graphqlResponse',
			'Graphql Response',
			ViewColumn.Two
		);

		// Display response/error from endpoint
		getResponse(req)
			.then(res => panel.webview.html = getWebviewContent(res.data))
			.catch(err => window.showErrorMessage(err.message));
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
