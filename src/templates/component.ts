export const baseComponent = `
import React from "react";

{{@if(it.isTs)}}
interface {{it.componentName}}Props {}

const initProps: {{it.componentName}}Props = {};
{{#else}}
const initProps = {};
{{/if}}

const {{it.componentName}}{{@if(it.isTs)}}: React.FC<{{it.componentName}}Props>{{/if}} = (props = initProps) => {
    return <></>; 
}

{{it.componentName}}.defaultProps = initProps;
export default {{it.componentName}};
`;