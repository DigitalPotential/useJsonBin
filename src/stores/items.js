import { ref } from 'vue'
import { defineStore } from 'pinia'
import { itemsApiPinia } from '../services/itemsApiPinia'

export const useItemsStore = defineStore('items', () => {
  const items = ref([])
  const isLoading = ref(false)

  async function fetchItems() {
    isLoading.value = true
    try {
      items.value = await itemsApiPinia.fetchItems()
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addItem(title) {
    const newItem = {
      id: `item${Date.now()}`,
      title,
    }

    try {
      items.value = await itemsApiPinia.createItem(items.value, newItem)
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  async function updateItem(id, newTitle) {
    try {
      items.value = await itemsApiPinia.updateItem(items.value, id, { title: newTitle })
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  async function deleteItem(id) {
    try {
      items.value = await itemsApiPinia.deleteItem(items.value, id)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return { items, isLoading, fetchItems, addItem, deleteItem, updateItem }
})