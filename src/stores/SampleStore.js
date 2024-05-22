import { defineStore } from 'pinia'
import _ from 'lodash'

export const useSampleStore = defineStore('SampleStore', {
  state: () => ({
    sample_data
   }),
  getters: { 
    sample_getter() {
      return this.sample_data
    },
  },
  actions: {
    sampleAction() { },
  },
})