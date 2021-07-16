<template>
  <form @submit.prevent="">
    <input id="fileUpload" type="file" hidden>
    <button class="hover-item" @click="ChooseFiles">Parcourir ...</button>
    <input type="submit" hidden>
    <button class="hover-item" :disabled="!ChooseFiles">OK</button>
  </form>
</template>

<script>
export default {
  name: "UploadFiles",
  methods: {
    ChooseFiles: function() {
      let doc = document.getElementById("fileUpload");
      if (doc == null) {
        console.error('Une erreur est survenue.');
        return false;
      }
      doc.click()
      return true;
    }
  }
}
</script>

<style scoped>

</style>