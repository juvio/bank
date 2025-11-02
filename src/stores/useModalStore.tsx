import { create } from 'zustand';

type ModalStore = {
  editModal: boolean;
  setEditModal: (editModal: boolean) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  editModal: false,
  setEditModal: (editModal: boolean) => set({ editModal: editModal }),
}));
