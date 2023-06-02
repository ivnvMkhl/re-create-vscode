import * as vscode from 'vscode';
import { Uri, window, workspace } from 'vscode';
import { normalizePath, buildPath, parseComponentTemplate } from './utils';
import { mkdir, writeFile } from 'fs/promises';
import { PROPERTIES } from './constants';

type Properties = {
    [PROPERTIES.createCssFile]: boolean | undefined;
    [PROPERTIES.componentExtension]: string | undefined;
    [PROPERTIES.componentTemplate]: string[] | undefined;
};

const createReactComponent = async (contextSelection: Uri, p: { fsPath: string }) => {
    try {
        if (!contextSelection) {
            throw new Error('Context path error');
        }

        const componentName = await getComponentName();
        const properties = [PROPERTIES.createCssFile, PROPERTIES.componentExtension, PROPERTIES.componentTemplate];
        const { createCssFile, componentExtension, componentTemplate } = getPropersties<Properties>(properties);
        const contextPath = normalizePath(contextSelection);

        if (!componentTemplate) {
            throw new Error('Component template error');
        }

        const { componentContent, cssModulesPrefix } = parseComponentTemplate(componentTemplate, componentName);
        const { folderPath, componentpath, cssPath } = buildPath(
            contextPath,
            componentName,
            cssModulesPrefix,
            componentExtension,
        );

        await mkdir(folderPath);
        await Promise.all([
            writeFile(componentpath, componentContent),
            createCssFile && writeFile(cssPath, new Uint8Array([])),
        ]);

        window.showInformationMessage(`Component ${componentName} created successfully!`);
    } catch (err: any) {
        window.showInformationMessage(err.message);
    }
};

const getPropersties = <T = Record<string, any>>(propertiesKeys: string[]): T => {
    const { get } = workspace.getConfiguration();

    return propertiesKeys.reduce((acc, propName) => {
        return { ...acc, [propName]: get(`re-create.${propName}`) };
    }, {} as T);
};

const getComponentName = async () => {
    const componentName = await window.showInputBox({ prompt: 'Component name: ' });

    if (!componentName || !componentName.length) {
        throw new Error('Component name error');
    }

    return componentName;
};

export { createReactComponent };
