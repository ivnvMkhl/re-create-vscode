import * as vscode from 'vscode';
import { Uri, window } from 'vscode';
import { normalizePath } from './utils';
import { getComponentTemplate } from './templates';
import { mkdir, writeFile } from 'fs/promises';

const createReactComponent = async (contextSelection: Uri, p: { fsPath: string }) => {
    try {
        if (!contextSelection) {
            throw new Error('context path error');
        }

        const componentName = await window.showInputBox({ prompt: 'Component name: ' });

        if (!componentName || !componentName.length) {
            throw new Error('component name error');
        }

        const workspaceConfiguration = vscode.workspace.getConfiguration();
        const createCssFile = workspaceConfiguration.get<boolean>('re-create.createCssFile');
        const useModuleCss = workspaceConfiguration.get<boolean>('re-create.useCssModules');
        const importReact = workspaceConfiguration.get<boolean>('re-create.importReact');

        const contextPath = normalizePath(contextSelection);
        const newComponentFolderUri = `${contextPath}${componentName}`;
        const newComponentUri = `${contextPath}${componentName}/${componentName}.tsx`;
        const componentTemplate = getComponentTemplate(componentName, importReact);

        await mkdir(newComponentFolderUri);
        await writeFile(newComponentUri, componentTemplate);

        if (createCssFile) {
            const newStyleUri = useModuleCss
                ? `${contextPath}${componentName}/${componentName}.module.css`
                : `${contextPath}${componentName}/${componentName}.css`;
            await writeFile(newStyleUri, new Uint8Array([]));
        }

        window.showInformationMessage(`Component ${componentName} created successfully!`);
    } catch (err: any) {
        window.showInformationMessage(err.message);
    }
};

export { createReactComponent };
