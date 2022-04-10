<template>
  <div class='form__group field'> 
      <h1>Welcome to Indian Railways!</h1>

      <input type='text' disabled class='form__field' :value='train_data.train_no'><br>
      <input type='text' disabled class='form__field' :value='train_data.train_name'><br>
      <input type='text' disabled class='form__field' :value='train_data.source'><br>
      <input type='text' disabled class='form__field' :value='train_data.destination'><br>

      <input type='text' class='form__field' placeholder="Date of Journey" v-model="date_"/><br>
      <input type='number' class='form__field' placeholder="Number of passengers" v-model="count"/><br>
      <h4 :disabled='true'>Total Amount:{{train_data.amount*count}}</h4>
      <p v-show='count!==0'>Passenger Details</p>

      <div v-for='i in count' :key='i'>


        <input type='text'  disabled class='form__field' :placeholder='i' ><br>
        <input type='text'  class='form__field' placeholder="Name" v-model="passenger_details[i-1].name"/><br>
        <input type='text' class='form__field' placeholder="Gender" v-model="passenger_details[i-1].gender"/><br>
        <input type='text' class='form__field' placeholder="Berth preference" v-model="passenger_details[i-1].berth"/><br>
        <input type='text' class='form__field' placeholder="Mail-id" v-model="passenger_details[i-1].mail_id"/><br>
        <p>------------------</p>

      </div>

      <button @click='bookTicket'>Book Ticket</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            train_data:JSON.parse(this.$route.params.train_data),
            count:0,
            date_:'',
            name:'',
            gender:'',
            berth:'',
            mail_id:'',
            train_no:'',
            train_name:'',
            src:'',
            dest:'',
            amount:'',
            flag:false,
            passenger_details:[]
        }
    },
    methods:{
        async bookTicket(){
            if(this.train_data.availability<this.count){
                this.count=0;
                alert("seats not available");
                return;
            }
            console.log(this.passenger_details);
            const result=await axios.post('http://localhost:8081/ticket',this.passenger_details);
            console.log(result);
            if(result.data.status==='success'){
                alert('Ticket confirmed');
                this.$router.replace('/search');
            }
        },
        Dummy(passenger){
          const obj={}
          obj.train_no=this.train_data.train_no;
          obj.train_name=this.train_data.train_name;
          obj.doj=this.date_;
          obj.src=this.train_data.source;
          obj.dest=this.train_data.destination;
          obj.name=passenger.name;
          obj.gender=passenger.gender;
          obj.berth=passenger.berth;
          obj.mail_id=passenger.mail_id;
          obj.amount=this.train_data.amount*this.count;
          console.log(obj);
          return obj;
        }
    },
    watch:{
      count:function (value) {
        console.log('called');
        this.passenger_details=[];
        for(let i=0;i<value;i++){
          this.passenger_details.push(this.Dummy({train_no:'',train_name:'',src:'',dest:'',DOJ:this.date_,name:'',gender:'',berth:'',mail_id:'',amount:''}));
        }
        console.log(this.passenger_details);
        console.log('passenger created');
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