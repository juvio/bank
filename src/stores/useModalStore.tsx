import { create } from 'zustand';

type ModalStore = {
  addModal: boolean;
  setAddModal: (addModal: boolean) => void;
  editModal: boolean;
  setEditModal: (editModal: boolean) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  editModal: false,
  setEditModal: (editModal: boolean) => set({ editModal: editModal }),
  addModal: false,
  setAddModal: (addModal: boolean) => set({ addModal: addModal }),
}));
