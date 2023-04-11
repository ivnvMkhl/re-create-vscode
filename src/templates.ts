const getComponentTemplate = (componentName: string, importReact?: boolean, cssModulesPrefix?: string) => {
    const importReactString = `import ${importReact ? 'React, ' : ''}{ FC } from "react";`;
    const componentTemplate = `${importReactString}
import styles from './${componentName}${cssModulesPrefix}.css';
                                              
type ${componentName}Props = {};
                                              
const ${componentName}: FC<${componentName}Props> = ({}) => {
    return (
        <div>
                                                  
        </div>
    )
};
                                              
export { ${componentName} };`;

    return Uint8Array.from(componentTemplate.split('').map((x) => x.charCodeAt(0)));
};

export { getComponentTemplate };
