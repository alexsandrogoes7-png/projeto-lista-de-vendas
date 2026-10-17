import type { ICliente } from "./cliente.js";

export interface IVenda{
    id_venda: number;
    data_venda: string;
    status: string;
    valor_total: number;
    cliente:ICliente
    endereco_entrega: {
        rua: string;
        cidade: string;
        estado: string;
        cep: string;
    };
    pagamento: {
        metodo: string;
        status: string;
        parcelas: number;
    };
    itens: {
        id_produto: number;
        nome: string;
        quantidade: number;
        preco_unitario: number;
        categoria: {
            id_categoria: number;
            nome: string;
        };
    }[];
}




  