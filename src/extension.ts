import * as vscode from 'vscode';
import * as fs from 'fs';
import * as i18n from 'vscode-nls-i18n';
import * as regUtils from './regUtils';

// Set to a local folder to use a dev environment.
// Set to null to use the 'webview' folder.
const baseDebugReactUiPath: string | null =
	//String.raw`C:\Users\User\Desktop\vscode_regedit_react_ui\build`;
	null;

export function activate(context: vscode.ExtensionContext) {
	i18n.init(context.extensionPath);

	context.subscriptions.push(
		vscode.commands.registerCommand('regedit.start', () => {
			RegeditPanel.create(context.extensionUri);
		})
	);

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event.
		vscode.window.registerWebviewPanelSerializer(RegeditPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				//console.log(`Got state: ${state}`);
				RegeditPanel.revive(webviewPanel, context.extensionUri);
			}
		});
	}
}

/**
 * Manages regedit webview panels.
 */
class RegeditPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static readonly viewType = 'regedit';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	public static create(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		const localResourceRoots = [vscode.Uri.joinPath(extensionUri, 'webview')];
		if (baseDebugReactUiPath) {
			localResourceRoots.push(vscode.Uri.file(baseDebugReactUiPath));
		}

		// Create a new panel.
		const panel = vscode.window.createWebviewPanel(
			RegeditPanel.viewType,
			i18n.localize('extensionName'),
			column || vscode.ViewColumn.One,
			{
				// Enable javascript in the webview.
				enableScripts: true,

				// And restrict the webview to only loading content from our extension's `webview` directory.
				localResourceRoots
			}
		);

		new RegeditPanel(panel, extensionUri);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		new RegeditPanel(panel, extensionUri);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content and icon.
		this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);
		this._panel.iconPath = {
			light: vscode.Uri.joinPath(extensionUri, 'assets', 'tab-icon-black.svg'),
			dark: vscode.Uri.joinPath(extensionUri, 'assets', 'tab-icon-white.svg')
		};

		// Listen for when the panel is disposed.
		// This happens when the user closes the panel or when the panel is closed programatically.
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview.
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						break;

					case 'setTitle':
						this._panel.title = message.title + ' - ' + i18n.localize('extensionName');
						break;

					case 'getKeyTreeAndValues':
						{
							let retrievedKey = null;
							let tree = null;
							let values = null;
							try {
								const { retrievedKey: k, tree: t } = regUtils.getKeyTree(message.key);
								retrievedKey = k;
								tree = t;

								values = regUtils.getKeyValues(retrievedKey);
							} catch (e) {
								vscode.window.showErrorMessage(e.message);
							}

							this._panel.webview.postMessage({
								command: 'setKeyTreeAndValues',
								key: message.key,
								retrievedKey: retrievedKey || '',
								tree: tree || [],
								values: values || []
							});
						}
						break;

					case 'getSubKeys':
						{
							let subKeys = null;
							try {
								subKeys = regUtils.getSubKeys(message.key);
							} catch (e) {
								vscode.window.showErrorMessage(e.message);
							}

							this._panel.webview.postMessage({
								command: 'setSubKeys',
								key: message.key,
								subKeys: subKeys || []
							});
						}
						break;

					case 'createKey':
						try {
							regUtils.createKey(message.key);
							this._panel.webview.postMessage({
								command: 'createKeyDone',
								key: message.key
							});
						} catch (e) {
							vscode.window.showErrorMessage(e.message);
						}
						break;

					case 'renameKey':
						try {
							regUtils.renameKey(message.key, message.newSubKey);
							this._panel.webview.postMessage({
								command: 'renameKeyDone',
								key: message.key,
								newSubKey: message.newSubKey
							});
						} catch (e) {
							vscode.window.showErrorMessage(e.message);
						}
						break;

					case 'deleteKey':
						try {
							const existed = regUtils.deleteTree(message.key);
							this._panel.webview.postMessage({
								command: 'deleteKeyDone',
								key: message.key
							});

							if (!existed) {
								vscode.window.showErrorMessage('Key no longer exists, removed from tree');
							}
						} catch (e) {
							vscode.window.showErrorMessage(e.message);
						}
						break;

					case 'getKeyValues':
						{
							let values = null;
							try {
								values = regUtils.getKeyValues(message.key);
							} catch (e) {
								vscode.window.showErrorMessage(e.message);
							}

							this._panel.webview.postMessage({
								command: 'setKeyValues',
								key: message.key,
								values: values || []
							});
						}
						break;

					case 'renameValue':
						try {
							regUtils.renameValue(
								message.key, message.oldName, message.newName);
							this._panel.webview.postMessage({
								command: 'renameValueDone',
								key: message.key,
								oldName: message.oldName,
								newName: message.newName
							});
						} catch (e) {
							vscode.window.showErrorMessage(e.message);
						}
						break;

					case 'setValueData':
						try {
							const newData = regUtils.setValueData(
								message.key, message.name, message.type, message.data);
							this._panel.webview.postMessage({
								command: 'setValueDataDone',
								key: message.key,
								name: message.name,
								newData
							});
						} catch (e) {
							vscode.window.showErrorMessage(e.message);
						}
						break;

					case 'createValue':
						try {
							const newData = regUtils.createValue(
								message.key, message.name, message.type, message.data);
							this._panel.webview.postMessage({
								command: 'createValueDone',
								key: message.key,
								name: message.name,
								type: message.type,
								data: newData
							});
						} catch (e) {
							vscode.window.showErrorMessage(e.message);
						}
						break;

					case 'deleteValue':
						try {
							const existed = regUtils.deleteValue(
								message.key, message.name);
							this._panel.webview.postMessage({
								command: 'deleteValueDone',
								key: message.key,
								name: message.name
							});

							if (!existed) {
								vscode.window.showErrorMessage('Value no longer exists, removed from list');
							}
						} catch (e) {
							vscode.window.showErrorMessage(e.message);
						}
						break;
				}
			},
			null,
			this._disposables
		);
	}

	public dispose() {
		// Clean up our resources.
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const webviewPathOnDisk = baseDebugReactUiPath
			? vscode.Uri.file(baseDebugReactUiPath)
			: vscode.Uri.joinPath(this._extensionUri, 'webview');

		const baseWebviewUri = webview.asWebviewUri(webviewPathOnDisk);
		let html = fs.readFileSync(vscode.Uri.joinPath(webviewPathOnDisk, 'index.html').fsPath, 'utf8');

		html = html.replace('<head>', `<head>
			<base href="${baseWebviewUri.toString()}/">
			<meta http-equiv="Content-Security-Policy"
				content="default-src 'none'; style-src 'unsafe-inline' ${webview.cspSource}; img-src ${webview.cspSource}; script-src ${webview.cspSource}; connect-src ${webview.cspSource};">
		`);

		const locale = JSON.parse(process.env.VSCODE_NLS_CONFIG ?? '{}').locale;
		if (locale) {
			html = html.replace('<body>', `<body data-locale="${locale}">`);
		}

		return html;
	}
}
