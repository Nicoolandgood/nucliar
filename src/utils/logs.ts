import chalk from "chalk";

export const getLogText = (icon: string, message: string) => `${icon} ${message}`;

export const getInfoText = (message: string) => chalk.blue(getLogText('\u2139', message));
export function logInfo(message: string) {
    console.log(getInfoText(message));    
}

export const getWarnText = (message: string) => chalk.yellow(getLogText('\u26A0', message));
export function logWarn(message: string) {
    console.warn(getWarnText(message));
}

export const getSuccessText = (message: string) => chalk.green(getLogText('\u2714', message));
export function logSuccess(message: string) {
    console.log(getSuccessText(message));
}

export const getErrorText = (message: string) => chalk.red.bold(getLogText('\u292c', message));
export function logError(message: string) {
    console.error(getErrorText(message));
}