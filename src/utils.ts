import { Uri } from 'vscode';

const normalizePath = (contextSelection: Uri) => {
    const pathSegments = contextSelection.fsPath.split('\\');
    return pathSegments.reduce((acc, pathSegment) => (acc += pathSegment + '/'), '');
};

export { normalizePath };
