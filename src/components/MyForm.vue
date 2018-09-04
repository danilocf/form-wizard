<template>
  <form 
    class="my-form" 
    @submit.prevent="submit"
    >

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

    <button 
      type="submit"
      class="my-form__submit"
      >
      Submit
    </button>
  </form>
</template>

<script>
import MyInput from '@/components/MyInput'

export default {
  components: {
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
  // updated() {
  //   console.log(JSON.stringify(this.form, null, '\t'))
  // },
  methods: {
    submit() {
      console.log('submit')
    }
  }
}
</script>

<style lang="scss">
.my-form {
  max-width: 600px;
  margin: 0 auto;
}

.my-form__submit {
  font-size: 1.4rem;
  width: 100%;
  background: lightgreen;
  padding: 1rem;
  margin: 1.5rem 0;
}
</style>
