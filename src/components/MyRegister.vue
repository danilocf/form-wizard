<template>
  <my-form @submit="submit">

    <my-input 
      v-model="form.username"
      id="username"
      label="Username"
      />
    <my-input 
      type="email"
      v-model="form.email"
      id="email"
      label="Email"
      />
    <my-input 
      v-model="form.cellphone"
      id="cellphone"
      label="Cellphone"
      />
    <my-input 
      v-model="form.birthdate"
      id="birthdate"
      label="Birthdate"
      />
    <my-input 
      v-model="form.genre"
      id="genre"
      label="Genre"
      />
    <my-input 
      v-model="form.marital_status"
      id="marital_status"
      label="Marital status"
      />
    <my-input 
      type="password"
      v-model="form.password" 
      id="password"
      label="Password"
      />
      
  </my-form>
</template>

<script>
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'

export default {
  components: {
    MyForm,
    MyInput
  },
  data() {
    return {
      form: {
        username: null,
        email: null,
        cellphone: null,
        birthdate: null,
        genre: null,
        marital_status: null,
        password: null
      }
    }
  },
  methods: {
    submit() {
      console.log(JSON.stringify(this.form, null, '\t'))
    }
  }
}
</script>
