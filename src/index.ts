import type { ICategoria } from "./types/itens/categoria.js";
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
//reduce percorre um array e reduz todos os seus elementos a um único valor final.
//Ele executa uma função de retorno (callback) para cada item do array, acumulando um resultado a cada passo.
 
// Principais parâmetros:

// • Acumulador (acc): Guarda o resultado que está sendo construído ou transformado a cada volta.
// • Elemento atual (curr)(chamado de numero do exercício): O item do array que está sendo analisado no momento.
// • Valor inicial (initialValue)(usamos o 0 no exercício como valor inicial): O ponto de partida do acumulador. (Atenção: se você não informar o valor inicial, o TypeScript/JavaScript usará o primeiro item do array como o acumulador inicial).
const valorTotalVendido = listaVendas.filter(venda=>venda.status !== "CANCELADO").reduce((acc,numero)=>
(acc + (numero.valor_total))
,0)

console.log(`Total vendido é R$: ${valorTotalVendido.toFixed(2)}`)



// qtd_total_itens_vendidos
const quantidadeItensVendidos = listaVendas.filter(venda=>venda.status !== "CANCELADO").reduce((acc,current)=>(acc+(current.itens.reduce((geral,atual)=>(geral+(atual.quantidade)),0)
))
,0)

console.log(`A quantidade de itens vendidos é: ${quantidadeItensVendidos}`)

//ticket_medio
const vendasValidas =listaVendas.filter(venda=>venda.status !== "CANCELADO")

const ticketMedio = valorTotalVendido/vendasValidas.length

console.log(`O valor do ticket médio é: ${ticketMedio.toFixed(2)}`)

console.log()
console.log("Nível 2: Desafio 2")

//Método sort() organiza os elementos de um array.
// https://www.youtube.com/watch?v=Bp1s5VEp9RU  
const produtosRepetidos = listaVendas.flatMap(venda=>venda.itens).sort((a,b)=>b.preco_unitario-a.preco_unitario).map(produto=>produto.nome)

const produtosUnicos = new Set(produtosRepetidos)

const produtos_catalogo = [...produtosUnicos]

console.log(produtos_catalogo)

console.log()
console.log("Nível 3: Desafio 1")
//resumo_por_categoria

 const todos =  listaVendas.filter(venda=>venda.status !== "CANCELADO").flatMap(venda=>venda.itens)

console.log(todos)

type IResumoCategoria = {
    nome_categoria:string
    valor_total_vendido:number
    qtd_total_itens:number
}

const categoriaSemDuplicatas = [] as ICategoria[]

const resumoPorCategorias = [] as IResumoCategoria[]

listaVendas.forEach(venda=>venda.itens.forEach(item=>{ 
    const categoriaJaExistente = categoriaSemDuplicatas.some(categoria=>categoria.id_categoria === item.categoria.id_categoria) 
    if(!categoriaJaExistente){
        categoriaSemDuplicatas.push(item.categoria)

        const resumoDeCategoriaEncontrado = resumoPorCategorias.find(resumo=>resumo.nome_categoria === item.categoria.nome)

        if(resumoDeCategoriaEncontrado && venda.status !== "CANCELADO"){
            resumoDeCategoriaEncontrado.qtd_total_itens+=item.quantidade
            resumoDeCategoriaEncontrado.valor_total_vendido+=item.quantidade*item.preco_unitario
        }
        else{
            resumoPorCategorias.push({
                nome_categoria:item.categoria.nome,
                qtd_total_itens:item.quantidade,
                valor_total_vendido:item.quantidade*item.preco_unitario

            })
        }
    }
    // JSON.stringify(item.categoria)

}))

// const categoriaSemDuplicatas = [...new Set(categorias)].map(jsonStr=>JSON.parse(jsonStr))

// console.log(categoriaSemDuplicatas)

console.log(categoriaSemDuplicatas)
console.log(resumoPorCategorias.sort((a,b)=>a.valor_total_vendido>b.valor_total_vendido ?-1:1).map(categoria=>({...categoria,valor_total_vendido_real:categoria.valor_total_vendido.toLocaleString("pt-BR",{currency:"BRL",style:"currency"})})))





