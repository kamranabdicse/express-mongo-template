import mongoose, { Schema } from 'mongoose';
import { IProvince, ProvinceSchema } from './Province';


export interface ICity {
    name: string,
    code: number,
    province: IProvince
}

const CitySchema: Schema = new Schema(
    {
        name: { type: String },
        code: { type: Number },
        province: ProvinceSchema,
    }
);

export default mongoose.model<ICity>("City", CitySchema);