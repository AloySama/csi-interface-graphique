<template>
  <div class="container settings">
  <form @submit.prevent="">
    <div class="row">
      <div class="col-25">
        <label>Nom fichier arcole</label>
      </div>
      <div class="col-75">
        <input type="text" placeholder="Défaut : arcole.json" v-model="settings.name">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label>Nombre d'espace</label>
      </div>
      <div class="col-75">
        <input type="number" placeholder="Défaut : 2" min="1" max="10" v-model.number="settings.space">
      </div>
    </div>
    <input class="hover-item" type="submit" @click="$emit('settings_value', settings)">
  </form>
  </div>
</template>

<script>
export default {
  emits: ['settings_value'],
  name: "settings",
  data() {
    return {
      settings: {
        name: '',
        space: null
      }
    }
  }
}
</script>

<style scoped>

</style>