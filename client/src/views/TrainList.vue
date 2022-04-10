<template>
<div>
<div v-show="!visible">No trains Available!</div>
  <div v-show="visible">
    <h4>Available Trains!</h4>
    <table id='train'>
        <tr>
            <th>Train No</th>
            <th>Train Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Availability</th>
            <th>Amount</th>
        </tr>
        <tr v-for='train in data' :key='train.id'>
            <td v-for='(value) in train' @click='bookTicket(train)' :key='train.id'>
               {{value}}
            </td>
        </tr>
    </table>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            place:JSON.parse(this.$route.params.place),
            data:[],
            visible:true
        }
    },
    async created(){
        const res=await axios.post('http://localhost:8081/train_search_display',{source:this.place.src,destination:this.place.dest});
        console.log(res);
        if(res.data.length===0){
            this.visible=false;
        }
        this.data=res.data;
    },
    methods:{
        bookTicket(train_data){
            this.$router.push(`/book/${JSON.stringify(train_data)}`);
        }
    }
    
}
</script>

<style>
    #train {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 70%;
  margin-left: auto; 
  margin-right: auto;
}


#train td, #train th {
  border: 1px solid rgb(204, 228, 172);
  padding: 8px;
  text-align:center;
  
}

th {
  text-align: center;
}

#train tr:nth-child(even){background-color: #77ee81;}

#train tr:hover {background-color: rgb(161, 214, 111);}

#train th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #1d5e09;
  color: white;
}
</style>