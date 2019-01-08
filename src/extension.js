const vscode = require('vscode');
const utils = require('./utils');
const GithubApi = require('./githubapi');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "github-viewer" is now active!');
	
	let githubApi = new GithubApi(null);

	let disposable = vscode.commands.registerCommand('extension.getRepo', function () {
		vscode.window.showInputBox({
			prompt: 'GitHub Address'
		}).then(async function (address) {
			try {
				let args = utils.parseArgsFromGithubUrl(address);
				let contents = await githubApi.callApi('contents', args);
				vscode.window.showInformationMessage(contents);
			} catch (error) {
				console.error(error);
			}
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}