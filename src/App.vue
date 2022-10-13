<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>Plantum</h1>

      <v-spacer></v-spacer>

      <span class="mr-2">Test task</span>
    </v-app-bar>

    <v-main class="mt-10">
      <v-container>
        <v-row align-content="start" justify="center">
          <v-card>
            <v-btn
              color="primary"
              block
              @click="isFormVisible = !isFormVisible"
            >
              {{ isFormVisible ? "Закрыть форму" : "Открыть форму" }}
            </v-btn>
            <EmployeeList />
          </v-card>
          <EmployeeForm v-if="isFormVisible" />
        </v-row>
      </v-container>
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
    isFormVisible: false,
  }),
};
</script>
