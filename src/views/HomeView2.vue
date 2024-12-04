<script setup>
import { ref, onMounted } from 'vue'
import { useItemsStore } from '../stores/items'

const itemsStore = useItemsStore()
const newItemTitle = ref('')
const editingItem = ref(null)
const editTitle = ref('')

onMounted(() => {
  itemsStore.fetchItems()
})

function handleAddItem() {
  if (newItemTitle.value.trim()) {
    itemsStore.addItem(newItemTitle.value)
    newItemTitle.value = ''
  }
}

function startEdit(item) {
  editingItem.value = item.id
  editTitle.value = item.title
}

function handleUpdateItem(id) {
  if (editTitle.value.trim()) {
    itemsStore.updateItem(id, editTitle.value)
    editingItem.value = null
  }
}
</script>

<template>
  <main class="container">
    <h1>Items Manager</h1>

    <!-- Add new item form -->
    <div class="add-item">
      <input
        v-model="newItemTitle"
        placeholder="Enter new item title"
        @keyup.enter="handleAddItem"
      />
      <button @click="handleAddItem">Add Item</button>
    </div>

    <!-- Items list -->
    <div v-if="itemsStore.isLoading">Loading...</div>
    <ul v-else class="items-list">
      <li v-for="item in itemsStore.items" :key="item.id" class="item">
        <template v-if="editingItem === item.id">
          <input v-model="editTitle" @keyup.enter="handleUpdateItem(item.id)" />
          <button @click="handleUpdateItem(item.id)">Save</button>
          <button @click="editingItem = null">Cancel</button>
        </template>
        <template v-else>
          <span>{{ item.title }}</span>
          <div class="actions">
            <button @click="startEdit(item)">Edit</button>
            <button @click="itemsStore.deleteItem(item.id)">Delete</button>
          </div>
        </template>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.add-item {
  margin-bottom: 20px;
}

.add-item input {
  margin-right: 10px;
  padding: 5px;
}

.items-list {
  list-style: none;
  padding: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions button {
  margin-left: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

input {
  padding: 5px;
}
</style>
