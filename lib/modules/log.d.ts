/**
 * A function for logging a specific message.
 *
 * @param message - The message to be logged.
 * @param type - The type of log.
 */
export declare const Log: (message: string, type?: 'i' | 'e' | 's' | 'w' | 'd') => void;
/**
 * A function for debugging Functions or Objects
 *
 * @param obj - The object/function to be tested.
 * @param name - The name of the debug call.
 */
export declare const Debug: (obj: Function | Object, name?: string) => void;
