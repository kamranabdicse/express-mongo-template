import { Router } from "express";
import RestaurantRouter from './api/RestaurantRouter';
import UserRouter from "./api/UserRouter";
import ProvinceRouter from "./api/ProvinceRouter";

const router = Router();
router.use("/v1/restaurant", RestaurantRouter);
router.use("/v1/user", UserRouter);
router.use("/v1/province", ProvinceRouter);

export default router;