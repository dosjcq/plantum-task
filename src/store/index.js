import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: [],
    selectList: [],
  },
  getters: {
    getEmployeesList: (state) => state.employees,
    getSelectArr: (state) => state.selectList,
  },
  mutations: {
    addItem: (state, item) => {
      state.employees.push(item);
      state.selectList.push(item);
    },

    addEmployeeToBoss: (state, item) => {
      function parser(id, peoples, newEmployee) {
        for (let i = 0; i < peoples.length; i++) {
          if (peoples[i].id === id) {
            if (!peoples[i].children) {
              peoples[i].children = [];
            }
            peoples[i].children.push(newEmployee);
          }
          if (peoples[i].children) {
            parser(id, peoples[i].children, newEmployee);
          }
        }
      }
      parser(item.boss, state.employees, item);
      state.selectList.push(item);
    },
  },
  actions: {
    addNewEmployee: ({ commit }, payload) => {
      const newEmployee = {
        id: uuidv4(),
        ...payload,
      };

      if (payload.boss) {
        commit("addEmployeeToBoss", newEmployee);
      } else {
        commit("addItem", newEmployee);
      }
    },
  },
});
