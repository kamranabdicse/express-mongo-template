import ExtendedException from "./Exceptions";

export default class UnauthorizedException extends ExtendedException{
    public code = 1001;
}