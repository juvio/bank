import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import AccountMenu from "@/components/AccountMenu";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const meta: Meta<typeof AccountMenu> = {
  title: "AccountMenu/AccountMenu",
  component: AccountMenu,
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

type Story = StoryObj<typeof AccountMenu>;

export const Default: Story = {};

export const Playground: Story = {
  args: {
    userName: "Mariana Oliveira",
    avatarContent: "M",
    navItems: [
      { id: "home", label: "Início" },
      { id: "tx", label: "Transações" },
      { id: "cards", label: "Cartões" },
    ],
    menuItems: [
      { id: "profile", label: "Perfil", icon: <AccountCircle fontSize="small" /> },
      { id: "settings", label: "Configurações", icon: <SettingsIcon fontSize="small" /> },
      { id: "logout", label: "Sair", icon: <LogoutIcon fontSize="small" /> },
    ],
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
