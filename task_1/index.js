import {encoded, translations} from './data.js'
import { decodeFields, findMissingValues } from './decoded.js';

console.log("Let's rock")
console.log(encoded, translations)


const { decodedData, uniqueIds } = decodeFields(encoded, translations);

console.log("Декодировка:");
console.log(decodedData);

console.log("\nId которые встречаются в encoded:");
console.log(Array.from(uniqueIds));

console.log("\nId которые встречаются только в encoded, но в translations их нет:");
const missingValues = findMissingValues(uniqueIds, translations);
console.log(missingValues);
