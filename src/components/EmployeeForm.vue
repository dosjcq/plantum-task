<template>
  <v-form ref="form" v-model="valid">
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

        <v-select
          v-model="boss"
          :items="getSelectArr"
          item-text="name"
          item-value="id"
          label="Начальник"
        ></v-select>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Отправить
        </v-btn>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EmployeeForm",
  data: () => ({
    valid: false,
    firstname: "",
    phoneNumber: "",
    boss: "",
    nameRules: [
      (v) => !!v || "Имя обязательно",
      (v) => (v && v.length <= 10) || "Имя должно быть меньше 10 букв",
    ],
    phoneRules: [
      (v) => !!v || "Телефон обязателен",
      (v) => (v && v.length === 10) || "Телефон должен состоять из 10 цифр",
      (v) => !!Number(v) || "Можно вводить только цифры",
    ],
  }),

  computed: {
    ...mapGetters(["getSelectArr"]),
  },

  methods: {
    ...mapActions(["addNewEmployee"]),
    validate() {
      const employee = {
        name: this.firstname,
        number: this.phoneNumber,
        boss: this.boss,
      };
      this.addNewEmployee(employee);
      this.reset();
      this.resetValidation();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
