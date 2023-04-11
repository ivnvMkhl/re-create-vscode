import { ExtensionContext, commands } from 'vscode';
import { createReactComponent } from './commands';

export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand('re-create.createReactComponent', createReactComponent);
    context.subscriptions.push(disposable);
}

export function deactivate() {}
