export const funcComponent = `
import React from "react";
{{@each(it.styles) => style}}
import './{{style.filename}}';
{{/each}}

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
{{@each(it.styles) => style}}
import './{{style.filename}}';
{{/each}}

{{@if(it.isTs)}}
interface {{it.name}}Props {}

const initProps: {{it.name}}Props = {};
{{#else}}
const initProps = {};
{{/if}}

class {{it.name}} extends Component{{@if(it.isTs)}}<{{it.name}}Props>{{/if}} {

    static defaultProps = {
        ...initProps,
    };

    constructor(props{{@if(it.isTs)}}: {{it.name}}Props{{/if}} = initProps) {
        super(props);
    }

    render() {
        return <></>;
    }
}

export default {{it.name}};
`;

export const hoComponent = `
import React from "react";

const {{it.name}} = (WrappedComponent{{@if(it.isTs)}}: React.FC | React.Component{{/if}}, ...args{{@if(it.isTs)}}: any[]{{/if}}) => {
    return (props{{@if(it.isTs)}}: any{{/if}}) => {
        return <WrappedComponent {...props} />
    }
}

export default {{it.name}};
`;

export const hookComponent = `
import React, { useState } from "react";

{{@if(it.isTs)}}
interface {{it.name}}Values {}
{{/if}}

const {{it.name}} = (...args{{@if(it.isTs)}}: any[]{{/if}}){{@if(it.isTs)}}: {{it.name}}Values{{/if}} => {

    const [sample, setSample] = useState{{@if(it.isTs)}}<any>{{/if}}();

    return {};
}

export default {{it.name}};
`;

export const lazyComponent = `
import React, { lazy, Suspense } from "react";

{{@if(it.isTs)}}
interface {{it.name}}Props {}

const initProps: {{it.name}}Props = {};
{{#else}}
const initProps = {};
{{/if}}

const {{it.name}}Lazy = lazy(() => import("./{{it.name}}"));

const {{it.name}}{{@if(it.isTs)}}: React.FC<{{it.name}}Props>{{/if}} = (props = initProps) => {

    const renderFallback = () => <>loading...</>;

    return <Suspense fallback={renderFallback()}>
        <{{it.name}}Lazy {...props} />
    </Suspense>;
}

{{it.name}}.defaultProps = initProps;
export default {{it.name}};
`;
