<template>
  <form @submit.prevent="" class="upload" enctype="multipart/form-data">
    <input id="fileUpload" type="file" required accept=".json">
    <!--<button class="hover-item" @click="ChooseFiles">Parcourir ...</button>-->
    <input type="submit">
    <!--<button class="hover-item" disabled>OK</button> -->
  </form>
</template>

<script>
export default {
  data() {
    return {
    file: []
    }
  },
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