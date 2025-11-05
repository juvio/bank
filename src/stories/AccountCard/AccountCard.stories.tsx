import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import AccountCard from "@/components/AccountCard";
import ClientThemeProvider from "@/components/ClientThemeProvider";

const meta: Meta<typeof AccountCard> = {
  title: "AccountCard/AccountCard",
  component: AccountCard,
  decorators: [
    (Story: React.FC) => (
      <ClientThemeProvider>
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </ClientThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AccountCard>;

export const Playground: Story = {
  args: {
    accountBalance: 1250.75,
    accountName: "João Silva",
  },
  parameters: {
    docs: {
      description: {
        story:
          "🎮 **Playground interativo!** Use os controles abaixo para experimentar diferentes valores e ver como o componente se comporta em tempo real.",
      },
    },
  },
};
