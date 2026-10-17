import vendas from "./vendas_200.json";
const vendasTipadas = vendas;
console.log(vendasTipadas);
const vendasPagas = vendas.filter(venda => venda.pagamento.status === "APROVADO");
console.log(vendasPagas.length);
//# sourceMappingURL=index.js.map