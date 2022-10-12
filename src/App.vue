<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>Plantum</h1>

      <v-spacer></v-spacer>

      <span class="mr-2">Test task</span>
    </v-app-bar>

    <v-main>
      <EmployeeForm />
      <EmployeeList />
    </v-main>
  </v-app>
</template>

<script>
import EmployeeForm from "./components/EmployeeForm.vue";
import EmployeeList from "./components/EmployeeList.vue";

export default {
  name: "App",

  components: {
    EmployeeForm,
    EmployeeList,
  },

  data: () => ({
    //
  }),
};
</script>
