import { logError } from "./logs";

export class NucliarError extends Error {};

export function errorHandler(error: Error) {
    
    if(!(error instanceof NucliarError))
        // unhandled error
        throw error;
    
    logError(error.message);
}