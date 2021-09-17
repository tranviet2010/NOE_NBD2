<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-table :columns="columns" :data-source="menuList" bordered>
        <template v-for="col in ['name']" :slot="col" slot-scope="text">
          <div :key="col">
            <template>
              {{ text }}
            </template>
          </div>
        </template>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { mapGetters, mapState } from "vuex";
const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    width: "14.28%",
    scopedSlots: { customRender: "name" },
  },
];

export default {
  props: {},
  components: {},
  data() {
    return {
      columns,
    };
  },
  mounted() {
    this.$store.dispatch("menu/getMenus");
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getAllMenu",
    }),
    ...mapState({}),
  },

  methods: {
   
  },

  watch: {},
};
</script>

<style lang="less" scoped>
.title_search {
  height: 50px;
  background-color: #0066b3;
  color: #fff;
  line-height: 50px;
  .title_search_child {
    font-size: 16px;
    font-weight: 400;
    padding-left: 20px;
  }
}
.search_main {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .search_acc {
    width: 250px;
    height: 30px;
  }
  #type_acc,
  #status {
    width: 250px;
    height: 30px;
  }
  span {
    margin-right: 100px;
  }
}
</style>
