import { Request, Response } from 'express';
import { Router } from 'express';
import { checkRequest } from "../../lib/ControlCenter";
import * as ProvinceController from '../../controllers/ProvinceController';
import { IProvince } from '../../model/Province';
import { noField } from "../../lib/Schema";

const views = {
    retrieveProvince: async (request: Request, response: Response) => {
        checkRequest(request, response, noField, false, "", false, async () => {
            const province: IProvince = await ProvinceController.retrieveProvince(request.params.provinceId) as IProvince;
            
            return response.json(province);
        })
    },
    retrieveAllProvinces: async (request: Request, response: Response) => {
        checkRequest(request, response, noField, false, "", false, async () => {
            const provinces: IProvince[] = await ProvinceController.retrieveAllProvinces() as IProvince[];
            return response.json(provinces);
        })
    }
}

const provinceRouter = Router();
provinceRouter.get("/:provinceId", views.retrieveProvince);
provinceRouter.get("/", views.retrieveAllProvinces);

export default provinceRouter;