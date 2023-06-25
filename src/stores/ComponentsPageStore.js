import { defineStore } from 'pinia'

export const useComponentsPageStore = defineStore('ComponentsPageStore', {
  state: () => ({
    links: [
      "palette",
      "typography",
      "buttons",
      "chips",
      "cards",
      "banners",
      "dialogs",
      "forms",
      "datepicker",
      "others"
    ],
    active: "",
    scroll_to: false,
    scroll_top: 0,
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    SET_LINKS(link) {
      this.links.push(link)
    },
    SET_ACTIVE(link) {
      this.active = link
    },
    SET_SCROLL_TO(value) {
      this.scroll_to = value
    },
    SET_SCROLL_TOP(value) {
      this.scroll_top = value
    }
  },
})