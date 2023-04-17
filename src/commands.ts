import * as vscode from 'vscode';
import { Uri, window, workspace } from 'vscode';
import { normalizePath, buildPath } from './utils';
import { getComponentTemplate } from './templates';
import { mkdir, writeFile } from 'fs/promises';
import { PROPERTIES } from './constants';

const createReactComponent = async (contextSelection: Uri, p: { fsPath: string }) => {
    try {
        if (!contextSelection) {
            throw new Error('Context path error');
        }

        const componentName = await getComponentName();
        const { createCssFile, cssModulesPrefix, importReact } = getPropersties();
        const contextPath = normalizePath(contextSelection);
        const { folderPath, componentpath, cssPath } = buildPath(contextPath, componentName, cssModulesPrefix);
        const componentTemplate = getComponentTemplate(componentName, importReact, cssModulesPrefix);

        await mkdir(folderPath);
        await Promise.all([
            writeFile(componentpath, componentTemplate),
            createCssFile && writeFile(cssPath, new Uint8Array([])),
        ]);

        window.showInformationMessage(`Component ${componentName} created successfully!`);
    } catch (err: any) {
        window.showInformationMessage(err.message);
    }
};

const getPropersties = () => {
    const { get } = workspace.getConfiguration();

    return {
        createCssFile: get<boolean>(PROPERTIES.createCssFile),
        cssModulesPrefix: get<string>(PROPERTIES.cssModulesPrefix),
        importReact: get<boolean>(PROPERTIES.importReact),
    };
};

const getComponentName = async () => {
    const componentName = await window.showInputBox({ prompt: 'Component name: ' });

    if (!componentName || !componentName.length) {
        throw new Error('Component name error');
    }

    return componentName;
};

export { createReactComponent };
