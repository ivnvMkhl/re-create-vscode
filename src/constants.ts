const EXTENSION_NAME = 're-create';

const COMMANDS = {
    createReactComponent: 're-create.createReactComponent',
} as const;

const PROPERTIES = {
    createCssFile: 're-create.createCssFile',
    cssModulesPrefix: 're-create.cssModulesPrefix',
    importReact: 're-create.importReact',
} as const;

export { EXTENSION_NAME, COMMANDS, PROPERTIES };
