import { importVenda } from "./utils/import-file.js";

// (async()=>{
//     const vendas = await importVenda()
//     console.log(vendas.length)
//     console.log(vendas[0]?.cliente.email)
// })()


const listaVendas = await importVenda()

console.log("Nível 1 : Desafio 1")

//Usamos o operador flatMap() para percorrer a lista e retornar os itens, depois utilizamos só o map() para percorrer itens categoria e nome.
const categoriasVendas = listaVendas.flatMap(venda=>venda.itens).map(item=>item.categoria.nome)

//retira as repetições
const semRepeticoes = new Set(categoriasVendas)

//spread para transformar em Array
const transformaEmArray = [...semRepeticoes]

console.log(transformaEmArray)

console.log()
console.log("Nível 1 : Desafio 2")

//Usamos o operador map para percorrer as vendas, cada venda tem seu endereço de entrega com o nome da cidade
const nomeCidades = listaVendas.map(vendas=>vendas.endereco_entrega.cidade)

//retira repetições
const nomesUnicosDasCidades = new Set(nomeCidades)

//transforma em Array
const arrayNomeCidades = [...nomesUnicosDasCidades]

console.log(arrayNomeCidades)

console.log()
console.log("Nível 1 : Desafio 3")

const statusVendas = listaVendas.map(venda=>venda.status)

const statusSemRepeticao = new Set(statusVendas)

const statusComoArray = [...statusSemRepeticao]

console.log(statusComoArray)

console.log()
console.log("Nível 1 : Desafio 4")

// const vendasPorMetodo = listaVendas.map(metodo=>metodo.pagamento.metodo)

//Maneira de manipular uma lista de vendas de forma escalavel para comportar novos métodos de pagamento que forem adicionados.
const resumoDeVendasPorMetodos = listaVendas.reduce((acc,current)=>({...acc,[current.pagamento.metodo]:(acc[current.pagamento.metodo]||0)+1}),{} as Record<string,number>)

//Maneira de manipular lista de vendas utilizando a tipagem em hardcoded para quando precisamos ter previsibilidade de um campo que é enum ou opção
// type TipoMetodo = "BOLETO" | "PIX" | "CARTAO_CREDITO"
// const vendasPorMetodo = listaVendas.map(venda=>venda.pagamento.metodo as TipoMetodo)
// const resumoDeVendasPorMetodos:Record<TipoMetodo,number> = { BOLETO: 0, PIX: 0, CARTAO_CREDITO: 0}

// //forEach percorre cada elemento do Array
// vendasPorMetodo.forEach((metodo:TipoMetodo) =>{
//     const metodoEcontrado = resumoDeVendasPorMetodos[metodo]
//     if(metodo === "BOLETO"){
//        return resumoDeVendasPorMetodos[metodo]+=1 
//     }
//     if(metodo === "CARTAO_CREDITO"){
//         return resumoDeVendasPorMetodos[metodo]+=1
//     }
//     if(metodo === "PIX"){
//         return resumoDeVendasPorMetodos[metodo]+=1
//     }
    // resumoDeVendasPorMetodos[metodo]=resumoDeVendasPorMetodos[metodo]?resumoDeVendasPorMetodos[metodo]+1:1

    // if(!resumoDeVendasPorMetodos[metodo]){
    //     resumoDeVendasPorMetodos[metodo]=1
    // }else{
    //     resumoDeVendasPorMetodos[metodo]+=1
    // }
// })

//COMO SEPARAR AS VENDAS?
console.log(resumoDeVendasPorMetodos)

console.log()
console.log("Nível 2 : Desafio 1")

//valor_total_vendido
const valorTotalVendido = listaVendas.filter(venda=>venda.status !== "CANCELADO").reduce((acc,numero)=>
(acc + (numero.valor_total))
,0)

console.log(`Total vendido é R$: ${valorTotalVendido.toFixed(2)}`)


  