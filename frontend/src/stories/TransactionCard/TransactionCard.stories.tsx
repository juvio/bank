import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TransactionCard } from "@features/transactions";
import { ClientThemeProvider } from '@components';

const meta: Meta<typeof TransactionCard> = {
  title: "Transaction/TransactionCard",
  component: TransactionCard,
  decorators: [
    (Story: React.FC) => (
      <ClientThemeProvider>
        <div style={{ padding: 16, maxWidth: 600 }}>
          <Story />
        </div>
      </ClientThemeProvider>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/transactions",
        query: {},
      },
    },
    docs: {
      description: {
        component:
          "Componente para exibir um cartão de transação com informações como tipo, valor, descrição e data. Inclui botões de ação para visualizar, editar e deletar.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["deposit", "withdraw", "transfer", "payment"],
      description: "Tipo da transação",
    },
    amount: {
      control: "number",
      description: "Valor da transação",
    },
    description: {
      control: "text",
      description: "Descrição da transação",
    },
    date: {
      control: "text",
      description: "Data da transação (formato YYYY-MM-DD)",
    },
    id: {
      control: "number",
      description: "ID único da transação",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TransactionCard>;

export const Playground: Story = {
  args: {
    id: 1,
    type: "deposit",
    amount: 100.0,
    date: "2024-01-15",
  },
  parameters: {
    docs: {
      description: {
        story:
          "🎮 **Playground interativo!** Use os controles abaixo para experimentar diferentes valores e ver como o componente se comporta em tempo real. Altere o tipo, valor, descrição e data para testar todas as possibilidades.",
      },
    },
  },
};

export const LargeAmount: Story = {
  args: {
    id: 7,
    type: "deposit",
    amount: 15000.0,
    description: "Depósito de salário",
    date: "2024-01-01",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo com valor alto - mostra como o componente se comporta com valores grandes.",
      },
    },
  },
};

export const SmallAmount: Story = {
  args: {
    id: 8,
    type: "payment",
    amount: 5.5,
    description: "Pagamento de café",
    date: "2024-01-20",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo com valor baixo - mostra como o componente se comporta com valores pequenos.",
      },
    },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TransactionCard id={1} type="deposit" amount={1500.0} description="Depósito via PIX" date="2024-01-18" />
      <TransactionCard
        id={2}
        type="withdraw"
        amount={100.0}
        description="Saque no caixa eletrônico"
        date="2024-01-16"
      />
      <TransactionCard
        id={3}
        type="transfer"
        amount={250.0}
        description="Transferência para João Silva"
        date="2024-01-19"
      />
      <TransactionCard id={4} type="payment" amount={89.9} description="Pagamento de conta de luz" date="2024-01-17" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visualização de todos os tipos de transação juntos para comparação visual.",
      },
    },
  },
};
