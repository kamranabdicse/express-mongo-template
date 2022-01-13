import csv from 'csvtojson';
import path from 'path';
import Province, { IProvince } from '../model/Province';
import '../env';


const filename = "ostan.csv";

const insertProvince = async (provinceRaw) => {
    const province = await Province.findOne({code: provinceRaw.id});
    if (province){
        return undefined;
    }
    
    const provinceObject = {
        name: provinceRaw.name,
        code: provinceRaw.id
    };
    return Province.create(provinceObject);
};

(async () => {
    const jsonArray = await csv().fromFile(path.join(__dirname, '../../../', filename));
    await Promise.all(jsonArray.map(insertProvince));

    process.exit(0);
})();