import { importVenda } from "./utils/import-file.js";

(async()=>{
    const vendas = await importVenda()
    console.log(vendas.length)
    console.log(vendas[0]?.cliente.email)
})()