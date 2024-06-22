import { defineStore } from 'pinia';

export const useActionStore = defineStore('action', {
  state: () => ({
    data: 'mouse',
  }),
  actions: {
    updateData(newData) {
      this.data = newData;
      console.log(this.data)
    },
  },
});