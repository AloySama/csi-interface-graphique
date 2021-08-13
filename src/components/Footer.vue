<template>
  <settings v-if="settings_" @settings_value="SetSettings">{{settings_}}</settings>
  <div id="container-bis" class="sticky-footer">
    <div id="contacts">
      <div id="contacts--contact">
        <p>{{industrie}}</p>
        <p>{{phone}}</p>
        <p :class="{gear: true, 'red-gear': settings_}"><a @click="OnClickButton"> <font-awesome-icon :icon="['fas', 'cog']"/></a></p>
      </div>
      <div id="contacts--social">
        <div id="twitter"><a :href="twitter" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" class="place-icons" :title="twitter_title"/></a></div>
        <div id="facebook"><a :href="facebook" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" class="place-icons" :title="facebook_title" /></a></div>
        <div id="linkedin"><a :href="linkedin" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin']" class="place-icons" :title="linkedin_title"/></a></div>
      </div>
    </div>
    <div id="mentions">
      <p>{{ mention }} Auteur: <a class="link" href="~">Aloïs BRENGARD</a></p>
    </div>
  </div>
</template>

<script>
import Settings from "@/components/settings";
export default {
  name: "FooterPage",
  emits: ['setting_value'],
  components: {Settings},
  data() {
    return {
      settings_: false,
      industrie : 'Cash Systemes Industrie',
      phone : '04.98.11.45.90',
      mention : new Date().getFullYear() +' | ',
      date: 'Vous avez affiché cette page le ' + new Date().toLocaleString(),
      twitter: 'https://twitter.com/cashsystemes',
      twitter_title: 'Twitter de CSI',
      facebook: 'https://www.facebook.com/cashsystemes/',
      facebook_title: 'Facebook de CSI',
      linkedin: 'https://www.linkedin.com/company/cashsystemesindustrie?trk=public_profile_topcard_current_company&originalSubdomain=fr',
      linkedin_title: 'LinkedIn de CSI'
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

.place-icons {
  margin-top: 8px;
  margin-left: 1px;
  font-size: 35px;
}

#twitter {
  color: #007BB5;
}

#linkedin {
  color: #007BB5;
}

#facebook {
  color: #3b5998;
}

#container-bis{
  padding-top:20px;
  width:100vw;
  color:white;
  background-color:#292354;
  display:flex;
  flex-direction:column;
  align-items:center;
}
#contacts{
  display:flex;
  justify-content:space-around;
  align-items:center;
  width:100%;
}
#contacts--contact{
  text-align:right;
}
#contacts--social{
  width:20%;
  display : flex;
  justify-content : space-between;
}
#contacts--social div{
  height:50px;
  width:50px;
  background-color:white;
  border-radius:50%;
}
#mentions p {
  font-size:.75em;
}

.sticky-footer {
  position: sticky;
  top: 100%;
  margin-bottom: -50px;
  margin-top: 58vh;
}

</style>