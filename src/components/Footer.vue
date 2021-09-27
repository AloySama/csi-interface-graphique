<template>
  <settings v-if="settings_" @settings_value="SetSettings">{{settings_}}</settings>
  <div id="container-bis" class="sticky-footer">
    <div id="contacts">
      <div id="contacts--contact">
        <p>{{industrie}}</p>
        <p>{{phone}}</p>
        <p :class="{gear: true, 'red-gear': settings_}"><a @click="OnClickButton"> <font-awesome-icon :icon="['fas', 'cog']"/></a></p>
      </div>
      <div id="contacts--social"><slot name="social-media" :twitter="twitter" :facebook="facebook" :linkedin="linkedin"></slot></div>
    </div>
    <div id="mentions">
      <p>{{ mention }} | Auteur: Aloïs BRENGARD<br>{{date}}</p>
    </div>
  </div>
</template>

<script type="ts">
import Settings from "@/components/settings";
export default {
  created() {
    const date = new Date().toLocaleString().split(',')
    this.date = 'Vous avez affiché cette page le ' + date[0] + ' à' + date[1]
  },
  name: "FooterPage",
  emits: ['setting_value'],
  components: {Settings},
  data() {
    return {
      settings_: false,
      industrie : 'Cash Systemes Industrie',
      phone : '04.98.11.45.90',
      mention : new Date().getFullYear(),
      date: '',
      twitter: 'https://twitter.com/cashsystemes',
      facebook: 'https://www.facebook.com/cashsystemes/',
      linkedin: 'https://www.linkedin.com/company/cashsystemesindustrie?trk=public_profile_topcard_current_company&originalSubdomain=fr',
    }
  },
  methods: {
    SetSettings(setting) {
      this.$emit('setting_value', setting)
      setTimeout(() => this.settings_ = false, 0)
    },
    OnClickButton() {
      this.settings_ = !this.settings_
    }
  }
}
</script>

<style scoped>

#container-bis {
  padding-top: 20px;
  width: 100vw;
  margin-left: -10px;
  color: white;
  background-color: #1e1e24;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#contacts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

#contacts--contact {
  text-align: right;
}

#contacts--social {
  width: 20%;
  display: flex;
  justify-content: space-between;
}

#contacts--social div {
  height: 50px;
  width: 50px;
  background-color: white;
  border-radius: 50%;
}

#mentions p {
  font-size: .75em;
}

.sticky-footer {
  position: sticky;
  top: 100%;
  margin-bottom: -50px;
  margin-top: 58vh;
}
</style>