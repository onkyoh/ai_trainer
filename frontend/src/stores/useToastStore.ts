import { create } from "zustand";

export interface IToast {
  message: string;
  success: boolean;
}

interface ToastStore {
  toast: IToast | null;
  notify: (toastObject: IToast) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  notify: (toastObject: IToast) => {
    set({ toast: toastObject });
    setTimeout(() => {
      set({ toast: null });
    }, 3000);
  },
}));

export default useToastStore;
