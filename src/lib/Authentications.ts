import cryptojs from 'crypto-js';
import jwt from 'jsonwebtoken';



import config from '../config';
import IToken from '../model/Token';
import User, { IUser } from '../model/User';
import UnauthorizedException from './exceptions/UnauthorizedException';

export const generateToken = async (user: IUser): Promise<string> => {
    try {
        const claims: IToken = {
            userID: user._id,
            exp: Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60)
        }

        const token = jwt.sign(claims, config.jwtScecret);
        return cryptojs.AES.encrypt(token, config.aesKey).toString();
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}


export const validateToken = async (encryptedToken: string): Promise<IUser> => {
    try {
        const signedToken: string = cryptojs.AES.decrypt(encryptedToken, config.aesKey).toString(cryptojs.enc.Utf8);
        var token: IToken = jwt.verify(signedToken, config.aesKey) as IToken;
        const user: IUser = await User.findOne({ _id: token.userID }) as IUser;
        return user;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}


export const authorize = async (encryptedToken: string): Promise<IUser> => {
    const user = await validateToken(encryptedToken);
    if (user){
        return user;
    }
    throw new UnauthorizedException('مجوز دسترسی معتبر نمی باشد');
}