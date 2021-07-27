<template>
  <div id="container-bis" class="sticky-footer">
    <div id="contacts">
      <div id="contacts--contact">
        <p>{{industrie}}</p>
        <p>{{phone}}</p>
      </div>
      <div id="contacts--social">
        <div id="twitter"><a :href="twitter" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" class="place-icons"/></a></div>
        <div id="facebook"><a :href="facebook" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" class="place-icons"/></a></div>
        <div id="linkedin"><a :href="linkedin" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin']" class="place-icons"/></a></div>
      </div>
    </div>
    <div id="mentions">
      <p>{{ mention }} <a class="link" href="~">Auteur: Aloïs BRENGARD</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterPage",
    data() {
    return {
      industrie : 'Cash Systemes Industrie',
      phone : '04.98.11.45.90',
      mention : new Date().getFullYear() +' | ',
      date: 'Vous avez affiché cette page le ' + new Date().toLocaleString(),
      twitter: 'https://twitter.com/cashsystemes',
      facebook: 'https://www.facebook.com/cashsystemes/',
      linkedin: 'https://www.linkedin.com/company/cashsystemesindustrie?trk=public_profile_topcard_current_company&originalSubdomain=fr',
    }
  }
}
</script>

<style scoped>

.place-icons {
  margin-top: 7px;
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
  height:30px;
  width:30px;
  background-color:white;
  border-radius:50%;
}
#mentions p {
  font-size:0.5em;
}

.sticky-footer {
  position: sticky;
  top: 100%;
  margin-bottom: -50px;
  margin-top: 58vh;
}

</style>