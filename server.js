import { books } from "./src/api.js";

const b = await books();

console.log(b);
