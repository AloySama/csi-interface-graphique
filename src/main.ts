import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import './assets/FormStyle.css';
import './assets/UploadForm.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from '@fortawesome/free-solid-svg-icons'

library.add(fas);

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
