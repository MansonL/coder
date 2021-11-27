import { readFile } from "fs/promises";
import path from "path";
import { PackageJson } from "type-fest";


const argumentPath = process.argv[2];
const packageJSONPath = path.resolve(__dirname, `../../${argumentPath}`);
console.log(process.argv);
(async () => {
    const packageJson = await readFile(packageJSONPath, 'utf-8');
    const dataJSON : PackageJson= JSON.parse(packageJson);
    console.log(`------------------ DEPENDENCIES ---------------------\n`);
    console.log(Object.keys(dataJSON.dependencies as PackageJson.Dependency).toLocaleString().replace(/,/g, ' '));
    console.log(`\n\n------------------ DevDEPENDENCIES ------------------\n\n`);
    if(dataJSON.devDependencies) console.log(Object.keys(dataJSON.devDependencies as PackageJson.Dependency).toString().replace(/,/g, ' '));
    
})()