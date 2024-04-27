import { create } from "zustand";

export const useBackgroundBlurStore = create((set) => ({
  blur: 0,
  blurBg: () => set({ blur: 5 }),
  unblurBg: () => set({ blur: 0 }),
}));
