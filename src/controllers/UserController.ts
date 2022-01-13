import config from '../config';
import cryptojs from 'crypto-js';

import User, { IUser } from '../model/User';
import ConflictException from '../lib/exceptions/ConflictException';
import { generateToken } from '../lib/Authentications';
import NotFoundException from '../lib/exceptions/NotFoundException';
import NotMatchException from '../lib/exceptions/NotMatchException';


export const register = async (body: IUser): Promise<boolean> => {
    let user: IUser = await User.findOne({ phoneNumber: body.phoneNumber }) as IUser;

    if (user) {
        throw new ConflictException("کاربر با این شماره وجود دارد")
    }

    body.password = cryptojs.AES.encrypt(body.password, config.aesKey).toString()
    user = await User.create(body) as IUser;
    return true;
};


export const login = async (phoneNumber: string, password: string): Promise<object> => {
    const user: IUser = await User.findOne({ phoneNumber: phoneNumber }) as IUser

    if (!user) {
        throw new NotFoundException("Client Not Found!");
    }

    if (user.password !== cryptojs.AES.encrypt(password, config.aesKey).toString()) {
        throw new NotMatchException("Password Not Correct!")
    }

    if (user) {
        // check black list token
        const encryptedToken: string = await generateToken(user);

        return {
            success: true,
            token: encryptedToken,
            user: {
                userId: user._id,
                name: user.name,
            },
        }
    }
};