import type { ICliente } from "./cliente.js";
import type { IEnderecoEntrega } from "./endereco_entrega.js";
import type { IItens } from "./itens/itens.js";

import type { IPagamentos } from "./pagamento.js";

import type { ICategoria } from "./itens/categoria.js";

type StatusOption = "PAGO" | "PENDENTE" | "CANCELADO"

export interface IVenda{
    id_venda: number;
    data_venda: string;
    status: StatusOption;
    valor_total: number;
    cliente:ICliente
    endereco_entrega:IEnderecoEntrega
    pagamento:IPagamentos
    itens:{
            id_produto: number;
            nome: string;
            quantidade: number;
            preco_unitario: number;
            categoria:ICategoria
    }[]
}