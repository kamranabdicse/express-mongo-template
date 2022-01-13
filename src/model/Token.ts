import mongoose, {Schema} from 'mongoose';


export interface IToken{
    userID: string;
    exp: number;
}


export default IToken;
