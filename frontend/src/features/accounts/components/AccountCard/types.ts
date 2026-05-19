export type AccountCardProps = {
  accountBalance: number;
  accountName: string;
};

export type AccountCardViewProps = AccountCardProps & {
  firstName: string;
  formattedBalance: string;
  handleToggleBalance: () => void;
  showBalance: boolean;
};
