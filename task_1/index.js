import {encoded, translations} from './data.js'
import { decodeFields } from './decoded.js';

console.log("Let's rock")
console.log(encoded, translations)

const { decodedData, missingValues } = decodeFields(encoded, translations);

console.log("Декодировка:");
console.log(decodedData);


console.log("\nId которые встречаются только в encoded, но в translations их нет:");
console.log(missingValues);
