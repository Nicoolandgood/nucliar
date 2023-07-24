# Commands

## `init`

Creates a configuration file in order to save your settings within a project.

### Aliases

- `i`

### Usage

```sh
nucliar init
```

### Options

- `-d`, `--dry-run`                         Prevents config file generation and shows result.
- `-h`, `--help`                            Displays help for command.

## `generate`

Generates React components depending on the given parameters.

> *With great power comes great responsibility.* - Uncle Ben

### Aliases

- `gen`
- `g`

### Usage

```sh
nucliar generate <type> <name>
```

### Arguments

- `type` (**mandatory**) Type of the component to generate. 
- `name` (**mandatory**) Name of the generated component. It may contain the path where the file will be created.

### Options

- `--use-typescript`                        Writes the component in Typescript.
- `--use-jsx`                               Creates the component in a JSX/TSX file.
- `--use-css-modules`                       Creates style files as css modules.
- `--generate-style`                        Creates a style file for the component.
- `--flat`                                  Prevents the creation of a folder for the component.
- `-d`, `--dry-run`                         Prevents the file creation and outputs the render
- `-f`, `--force`                           Forces the component generation, ignoring potential file conflict.
- `-p`, `--path <path>`                     Path where the component should generate.
- `-l`, `--generate-lazy`                   Creates a lazy version of the component.
- `-P`, `--preprocessor [preprocessor]`     Selects the style preprocessor for the component.
- `-h`, `--help`                            Displays help for command.
