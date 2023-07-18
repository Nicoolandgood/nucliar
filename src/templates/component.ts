export const funcComponent = `
import React from "react";
{{@if(it.style)}}
import './{{it.style.filename}}';
{{/if}}

{{@if(it.isTs)}}
interface {{it.name}}Props {}

const initProps: {{it.name}}Props = {};
{{#else}}
const initProps = {};
{{/if}}

const {{it.name}}{{@if(it.isTs)}}: React.FC<{{it.name}}Props>{{/if}} = (props = initProps) => {
    return <></>; 
}

{{it.name}}.defaultProps = initProps;
export default {{it.name}};
`;

export const classComponent = `
import React, { Component } from "react";

{{@if(it.isTs)}}
interface {{it.name}}Props {}

const initProps: {{it.name}}Props = {};
{{#else}}
const initProps = {};
{{/if}}

class {{it.name}} extends Component {

    constructor(props = initProps{{@if(it.isTs)}}: {{it.name}}Props{{/if}}) {
        super(props);
    }

    render() {
        return <></>;
    }
}

{{it.name}}.defaultProps = initProps;
export default {{it.name}};
`;

export const hoComponent = `
import React from "react";

const with{{it.name}} = (WrappedComponent{{@if(it.isTs)}}: React.FC | React.Component{{/if}}, ...args{{@if(it.isTs)}}: any[]{{/if}}) => {
    return (props{{@if(it.isTs)}}: any{{/if}}) => {
        return <WrappedComponent {...props} />
    }
}

export default {{it.name}};
`;

export const hookComponent = `
import React, { useState } from "react";

{{@if(it.isTs)}}
interface use{{it.name}}Values {}
{{/if}}

const use{{it.name}} = (...args{{@if(it.isTs)}}: any[]{{/if}}){{@if(it.isTs)}}: use{{it.name}}Values{{/if}} => {

    const [sample, setSample] = useState{{@if(it.isTs)}}<any>{{/if}}();

    return {};
}

export default use{{it.name}};
`;