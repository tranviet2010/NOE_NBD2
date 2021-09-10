<template>
  <page-header-wrapper>
    <!-- PageHeader 第二种使用方式 (v-slot) -->
    <a-card :bordered="false">
      <Step1 :data1="account" />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import Step1 from '@/views/form/stepForm/Step1.vue'
export default {
  props: {},
  components: {
    Step1
  },
  data() {
    return {
      type_acc: '',
      account: '',
      change: 'sdfsadfsda',
      data: [
        { id: 1, account: 'manhnd', type_acc: 'Admin', username: 'manhnd', status: 'Active', time_create: '' },
        { id: 2, account: 'vietnd', type_acc: 'Normal Admin', username: 'vietnd', status: 'Inactive', time_create: '' }
      ]
    }
  },
  mounted() {
    this.handChange = e => {
      console.log('type_acc', e.target.value)
    }
    console.log('this.account', this.account)
    console.log('type_acc', this.change)
  },
  computed: {
    chage() {
      return (this.change = this.account)
    },
    handChange1(e) {
      return (this.change = e.target.value)
    }
  },
  watch: {
    handChange1(e) {
      console.log('type_acc', e, target.value)
    }
  }
}
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
