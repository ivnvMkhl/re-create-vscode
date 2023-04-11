const getComponentTemplate = (componentName: string, importReact?: boolean) => {
    const importReactString = `import ${importReact ? 'React, ' : ''}{ FC } from "react";`;
    const componentTemplate = `${importReactString}
import styles from './${componentName}.module.css';
                                              
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
