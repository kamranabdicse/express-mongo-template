import ExtendableException from "./Exceptions";

export default class NotFoundException extends ExtendableException {
    public code = 1003;
}
