export const funcComponent = `
import React from "react";
{{@each(it.styles) => style}}
import './{{style.filename}}';
{{/each}}

{{@if(it.isTs)}}
interface {{it.computedName}}Props {}

{{/if}}
{{@if(it.isTs)}}
const {{it.computedName}}: React.FC<{{it.computedName}}Props> = ({...props}) => {
{{#else}}
const {{it.computedName}} = ({...props}) => {
{{/if}}
    return <></>; 
}

export default {{it.computedName}};
`;

export const classComponent = `
import React, { Component } from "react";
{{@each(it.styles) => style}}
import './{{style.filename}}';
{{/each}}

{{@if(it.isTs)}}
interface {{it.computedName}}Props {}

const initProps: {{it.computedName}}Props = {};
{{#else}}
const initProps = {};
{{/if}}

class {{it.computedName}} extends Component{{@if(it.isTs)}}<{{it.computedName}}Props>{{/if}} {

    static defaultProps = {
        ...initProps,
    };

    constructor(props{{@if(it.isTs)}}: {{it.computedName}}Props{{/if}} = initProps) {
        super(props);
    }

    render() {
        return <></>;
    }
}

export default {{it.computedName}};
`;

export const hoComponent = `
import React from "react";

const {{it.computedName}} = (WrappedComponent{{@if(it.isTs)}}: React.FC | React.Component{{/if}}, ...args{{@if(it.isTs)}}: any[]{{/if}}) => {
    return (props{{@if(it.isTs)}}: any{{/if}}) => {
        return <WrappedComponent {...props} />
    }
}

export default {{it.computedName}};
`;

export const hookComponent = `
import React, { useState } from "react";

{{@if(it.isTs)}}
interface {{it.computedName}}Values {}
{{/if}}

const {{it.computedName}} = (...args{{@if(it.isTs)}}: any[]{{/if}}){{@if(it.isTs)}}: {{it.computedName}}Values{{/if}} => {

    const [sample, setSample] = useState{{@if(it.isTs)}}<any>{{/if}}();

    return {};
}

export default {{it.computedName}};
`;

export const lazyComponent = `
import React, { lazy, Suspense } from "react";

{{@if(it.isTs)}}
interface {{it.computedName}}Props {}
{{/if}}

const {{it.computedName}}Lazy = lazy(() => import("./{{it.computedName}}"));

{{@if(it.isTs)}}
const {{it.computedName}}: React.FC<{{it.computedName}}Props> = ({...props}) => {
{{#else}}
const {{it.computedName}} = ({...props}) => {
{{/if}}

    const renderFallback = () => <>loading...</>;

    return <Suspense fallback={renderFallback()}>
        <{{it.computedName}}Lazy {...props} />
    </Suspense>;
}

export default {{it.computedName}};
`;

export const providerTemplate = `
import React, { createContext, useContext } from "react";

const initContextState = {};

export const {{it.computedName}}Context = createContext(initContextState);

export const use{{it.computedName}}Context = () => useContext({{it.computedName}}Context);

const {{it.computedName}}Provider = (props) => {

    return <{{it.computedName}}Context.Provider value={initContextState}>
        {props.children}
    </{{it.computedName}}Context.Provider>
};

export default {{it.computedName}}Provider;
`;
