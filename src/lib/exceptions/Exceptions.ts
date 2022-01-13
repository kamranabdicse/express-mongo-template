export class ExtendedException extends Error {
    public code = 0;
    constructor(message: any) {
        super(message);
        this.name = this.constructor.name

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

export default ExtendedException;