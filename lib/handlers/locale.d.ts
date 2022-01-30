/**
 * A function for grabbing the language file.
 *
 * @returns The locale of given location if it is created under `locales.ts`.
 */
export declare const Locale: () => {
    commands: {
        errors: {
            execution: string;
            names: string;
            creation: string;
        };
    };
    utils: {
        errors: {
            error: string;
        };
        success: {
            backup: string;
        };
    };
    discord: {
        errors: {
            emoji: string;
            role: string;
            channel: string;
            category: string;
        };
    };
};
