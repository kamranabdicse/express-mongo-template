import ExtendableException from "./Exceptions";

export default class ConflictException extends ExtendableException {
    public code = 1002;
}
