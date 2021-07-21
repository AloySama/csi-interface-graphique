<template>
  <div>
    <form @submit.prevent="" class="form" id="MyForm">
      <input name="UploadFile" id="UploadFiles" type="file" required accept=".json" @change="loadTextFromFile">
    </form>
  </div>
  <div id="container" style="height: 500px; min-width: 500px"></div>
</template>

<script>
export default {
  data: () => ({ text: "" }),
    components: {
      FileReader
  },
  name: "UploadFiles",
  methods: {
    loadTextFromFile(ev) {

      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        document.getElementById('container').innerHTML=e.target.result;
      }
      reader.readAsText(file, 'utf-8');
    }
  }
}

</script>


<style>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  /* Fancy button style 😎 */
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