import { Uri } from 'vscode';

const normalizePath = (contextSelection: Uri) => {
    const pathSegments = contextSelection.fsPath.split('\\');
    return pathSegments.reduce((acc, pathSegment) => (acc += pathSegment + '/'), '');
};

const buildPath = (
    contextPath: string,
    componentName: string,
    cssPrefix: string,
    componentExtension: string | undefined = '.tsx',
) => {
    return {
        folderPath: `${contextPath}${componentName}`,
        componentpath: `${contextPath}${componentName}/${componentName}${componentExtension}`,
        cssPath: `${contextPath}${componentName}/${componentName}${cssPrefix}.css`,
    };
};

const parseStringTemplate = (str: string, obj: Record<string, string>) => {
    let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/);
    let args = str.match(/[^{\}]+(?=})/g) || [];
    let parameters = args.map((argument) => obj[argument] || (obj[argument] === undefined ? '' : obj[argument]));
    return String.raw({ raw: parts }, ...parameters);
};

const parseComponentTemplate = (template: string[], name: string) => {
    const findPrefix = (substring: string) =>
        !substring.includes('css') && !substring.includes('import') && !substring.includes(name);
    const initialReduceValue = { componentContent: '', cssModulesPrefix: '' };
    const reduceCallback = (acc: typeof initialReduceValue, templateRow: string) => {
        const row = parseStringTemplate(templateRow, { componentName: name });
        if (row.includes('.css')) {
            const cssPrefix = row.split('.').filter(findPrefix)[0];
            if (cssPrefix) {
                return {
                    ...acc,
                    componentContent: acc.componentContent + row + '\r\n',
                    cssModulesPrefix: '.' + cssPrefix,
                };
            }
        }
        return { ...acc, componentContent: acc.componentContent + row + '\r\n' };
    };

    const { componentContent, cssModulesPrefix } = template.reduce(reduceCallback, initialReduceValue);

    return {
        cssModulesPrefix,
        componentContent: Uint8Array.from(componentContent.split('').map((x) => x.charCodeAt(0))),
    };
};

export { normalizePath, buildPath, parseComponentTemplate };
