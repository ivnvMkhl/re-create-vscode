const EXTENSION_NAME = 're-create';

const COMMANDS = {
    createReactComponent: 're-create.createReactComponent',
} as const;

const PROPERTIES = {
    createCssFile: 'createCssFile',
    componentExtension: 'componentExtension',
    componentTemplate: 'componentTemplate',
} as const;

export { EXTENSION_NAME, COMMANDS, PROPERTIES };
