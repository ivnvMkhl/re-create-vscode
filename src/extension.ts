import * as vscode from 'vscode';
import path = require('path');
import { ExtensionContext, commands } from 'vscode';
import { createReactComponent } from './commands';
import { COMMANDS } from './constants';

export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand(COMMANDS.createReactComponent, createReactComponent);
    context.subscriptions.push(disposable);
}

export function deactivate() {}
