import { Router } from 'express';
import { Request, Response } from "express";
import { checkRequest } from "../../lib/ControlCenter";
import * as UserController from '../../controllers/UserController';
import { register , login } from '../../lib/Schema';


const views = {
    register: async (request: Request, response: Response) => {
        checkRequest(request, response, register, false, "", false, async () => {
            const isCreated:boolean = await UserController.register(request.body);
            return response.json({ success: true });
        });
    },

    login: async (request: Request, response: Response) => {
        checkRequest(request, response, login, false, "", false, async () => {
            const token: object  = await UserController.login(request.body.phoneNumber, request.body.password);
            return response.json(token);
        })
    }


}
// register
// login
// logout

const userRouter = Router();
userRouter.post("/register", views.register);
userRouter.post("/login", views.login);

export default userRouter;