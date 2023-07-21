import { PackageJSON } from "../interfaces/misc";

export function getPackageJSON(): PackageJSON{
    return require('../../package.json');
}