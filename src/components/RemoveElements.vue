<template>
  <button class="hover-item">Supprimez société</button>
  <button class="hover-item">Supprimez établissement</button>
  <button class="hover-item">Supprimez restaurant</button>
</template>

<script>
export default {
  props: {
    jsonFile: {
      required: true
    }
  },
  name: "RemoveElements",
  data() {
    return {
      json: this.jsonFile
    }
  },
  methods: {
    RemoveObj(key) {
      delete this.json[key];
    }
  }
}
</script>

<style scoped>

</style>