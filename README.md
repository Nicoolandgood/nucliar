# Nucliar
A command-line tool helping React developers by generating boilerplate code for them.

## :arrow_down: Installation

Install Nucliar globally with your favorite package manager:

```sh
# npm
npm i -g nucliar

# yarn
yarn global add nucliar

# pnpm
pnpm add -g nucliar
```

## :desktop_computer: Usage

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

Until now, we only used the `component` type. But nucliar actually supports multiple types out of the box: `component` (functional component), `class-component` (class-based component), `hook` (surprise: a hook), `hoc` (high order component) and `provider` (React context API).

In order to use one of them, just put the wanted value in the `type` argument:

```sh
# This will generate *drum rolling* a class component.
nucliar generate class-component Test 
```

The command can also be shorten to `gen` or even `g`:
```sh
nucliar g component WowThisIsAReallyShortCommand
```

## :gear: Configuration

It can be very tedious to rely on flag parameters to configure components generation. Plus, you may want to set up specific behaviors depending on some projects. The configuration file resolve this issue.

First, let's go inside our `awesome-react-project` directory and run the command below:
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
    "path": "./",
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
```json
{
    // Global configuration
    "useJsx": false,
    "useTypescript": false,
    "generateLazy": false,
    "generateStyle": false,
    "flat": false,
    "useCssModules": false,
    "preprocessor": "css",
    "path": "./",

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

Inside the first part, you will find global configuration. Any change made to it will affect all types of component.
As of the second part, it will scope the configuration to a specific type. Note that all of the global properties are valid for each component type.
**Any type scoped configuration overrides its global counterpart.**

Thus, if you want to use `jsx` only on function-based components, you will have to change the configuration as such:
```json
{
    "useJsx": false,
    // ...
    "types": {
        "component": {
            "useJsx": true, // here
            "generateStyle": true
        },
        // ...
    }
}
```

## :pencil: Custom types

As mentioned in [the usage part](#usage), Nucliar includes many component types by default. These are already very useful but may not fulfill all use cases. This is why it is possible to create custom component types.

At the root of your project, create a directory named `templates`:
```sh
mkdir templates
```
>In fact, you can name your directory by anything you want. `templates` is used in this case by convention. 

Inside, let's create a file `effect-component.txt` with the following content:
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

This file contains the template Nucliar will use to generate our `effect-component`.

>The template engine used by Nucliar is [Squirrelly](https://squirrelly.js.org/). You can learn more about the template syntax [here](https://squirrelly.js.org/docs/syntax/overview).

The `it` object contains the component render data.

After that, let's edit `nucliar.json`:

```json
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
nucliar g effect-component MyPrecious
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

>The example above will **not** generate specific Typescript code. In order to do that, you will have to use the `it.isTs` property inside a `if` statement in the template.

### The `it` object

This object contains the data exposed to the template by the engine.

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | File short name |
| `computedName` | `string` | `name` with applied changes for convention naming. It's recommended to use this property to name your components inside the template. |
| `path` | `string` | Path of the file directory location. |
| `extension` | `string` | The file extension. |
| `filename` | `string` | Complete file name (`name` + `extension`). |
| `filepath` | `string` | Complete file path (`path` + `filename`). |
| `linkedFiles` | `GeneratedFile[]` | List of files linked to the current one. They share the same preperties as `it`. |
| `styles` | `Style[]` | List of style files linked to the current component file. They share the same preperties as `it`. |
| `token` | `string` | A random string generated on file creation. |
| `isTs` | `boolean` | Flag set to `true` if the file use Typescript. |
| `isJsx` | `boolean` | Flag set to `true` if the file use JSX. |


## :round_pushpin: Roadmap

 - [x] Generate functional components
 - [x] Generate class components 
 - [x] Generate hooks
 - [x] Generate lazy components
 - [x] Generate provider components
 - [x] Generate style sheet (with or without any preprocessor)
 - [x] Generate components from custom templates
 - [x] Use of a local configuration file
 - [x] Manage errors
 - [x] Add following keys to config file: path, template
 - [ ] Complete documentation
 - [x] Automate package publishing
 - [ ] Write tests (some made but still wip)
 - [ ] Implement a plugin API giving the opportunity to customize Nucliar even more
 