export interface ValidationResult {
    valid: boolean;
    reason?: string;
}

export const validateUrl = (url: string): ValidationResult => {
    if (!url) {
        return {
            valid: false,
            reason: "URL is required",
        };
    }

    try {
        const parsedUrl = new URL(url);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            return {
                valid: false,
                reason: "Only HTTP and HTTPS URLs are allowed",
            };
        }

        return {
            valid: true,
        };
    } catch {
        return {
            valid: false,
            reason: "Invalid URL format",
        };
    }
};