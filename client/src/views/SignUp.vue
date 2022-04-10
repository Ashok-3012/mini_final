<template>
  <div class='form__group field'>
      <h1>Welcome to Indian Railways!</h1>
      <input type='text'  class='form__field' placeholder="Name" v-model="user.name"/><br>
      <input type='text' class='form__field' placeholder="User_id" v-model="user.user_id"/><br>
      <input type='password' class='form__field' placeholder="Password" v-model="user.pass"/><br>
      <input type='password' class='form__field' placeholder="Confirm Password" v-model="user.cpass"/><br>
      <input type='text' class='form__field' placeholder="DOB" v-model="user.dob"/><br>
      <input type='text' class='form__field' placeholder="Gender" v-model="user.gender"/><br>
      <input type='number' class='form__field' placeholder="Contact" v-model="user.contact"/><br>
      <input type='tel' class='form__field' placeholder="Email-id" v-model="user.email_id"/><br>
      <button @click='signUp'>Create Account</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            user:{
                name:'',
                user_id:'',
                pass:'',
                cpass:'',
                dob:'',
                gender:'',
                contact:'',
                email_id:'',
            }
        }
    },
    methods:{
        async signUp(){
            if(this.user.pass!==this.user.cpass) {
                alert("Password and Confirm password doesn't match");
            }
            const res=await axios.post('http://localhost:8081/sign_up',this.user);
            console.log(res.data.status);
            if(res.data.status==='failure'){
                alert("User alreasy exists!Please login");
            }
            else{
              alert("Account created");
              this.$router.replace({name:'login'});
            }
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