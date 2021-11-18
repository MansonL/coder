import { normalize, denormalize, schema } from "normalizr";
import { readFile, writeFile } from "fs/promises";
import { inspect } from "util";
import path from "path";

const dataPath = path.resolve(__dirname, '../data/data.json');

const employeesSchema = new schema.Entity('empleados');
const companySchema = new schema.Entity('empresas',{
    gerente: employeesSchema,
    encargado: employeesSchema,
    empleados: [employeesSchema]
});
const companiesSchema = new schema.Entity('group', {
    empresas: [companySchema]
});

(async () => {
    const data = await readFile(dataPath, 'utf-8');
    const obj = JSON.parse(data);
    const normalizedData = normalize(obj, companiesSchema);
    console.log('-------------------------- NORMALIZED DATA ----------------------------------- ')
    console.log(inspect(normalizedData, false, 12, true));
    const denormalizedData = denormalize(normalizedData.result, companiesSchema, normalizedData.entities);
    console.log('-------------------------- DENORMALIZED DATA ----------------------------------- ')
    console.log(inspect(denormalizedData, false, 12, true));
    console.log('-------------------------- DIFFERENCE IN BYTES --------------------------------- ');
    console.log(`${JSON.stringify(normalizedData).length} < ${JSON.stringify(denormalizedData).length}`);

})();