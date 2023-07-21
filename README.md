# Nucliar
A command line tool to generate boilerplate React elements.
Nucliar is still in **WIP** state, all of its wanted features are listed below.

## Installation

```sh
# npm
npm i -g nucliar

# yarn
yarn global add nucliar

# pnpm
pnpm add -g nucliar
```

## Usage

>At the moment, it is only possible to generate components based on pre-made templates. In the (near) future, there will be a way to create components from custom templates. The commands below illustrates what it should look like with this feature.

Use the `generate` command to create a component based on its type:
```sh
$ nucliar generate <type> <name>
```
Let's try to generate a default component called `Test`:
```sh
$ nucliar generate component Test
```
After execution, it will have created this on your current directory:
```
./
|____ Test/
|_...   |__ Test.js
        |__ Test.css
```

You can give any path by just preprending it to your component name:
```sh
$ nucliar generate component ./components/Test
```

The `type` can take many values, nucliar supports 4 out of the box: `component`, `class-component`, `hook` and `hoc`.

## Todos

 - [x] Generate basic components
 - [x] Generate class components 
 - [x] Generate hooks
 - [x] Generate lazy components
 - [x] Generate style sheet (with or without any preprocessor)
 - [ ] Generate custom templates
 - [x] Use of a local configuration file
