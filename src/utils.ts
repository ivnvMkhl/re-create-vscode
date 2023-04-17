import { Uri } from 'vscode';

const normalizePath = (contextSelection: Uri) => {
    const pathSegments = contextSelection.fsPath.split('\\');
    return pathSegments.reduce((acc, pathSegment) => (acc += pathSegment + '/'), '');
};

const buildPath = (contextPath: string, componentName: string, cssPrefix?: string) => {
    return {
        folderPath: `${contextPath}${componentName}`,
        componentpath: `${contextPath}${componentName}/${componentName}.tsx`,
        cssPath: `${contextPath}${componentName}/${componentName}${cssPrefix}.css`,
    };
};

export { normalizePath, buildPath };
