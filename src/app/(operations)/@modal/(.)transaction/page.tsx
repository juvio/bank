import ModalComponent from '@/components/Modal';

export default function TransactionModal() {
  return (
    <ModalComponent 
      title="Confirmar Transação"
      content="Deseja realmente criar esta transação? Esta ação não poderá ser desfeita."
      confirmText="Criar Transação"
      cancelText="Cancelar"
    />
  );
}
