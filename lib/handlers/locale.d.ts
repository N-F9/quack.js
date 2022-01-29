declare const Locale: () => {
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
export default Locale;
