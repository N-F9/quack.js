/**
 * A function for logging a specific message.
 *
 * @param {string} message
 * @param {('i' | 'e' | 's' | 'w' | 'd')} [type='i']
 */
export declare const Log: (message: string, type?: 'i' | 'e' | 's' | 'w' | 'd') => void;
/**
 * A function for debugging Functions or Objects
 *
 * @param {(Function | Object)} obj
 * @param {string} [name='none']
 */
export declare const Debug: (obj: Function | Object, name?: string) => void;
