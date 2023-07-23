# :book: Guide {#guide}

Follow this step-by-step guide to learn how to use Nucliar at its fullest potential!

## :arrow_down: Installation {#installation}

Install Nucliar globally with your favorite package manager:

::: code-group
```sh [npm]
npm i -g nucliar
```
```sh [yarn]
yarn global add nucliar
```
```sh [pnpm]
pnpm add -g nucliar
```
:::

## :desktop_computer: Basic usage {#usage}

Use the `generate` command to create a component based on its type:
```sh
nucliar generate <type> <name>
```
Now, let's try to generate a default component called `Test`:
```sh
nucliar generate component Test
```
After execution, it will create this file structure in your project directory:
```
./awesome-react-project
├─ ...
└─ Test/
    ├─ Test.js
    └─ Test.css
```

You can give any path by just preprending it to your component name:
```sh
nucliar generate component ./components/Test
```

Until now, we only used the `component` type. But nucliar actually supports 4 types out of the box: `component` (functional component), `class-component` (class-based component), `hook` (surprise: a hook) and `hoc` (high order component).

In order to use one of them, just put the wanted value in the `type` argument:
::: code-group
```sh [Class component]
nucliar generate class-component Test
```
```sh [Hook]
nucliar generate hook Test
```
```sh [HOC]
nucliar generate hoc Test
```
```sh [Functional component]
nucliar generate component Test # A feeling of déjà vu?
```
:::

Depending on your project, you may also need to change the behavior of the `generate` command.
This can be achieved by using parameters (see [generate command documentation](.)) or by [configuring your project](.).

## :gear: Configuration {#configuration}

It can be very tedious to rely on flag parameters to configure components generation. Plus, you may want to set up specific behaviors depending on some project. The configuration file resolve this isssue.

First, let's go inside our `awesome-react-project` directory and run the following command:
```sh
nucliar init
```
It will prompt you some questions about your project in order to create a configuration file `nucliar.json`.

At the end, you should have a file with a similar content:
```json
{
    "useJsx": false,
    "useTypescript": false,
    "generateLazy": false,
    "generateStyle": false,
    "flat": false,
    "useCssModules": false,
    "preprocessor": "css",
    "path": "./src/components",
    "types": {
        "component": {
            "generateStyle": true
        },
        "class-component": {
            "generateStyle": true
        },
        "hoc": {
            "flat": true
        },
        "hook": {
            "flat": true
        }
    }
}
```

This file can be divided in two parts:
```json{2,12}
{
    // Global configuration
    "useJsx": false,
    "useTypescript": false,
    "generateLazy": false,
    "generateStyle": false,
    "flat": false,
    "useCssModules": false,
    "preprocessor": "css",
    "path": "./src/components",

    // Type scoped configuration
    "types": {
        "component": {
            "generateStyle": true
        },
        "class-component": {
            "generateStyle": true
        },
        "hoc": {
            "flat": true
        },
        "hook": {
            "flat": true
        }
    }
}
```

Inside the first part, you will find global configuration. Any change made to this configuration will affect all types of component.
As of the second part, it will only affect the type above the key. Note that all of the global properties are valid for each component type.
**Any type scoped configuration overrides its global counterpart.**

Thus, if you want to use `jsx` only on function-based components, you will have to change the configuration as such:
```json{6}
{
    "useJsx": false,
    // ...
    "types": {
        "component": {
            "useJsx": true,
            "generateStyle": true
        },
        // ...
    }
}
```

For more information about the configuration file properties, see [init command documentation](.).

## :pencil: Custom types {#custom}

As mentioned in [the basic usage part](#usage), Nucliar includes 4 component types by default. These are already very useful but may not fulfill all use cases. This is why it is possible to create custom component types.

At the root of your project, create a directory named `templates`:
```sh
mkdir templates
```

::: info Info
In fact, you can name your directory by anything you want. `templates` is used by convention. 
:::

Inside it, let's create a file `effect-component.txt` with this content:
```txt
import React, { useEffect } from "react";

const {{it.name}} = (props = initProps) => {

    useEffect(() => {
        console.log("Freshly generated from Nucliar!");
    }, []);

    return <></>; 
}

export default {{it.name}};
```

This file contains the template that will be rendered by Nucliar when generating `effect-component`.
::: tip Note
The template engine used by Nucliar is [Squirrelly](https://squirrelly.js.org/). You can learn more about the template syntax [here](https://squirrelly.js.org/docs/syntax/overview).
:::
The `it` object contains the component render data. More info about its properties in the [Component API page](.);

After that, let's edit `nucliar.json`:

```json{16-18}
{
    // ...
    "types": {
        "component": {
            "generateStyle": true
        },
        "class-component": {
            "generateStyle": true
        },
        "hoc": {
            "flat": true
        },
        "hook": {
            "flat": true
        },
        "effect-component": {
            "template": "./templates/effect-template.txt",
        },
    }
}
```

Congrats! You have successfully added a new component type. :tada:

Let's try to generate it now:
```sh
nucliar generate effect-component MyPrecious
```

Without any doubt, this will generate the following code:
```jsx
import React, { useEffect } from "react";

const MyPrecious = (props = initProps) => {

    useEffect(() => {
        console.log("Freshly generated from Nucliar!");
    }, []);

    return <></>; 
}

export default MyPrecious;
```

::: warning Attention
The example above will now generate specific Typescript code. In order to do that,
you will have to use the `it.useTypescript` property inside a `if` statement in the template.
:::