import { NextFunction, Router } from 'express';
import { Request, Response } from 'express';
import { checkRequest } from '../../lib/ControlCenter';
import * as RestaurantController from '../../controllers/RestaurantController';
import { IRestaurant } from '../../model/Restaurant';
import { createRestaurant } from '../../lib/Schema';



const viwes = {
    createRestaurant: async (request: Request, response: Response) => {
        checkRequest(request, response, createRestaurant, false, "", false, async () => {
            console.log(typeof request.body);
            const restaurant: IRestaurant = await RestaurantController.createRestaurant(request.body);
            return response.status(201).json(restaurant);
        });
    }
}

const restaurantRouter = Router();
restaurantRouter.post("/", viwes.createRestaurant);

export default restaurantRouter;