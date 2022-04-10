<template>
  <div class='form__group field'>
      <h1>Welcome to Indian Railways!</h1>
      <input type='number'  class='form__field' placeholder="Train_no" v-model="train.train_no"/><br>
      <input type='text' class='form__field' placeholder="Train_name" v-model="train.train_name"/><br>
      <input type='text' class='form__field' placeholder="Source" v-model="train.src"/><br>
      <input type='text' class='form__field' placeholder="Destination" v-model="train.dest"/><br>
      <input type='number' class='form__field' placeholder="Availability" v-model="train.avail"/><br>
      <input type='number' class='form__field' placeholder="Amount" v-model="train.amount"/><br>
      <button @click='addTrain'>Add Train</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            train:{
                train_no:'',
                train_name:'',
                src:'',
                dest:'',
                avail:'',
                freq:0,
                amount:''
            }
        }
    },
    methods:{
        async addTrain(){
            const res=await axios.post('http://localhost:8081/add_trains',this.train);
            if(res.data.status==='success'){
                alert("Train added");
                this.$router.replace('/admin');
            }
            else alert("Train already exists");
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