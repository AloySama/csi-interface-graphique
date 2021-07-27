<template>
  <div id="container-bis" class="sticky-footer">
    <div id="contacts">
      <div id="contacts--contact">
        <p>{{industrie}}</p>
        <p>{{phone}}</p>
      </div>
      <div id="contacts--social" class="black" >
        <div class="black"><font-awesome-icon :icon="['fab', 'twitter']"/></div>
        <div><font-awesome-icon :icon="['fab', 'facebook']" /></div>
        <div><font-awesome-icon :icon="['fab', 'linkedin']" /></div>
      </div>
    </div>
    <div id="mentions">
      <p>{{ mention }}</p>
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
      mention : new Date().getFullYear() +' | mentions légales',
      date: 'Vous avez affiché cette page le ' + new Date().toLocaleString(),
    }
  }
}
</script>

<style scoped>

.black {
  color: black;
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
  margin-top: 58vh;
}

</style>