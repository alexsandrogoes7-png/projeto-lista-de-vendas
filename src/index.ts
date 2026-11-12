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

console.log(`O valor do ticket médio é: ${ticketMedio.toLocaleString("pt-BR",{currency:"BRL",style:"currency"})}`)

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

// console.log(todos)

type IResumoCategoria = {
    nome_categoria:string
    valor_total_vendido:number
    qtd_total_itens:number
}

const categoriaSemDuplicatas = [] as ICategoria[]

const resumoPorCategorias = [] as IResumoCategoria[]


//O método some() serve para verificar se pelo menos um dos elementos de um array passa em um teste implementado por uma função de callback
listaVendas.forEach(venda=>venda.itens.forEach(item=>{ 
    const categoriaJaExistente = categoriaSemDuplicatas.some(categoria=>categoria.id_categoria === item.categoria.id_categoria) 
    if(!categoriaJaExistente){
        categoriaSemDuplicatas.push(item.categoria)

        //O termo find() serve para encontrar e retornar um item específico dentro de um conjunto de dados, com base em uma condição definida por você.
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

console.log("Nível 3: Desafio 2")
//resumo_por_cidade

//cria interface
type IResumoCidade  = {
    nome_cidade:string
    produto_mais_vendido:{
        nome_produto:string
        valor_total_gerado:number
        qtd_total_vendida:number
    }
}

//coloca interface na constante como array
const resumoPorCidade = [] as IResumoCidade[]

//forEach para percorrer a lista de vendas

type IProdutoPorCidade = Record<number, {qtd:number, vr_total:number}>

//Um objeto que usa o nome da cidade como chave e guarda os produtos daquela cidade.
const produtosVendidosPorCidade:Record<string, IProdutoPorCidade> ={} 
listaVendas.forEach(venda=>{

    //retira os cancelados
    if(venda.status === "CANCELADO"){
        return
    }

    for (const produto of venda.itens) {
        // { "Itabuna":{ 203:{ qtd: 12, vr_total: 203 } }}
        if (!produtosVendidosPorCidade[venda.endereco_entrega.cidade]) {
            produtosVendidosPorCidade[venda.endereco_entrega.cidade] = {
                [produto.id_produto]: {
                    qtd: 0,
                    vr_total: 0
                }
            }
        }

        // 2. Atualiza a quantidade acumulada do produto na respectiva cidade
        const mapaCidade = produtosVendidosPorCidade[venda.endereco_entrega.cidade] as IProdutoPorCidade

        if(!mapaCidade[produto.id_produto]){
            mapaCidade[produto.id_produto] = {
                qtd:0,
                vr_total:0
            }
        }
        
        mapaCidade[produto.id_produto]!.qtd = (mapaCidade[produto.id_produto]?.qtd || 0) + produto.quantidade;

        const totalDesseProduto = mapaCidade[produto.id_produto]?.vr_total || 0

        // 3. Compara dinamicamente se este produto se tornou o mais vendido daquela cidade
        const atualCampeao = resumoPorCidade.find(cidade => cidade.nome_cidade === venda.endereco_entrega.cidade)

        //O !atualCampeao permite tratar o primeiro produto da cidade sem tentar compará-lo com um campeão que ainda não existe.
     
        if (!atualCampeao || (totalDesseProduto && totalDesseProduto > atualCampeao.produto_mais_vendido.qtd_total_vendida)) {
            resumoPorCidade.push({
                nome_cidade: venda.endereco_entrega.cidade,
                produto_mais_vendido:{
                    nome_produto:produto.nome,
                    qtd_total_vendida:produto.quantidade,
                    valor_total_gerado:produto.quantidade* produto.preco_unitario
                },
            })
        }
    }


    //atualiza nosso array de objetos
    // if(cidadeEncontrada){
    //     cidadeEncontrada.valor_total_vendido += venda.valor_total
    //     cidadeEncontrada.qtd_total_itens += venda.itens.reduce((quantidade,item)=>quantidade+item.quantidade,0)
     //joga os objetos para o nosso array   
    // }else{
        // percorrer os produtos das vendas e somar a qtd_total e valor total vendido 
        // resumoPorCidade.push({
        //     nome_cidade: venda.endereco_entrega.cidade,
        //     valor_total_vendido:venda.valor_total,
        //     qtd_total_itens:venda.itens.reduce((quantidade,item)=>quantidade+item.quantidade,0),
        //     produto_mais_vendido:{
        //         // nome_produto:venda.itens.map(item=>item.nome),
        //         nome_produto:"",
        //         valor_total_gerado:0,
        //         qtd_total_vendida:venda.itens.reduce((quantidade,item)=>quantidade+item.quantidade,0),
                
        //     }
        // })
    // }
    
})

console.log(resumoPorCidade)

console.log()
console.log("Nível 3:Desafio 2 - Entendendo")
type ICidadeResumida = {
    nome_cidade:string
    produto_mais_vendido:{
        nome_produto:string
        valor_total_gerado:number   
        qtd_total_vendida:number
    }
}

//[]: cria um array vazio. //ICidadeResumida[]: informa que esse array deverá conter elementos desse tipo. //"as" : faz uma afirmação de tipo para o TypeScript.
//estamos preparando um array para guardar os resumos das cidades.
const cidade_resumida = [] as ICidadeResumida[]

//IProduto_por_cidade: representa a organização dos produtos de uma cidade.
//Record<number, ...>: usa o ID numérico do produto como chave.
//Record é um tipo utilitário do TypeScript. Ele permite definir um objeto em que sabemos:
// - Qual será o tipo das chaves.
// - Qual será o tipo dos valores associados a essas chaves.
type IProduto_por_cidade = Record<number,{qtd:number,valor_total:number}>

const produtos_por_cidade:Record<string,IProduto_por_cidade>={}

//forEach() percorre cada venda da lista. A cada repetição, a variável venda representa uma venda diferente.
listaVendas.forEach(venda=>{
    //Se a venda estiver cancelada, o return encerra a execução daquela chamada do forEach e passa para a próxima venda.
    if (venda.status === "CANCELADO"){
        return
    }

    //for...of percorre os produtos de cada venda.
    for (const produto of venda.itens){

    }
})