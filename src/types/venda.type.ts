import type { ICliente } from "./cliente.js";
import type { IEnderecoEntrega } from "./endereco_entrega.js";
import type { IItens } from "./itens/itens.js";

import type { IPagamentos } from "./pagamento.js";

// type StatusOption = "PAGO" | "PENDENTE" | "CANCELADO"
// StatusOption;
//Perguntar Sábado


export interface IVenda{
    id_venda: number;
    data_venda: string;
    status: string;
    valor_total: number;
    cliente:ICliente
    endereco_entrega:IEnderecoEntrega
    pagamento:IPagamentos
    itens:IItens
}