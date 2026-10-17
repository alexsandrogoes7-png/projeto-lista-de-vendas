### Desafio de Análise de Dados com Typescript com Node.JS

**Objetivo:** Processar e extrair insights de uma base de dados de vendas (formato JSON/objetos) utilizando apenas a lógica nativa da linguagem.

#### Regras Fundamentais

- 🚫 **Não é permitido geração de código por IA** (O objetivo é desenvolver o seu raciocínio lógico).
- 🚫 **Não é permitido uso de bibliotecas de terceiros** (Nada de Frameworks, etc. Use apenas estruturas nativas como `for`, `if`, listas, objetos, listas e `set`).
- ⚠️ **Regra de Negócio de Ouro:** Vendas com status "CANCELADO" devem ser **ignoradas** em todos os cálculos financeiros e contagens de pedidos.

---

#### Nível 1: Exploração e Valores Únicos

1. Criar uma **lista** com os nomes de todas as **categorias** únicas vendidas.
2. Criar uma **lista** com os nomes de todas as **cidades** únicas onde houve entregas.
3. Criar uma **lista** com todos os **status** de venda únicos que existem na base.
4. Criar um **objeto** contendo a contagem de vendas por **método de pagamento** (Ex: `{"PIX": 8, "CARTAO_CREDITO": 5...}`).

#### Nível 2: Agregações Gerais e Catálogo

1. Criar um objeto `resumo_geral` com os seguintes atributos (ignorando os cancelados):

- `valor_total_vendido` (Soma de todas as vendas válidas)
- `qtd_total_itens_vendidos` (Soma das quantidades de todos os itens)
- `ticket_medio` (Valor total vendido dividido pelo número de pedidos válidos)

2. Criar uma lista chamada `produtos_catalogo` contendo os objetos de **todos os produtos únicos** que foram vendidos.

- _Regra extra:_ A lista não pode ter produtos duplicados e **deve estar ordenada** do produto mais caro para o mais barato.

#### Nível 3: Agrupamentos (Group By) e Rankings

1. Criar uma lista de objetos chamada `resumo_por_categoria` com os atributos:

- `nome_categoria`
- `valor_total_vendido`
- `qtd_total_itens`

2. Criar uma lista de objetos chamada `resumo_por_cidade` com os atributos:

- `nome_cidade`
- `valor_total_vendido`
- `qtd_total_itens`
- `produto_mais_vendido` -> (Um sub-objeto contendo: `nome_produto`, `valor_total_gerado`, `qtd_total_vendida` daquele produto específico na cidade).

3. Criar uma lista de objetos chamada `ranking_clientes` com as informações pessoais de cada cliente e um campo extra de resumo contendo:

- `qtd_compras_validas` (Quantos pedidos válidos ele fez)
- `total_comprado` (Soma em dinheiro de tudo que ele comprou)
- _Regra extra:_ Esta lista **deve estar ordenada** pelo `total_comprado`, mostrando primeiro o cliente que mais gastou e por último o que menos gastou.

#### Nível 4: Desafio Extra de Datas (Time Series Básico)

- Descobrir qual foi o **dia do mês** com o maior volume de faturamento. (Você precisará manipular a string ISO, ex: `"2026-09-18T14:30:00Z"`, para extrair apenas a data e agrupar as vendas por dia).