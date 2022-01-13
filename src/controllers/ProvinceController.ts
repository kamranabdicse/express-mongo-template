import Province, { IProvince } from "../model/Province";

export const retrieveProvince = async (provinceId: string): Promise<IProvince> => {
    const province: IProvince = await Province.findOne({ _id: provinceId }) as IProvince;
    return province;
};

export const retrieveAllProvinces = async(): Promise<IProvince[]> =>{
    const provinces: IProvince[] = await Province.find() as IProvince[];
    return provinces;
}
