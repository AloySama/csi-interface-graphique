<template>
  <div class="PrintJson">
    {{output(syntaxHighlight(json))}}
  </div>
</template>
<!--TODO: Trouver comment mettre le Json dans la balise <p> + mettre des couleurs pour une meilleure lisibilité.-->
<script>

import App from "../App";

export default {
  data() {
    return {
      json: App.data().json,
    }
  },
  name: "PrintJson",
  methods: {
    output(inp) {
      let app = document.querySelector('#PrintJson');
      if (app == null) return;
      const pElement = document.createElement('pre');
      pElement.innerHTML = inp;
      app.appendChild(pElement);
    },
    syntaxHighlight(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }
  }
}
</script>

<style scoped>

pre {outline: 1px #ccc; padding: 5px; margin: 5px; overflow: hidden;  width: 12em; height: 6em;}
.string { color: green; }
.number { color: darkorange; }
.boolean { color: blue; }
.null { color: magenta; }
.key { color: red; }

p {
  position: center;
  width: 50em;
  height: 50em;
  border: dotted;
  overflow: scroll;
}
</style>