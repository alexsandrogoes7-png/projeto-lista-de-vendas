## 📌 Objetivos de Aprendizado

1. **Instalar o Node.js**
2. **Aprender a iniciar um projeto com npm e gerar o package.json**
3. **Aprender a instalar e configurar o typescript**
4. **Aprender a configurar o projeto de typescript para executar em modo DEV** (que fica escutando as modificações do arquivo) e o **modo build** que transpila de typescript para javascript
5. **Aprender a importar/ler um arquivo JSON para dentro de um arquivo typescript/javascript**
6. **Aprender a tipagem básica do Typescript como Type e Interface**



// A interface define o "contrato" de como uma venda deve ser.
// Dica: Usei Union Types no status ('PAGO' | 'PENDENTE') para deixar ainda mais seguro.

type StatusOption = "PAGO" | "PENDENTE" | "CANCELADO";

interface Venda {
  id_venda: number;
  valor: number;
  cliente: string;
  cidade: string;
  status: StatusOption;
}

// =======================================================
// ❌ QUANDO NÃO UTILIZAMOS TIPAGEM
// =======================================================
// O array aceita praticamente qualquer objeto. Erros só serão
// descobertos quando o código rodar (Runtime).
const vendasSemTipagem = [
  {
    id_venda: 1,
    valor: 238.43,
    cliente: "Joaquim",
    // ❌ Faltou a propriedade "cidade", mas o código não acusa erro.
    status: "PAGO",
  },
  {
    id_venda: "dois", // ❌ Aceitou string ao invés de number
    valor: 150.0,
    client: "Maria", // ❌ Erro de digitação: "client" ao invés de "cliente"
    cidade: "São Paulo",
    status: "FINALIZADO", // ❌ Status fora do padrão
  },
];

// =======================================================
// ✅ QUANDO UTILIZAMOS TIPAGEM
// =======================================================
// O TypeScript valida o código enquanto você digita (Compile time).
const vendasTipadas: Venda[] = [
  {
    id_venda: 1,
    valor: 238.43,
    cliente: "Joaquim",
    cidade: "Itabuna", // Se você esquecer de colocar a cidade, o VSCode aponta erro na hora.
    status: "PAGO",
  },
  {
    id_venda: 32,
    valor: 843.54,
    cliente: "Joaquim",
    cidade: "Itabuna",
    status: "PENDENTE",
  },
];

vendasTipadas.forEach((venda) => {
  if (venda.status === "CANCELADO") {
    return console.log("cancelado");
  }
  if (venda.status === "PAGO") {
    return console.log("pago");
  }
  return console.log("pendente");
});

// ⚠️ TENTATIVA DE ERRO COM TIPAGEM:
// Se tentarmos adicionar um objeto errado no array tipado,
// o TypeScript bloqueia imediatamente com sublinhado vermelho:
/*
vendasTipadas.push({
  id_venda: 2,
  valor: "150",        // ERRO: O tipo 'string' não pode ser atribuído a 'number'.
  client: "Maria",     // ERRO: 'client' não existe no tipo 'Venda'. Você quis dizer 'cliente'?
  cidade: "Salvador",
  status: "FINALIZADO" // ERRO: 'FINALIZADO' não é atribuível ao tipo do status.
});
*/