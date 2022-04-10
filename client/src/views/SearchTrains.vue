<template>
  <div class='form__group field'> 
      <h1>Welcome to Indian Railways!</h1>
      <input type='text' class='form__field' placeholder="Enter the source" v-model="src"/><br>
      <input type='text' class='form__field' placeholder="Enter the destination" v-model="dest"/><br>
      <button @click='search'>Search Train</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            src:'',
            dest:''
        }
    },
    methods:{
        async search(){
            console.log(this.src);
            console.log(this.dest);
            const place={
                src:this.src,
                dest:this.dest
            }
            this.$router.push(`/listtrain/${JSON.stringify(place)}`);
        }

    }
}
</script>

<style>
    form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}
.form__field {
  font-family: inherit;
  width: 50%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  font-size: 1.3rem;
  color:'black';
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: 'black';
}
body {
  font-family: 'Poppins', sans-serif; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  background-color:#fff;
}
button {
  background-color: #4CAF50; /* Green */
  border: 100px;
  margin:50px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>