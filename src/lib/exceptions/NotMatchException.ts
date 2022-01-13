import ExtendableException from "./Exceptions";

export default class NotMatchException extends ExtendableException {
    public code = 1004;
}