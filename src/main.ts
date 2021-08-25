import {createApp} from 'vue';
import App from './App.vue';
import './assets/style.css';
import './assets/FormStyle.css';
import './assets/UploadForm.css';
import './assets/settings.css';
import './assets/select.css';
import './assets/input.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faFontAwesome} from '@fortawesome/free-brands-svg-icons';

library.add(fas);
library.add(fab);
library.add(faFontAwesome);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');