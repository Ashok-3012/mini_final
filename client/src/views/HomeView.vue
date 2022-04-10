<template>
  <div class="home">
    <h1>Welcome to Indian Railways!</h1> <!-- comment -->
    <button @click="login">login</button>
    <button @click="signUp">sign-up</button>
  </div>
</template>
<script src>
export default {
  name: 'HomeView',
  components: {

  },
  methods:{
    login(){
      this.$router.push({name:'login'}); 
    },
    signUp(){
      this.$router.push({name:'signup'});
    }
  }
}
</script>
