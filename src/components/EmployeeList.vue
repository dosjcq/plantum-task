<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="getEmployeesList"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="id"
    show-expand
    :custom-sort="customSort"
    class="elevation-1"
    :footer-props="{
      'items-per-page-text': 'Количество работников на странице',
    }"
  >
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-treeview :items="item.children" activatable transition>
          <template v-slot:label="{ item }">
            <span>{{ item.name + " " + item.number }}</span>
          </template>
        </v-treeview>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      expanded: [],
      singleExpand: true,
      dessertHeaders: [
        {
          text: "Имя",
          align: "start",
          value: "name",
        },
        { text: "Номер телефона", value: "number" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getEmployeesList"]),
  },
  methods: {
    customSort(items, index, isDesc) {
      if (index[0] === "name") {
        return items.sort(this.sortByName(isDesc[0]));
      } else {
        return items.sort(this.sortByNumber(isDesc[0]));
      }
    },

    sortByName(isDesc) {
      return (a, b) => {
        if (!!a.children) {
          a.children.sort(this.sortByName(isDesc));
        }
        if (!!b.children) {
          b.children.sort(this.sortByName(isDesc));
        }

        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        return isDesc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      };
    },

    sortByNumber(isDesc) {
      return (a, b) => {
        if (!!a.children) {
          a.children.sort(this.sortByNumber(isDesc));
        }
        if (!!b.children) {
          b.children.sort(this.sortByNumber(isDesc));
        }

        return isDesc
          ? Number(a.number) - Number(b.number)
          : Number(b.number) - Number(a.number);
      };
    },
  },
};
</script>
