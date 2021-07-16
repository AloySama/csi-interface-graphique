<template>
  <form @submit.prevent="" class="form" id="MyForm">
    <input id="fileUpload" type="file" required accept=".json" @change="OnFileSelected">
    <!--<button class="hover-item" @click="ChooseFiles">Parcourir ...</button>-->
    <input type="submit">
    <!--<button class="hover-item" disabled>OK</button> -->
  </form>
</template>

<script>
export default {
  data() {
    return {
      file: null
    }
  },
  name: "UploadFiles",
  methods: {
    OnFileSelected(e) {
      console.log(e);
      this.file = e.target.files[0];
      console.log(this.file);
    }
  }
}
</script>

<style scoped>

</style>

<!--TODO: Faire communiquer le front et le back pour pouvoir modifier par la suite le json uploadé -->