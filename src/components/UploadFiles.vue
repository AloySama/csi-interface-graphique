<template>
  <div class="white">Cliquer bien sur <u>envoyer</u>, ou le fichier ne sera pas enregistrer</div>
    <form @submit.prevent="" class="form" id="MyForm">
      <div class="fileUpload" id="dropContainer">
        <input name="UploadFile" id="UploadFiles" type="file" required accept=".json" @change="loadTextFromFile">
        <label class="btn purple" for="UploadFiles"><font-awesome-icon :icon="['fas', 'search']" /> Parcourir ...</label> &nbsp;
      </div>
    </form>
  <div class="overflow" id="container" style="height: 340px; min-width: 500px">Aperçu du fichier json ici</div>
  <input type="submit" class="btn green" @click="upload">
  <div >
<!--    <div class="black">OU</div>-->
    <div class="black top-marge">Créer un nouveau fichier json vide</div>
    <button class="btn green" @click="SetJson">Créer</button>
  </div>
</template>

<script type="ts">

export default {
  emits: ['upload-json'],
  data() {
    return {
      json: null
    }
  },
  components: {FileReader},
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
      if (doc.length > 0) {
        this.json = doc;
        this.$emit('upload-json', this.json);
      }
    },
    SetJson() {
      this.json = [];
      this.$emit('upload-json', this.json);
    }
  }
}
</script>

<style scoped>
.black {
  margin-left: 75px;
  position: center;
  color: black;
  font-weight: bold;
  font-size: 50px;
}
.top-marge {
  margin-top: 50px;
  margin-left: 120px;
}
</style>