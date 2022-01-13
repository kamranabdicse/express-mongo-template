import Restaurant, { IRestaurant } from "../model/Restaurant";


export const createRestaurant = async (body: object): Promise<IRestaurant> => {
    const restaurant: IRestaurant = await Restaurant.create(body) as IRestaurant;
    return restaurant
}