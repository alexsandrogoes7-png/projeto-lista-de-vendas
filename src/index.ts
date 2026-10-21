import { importVenda } from "./utils/import-file.js";

// (async()=>{
//     const vendas = await importVenda()
//     console.log(vendas.length)
//     console.log(vendas[0]?.cliente.email)
// })()


const listaVendas = await importVenda()

//Nível 1 : Desafio 1 
//Usamos o operador flatMap() para percorrer a lista e retornar os itens, depois utilizamos só o map() para percorrer itens categoria e nome.
const vendas = listaVendas.flatMap(venda=>venda.itens).map(item=>item.categoria.nome)

//retira as repetições
const semRepeticoes = new Set(vendas)

//spread para transformar em Array
const transformaEmArray = [...semRepeticoes]

console.log(transformaEmArray)

//Nível 1 : Desafio 2
const nomeCidades = listaVendas.flatMap(vendas=>vendas.endereco_entrega.cidade)

const nomesUnicosDasCidades = new Set(nomeCidades)

const arrayNomeCidades = [...nomesUnicosDasCidades]

console.log(arrayNomeCidades)