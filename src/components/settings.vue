<template>
  <div class="container marge">
  <form @submit.prevent="">
    <input-form :type="'text'" v-slot="string"> {{attribution(string.tab, 'name')}} Nom fichier arcole</input-form>
    <input-form :type="'number'" :max="10" v-slot="number"> {{attribution(number.tab, 'space')}} Nombre d'espace</input-form>
    <input-form :type="'checkbox'" v-slot="number"> {{attribution(number.tab, 'stringify')}} Stringify</input-form>
    <input class="btn green" type="submit" @click="$emit('settings_value', settings)">
  </form>
  </div>
</template>

<script type="ts">
import InputForm from "@/components/FormSlots/InputForm";
export default {
  components: {InputForm},
  emits: ['settings_value'],
  name: "settings",
  data() {
    return {
      settings: {
        name: 'arcole.json',
        space: 2,
        stringify: true
      }
    }
  },
  methods: {
    attribution(label, setting_prop) {
      this.settings[setting_prop] = label
      return null;
    }
  }
}
</script>

<style scoped>
.marge {
  margin-top: 65px;
}
</style>