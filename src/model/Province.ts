import mongoose, { Schema } from 'mongoose';


export interface IProvince {
    name: string,
    code: number,
}

const ProvinceSchema: Schema = new Schema(
    {
        name: { type: String },
        code: { type: Number },
    }
);

export { ProvinceSchema };
export default mongoose.model<IProvince>("Province", ProvinceSchema);