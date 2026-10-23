import { importVenda } from "./utils/import-file.js";

// (async()=>{
//     const vendas = await importVenda()
//     console.log(vendas.length)
//     console.log(vendas[0]?.cliente.email)
// })()


const listaVendas = await importVenda()

//Nível 1 : Desafio 1 
//Usamos o operador flatMap() para percorrer a lista e retornar os itens, depois utilizamos só o map() para percorrer itens categoria e nome.
const categoriasVendas = listaVendas.flatMap(venda=>venda.itens).map(item=>item.categoria.nome)

//retira as repetições
const semRepeticoes = new Set(categoriasVendas)

//spread para transformar em Array
const transformaEmArray = [...semRepeticoes]

console.log(transformaEmArray)

//Nível 1 : Desafio 2
//Usamos o operador map para percorrer as vendas, cada venda tem seu endereço de entrega com o nome da cidade
const nomeCidades = listaVendas.map(vendas=>vendas.endereco_entrega.cidade)

//retira repetições
const nomesUnicosDasCidades = new Set(nomeCidades)

//transforma em Array
const arrayNomeCidades = [...nomesUnicosDasCidades]

console.log(arrayNomeCidades)

//Nível 1 : Desafio 3
const statusVendas = listaVendas.map(venda=>venda.status)

const statusSemRepeticao = new Set(statusVendas)

const statusComoArray = [...statusSemRepeticao]

console.log(statusComoArray)

//Nível 1 : Desafio 4
const vendasPorMetodo = listaVendas.map(venda=>venda.pagamento.metodo)

//COMO SEPARAR AS VENDAS?
console.log(vendasPorMetodo)


  