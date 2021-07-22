<template>
  <strong>Cliquer bien sur 'envoyer', ou le fichier ne sera pas enregistrer</strong>
    <form @submit.prevent="" class="form" id="MyForm">
      <div class="fileUpload">
        <input name="UploadFile" id="UploadFiles" type="file" class="" required accept=".json" @change="loadTextFromFile">
        <label class="label-upload" for="UploadFiles">Choisir un fichier</label> &nbsp;
      </div>
      <button class="hover-item" @click="upload">envoyer</button>
    </form>

  <div  class="overflow" id="container" style="height: 500px; min-width: 500px"></div>

</template>

<script>
export default {
  emits: ['upload-json'] ,
  data() {
    return {
      json: null
    }
  },
  components: {
    FileReader
  },
  name: "UploadFiles",
  methods: {
    loadTextFromFile(ev) {

      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        document.getElementById('container').textContent = e.target.result;
      }
      reader.readAsText(file, 'utf-8');
    },
    upload() {
      let doc = document.getElementById('container').innerText;
      if (!(doc.length === 0)) {
        this.json = doc;
        this.$emit('upload-json', this.json);
      }
    }
  }
}

</script>


<style>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>

<!--TODO: Faire communiquer le front et le back pour pouvoir modifier par la suite le json uploadé -->