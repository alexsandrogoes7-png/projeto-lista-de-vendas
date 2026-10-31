import type { ICategoria } from "./categoria.js";

export interface IItens{
    id_produto: number;
    nome: string;
    quantidade: number;
    preco_unitario: number;
    categoria:ICategoria
}