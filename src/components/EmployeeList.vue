<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="employees"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="id"
    show-expand
    :custom-sort="customSort"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-treeview :items="item.children" activatable transition>
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children"> mdi-account </v-icon>
          </template>
        </v-treeview>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      dessertHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Number", value: "number" },
        { text: "", value: "data-table-expand" },
      ],

      employees: [
        {
          name: "Artem",
          number: 7,
          id: 0,
          children: [
            {
              name: "Avan",
              number: 6,
              id: 11,
            },
            {
              name: "Cvanik",
              number: 5,
              id: 12,
              children: [
                {
                  name: "Dvan",
                  number: 4,
                  id: 111,
                },
                {
                  name: "Bvanik",
                  number: 3,
                  id: 121,
                },
              ],
            },
          ],
        },
        {
          name: "Antonio",
          number: 2,
          id: 2,
          children: [
            {
              name: "Avan",
              number: 1,
              id: 11,
            },
          ],
        },
        ,
      ],
    };
  },
  methods: {
    customSort(items, index, isDesc) {
      console.log(index);
      if (index[0] === "name") {
        if (isDesc[0]) {
          return items.sort(this.sortASCByName);
        } else {
          return items.sort(this.sortDESCByName);
        }
      } else {
        if (isDesc[0]) {
          return items.sort(this.sortASCByName);
        } else {
          return items.sort(this.sortDESCByName);
        }
      }
    },

    sortASCByName(a, b) {
      console.log(a, b);

      if (!!a.children) {
        a.children.sort(this.sortASCByName);
      }
      if (!!b.children) {
        b.children.sort(this.sortASCByName);
      }

      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      return nameA.localeCompare(nameB);
    },
    sortDESCByName(a, b) {
      if (!!a.children) {
        a.children.sort(this.sortDESCByName);
      }
      if (!!b.children) {
        b.children.sort(this.sortDESCByName);
      }

      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      return nameB.localeCompare(nameA);
    },

    sortASCByNumber(a, b) {
      if (!!a.children) {
        a.children.sort(this.sortASCByNumber);
      }
      if (!!b.children) {
        b.children.sort(this.sortASCByNumber);
      }

      return a - b;
    },
    sortDESCByNumber(a, b) {
      if (!!a.children) {
        a.children.sort(this.sortDESCByNumber);
      }
      if (!!b.children) {
        b.children.sort(this.sortDESCByNumber);
      }

      return b - a;
    },
  },
};
</script>
