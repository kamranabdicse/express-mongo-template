import csv from 'csvtojson';
import path from 'path';
import City from '../model/City';
import Province from '../model/Province';
import '../env';

const filename = "city.csv";

const insertCity = async (cityRaw) => {
    const relatedProvince = await Province.findOne({ code: cityRaw.ostan });
    const existCity = await City.findOne({ code: cityRaw.id });

    if (!relatedProvince){
        return undefined;
    } else if (existCity) {
        return undefined;
    }

    const cityObject = {
        name: cityRaw.name,
        code: cityRaw.id,
        province: relatedProvince
    };
    return City.create(cityObject);
};

(async () => {
    const jsonArray = await csv().fromFile(path.join(__dirname, '../../../', filename));
    await Promise.all(jsonArray.map(insertCity));

    process.exit(0);
})();