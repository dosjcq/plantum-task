<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="d-flex flex-column mb-6" flat tile>
        <v-text-field
          v-model="firstname"
          :rules="nameRules"
          :counter="10"
          label="Имя"
          required
        ></v-text-field>

        <v-text-field
          v-model="phoneNumber"
          :rules="phoneRules"
          :counter="10"
          label="Телефон"
          prefix="+7"
          required
        ></v-text-field>

        <v-select v-model="boss" label="Начальник"></v-select>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "EmployeeForm",
  data: () => ({
    valid: false,
    firstname: "",
    phoneNumber: "",
    boss: "",
    nameRules: [
      (v) => !!v || "Имя обязательно",
      (v) => v.length <= 10 || "Имя должно быть меньше 10 букв",
    ],
    phoneRules: [
      (v) => !!v || "Телефон обязателен",
      (v) => v.length <= 10 || "Телефон должен состоять из 10 цифр",
      (v) => !!Number(v) || "Можно вводить только цифры",
    ],
  }),
};
</script>

<style></style>
