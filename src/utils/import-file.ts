import { promises as fsPromises } from 'fs';
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import type { IVenda } from '../types/venda.type.js';

async function importVenda():Promise<Array<IVenda>>{
    
    const __filename = fileURLToPath(import.meta.url)

    const __dirname = path.dirname(__filename)
    const rootDir = __dirname.split("src")[0] || ''
    const pathFile = path.join(rootDir,'data/vendas_200.json')

    try{
        //Lê conteúdos do "vendas_200.json" no diretório src.
        const fileContents = await fsPromises.readFile(
            pathFile,
            {encoding:"utf-8"},
        );
        const fromStringToJson = JSON.parse(fileContents)
        return fromStringToJson as Array<IVenda>
    } catch (error) {
        console.log("error:",error)
        return []
    }
}

export {importVenda}
