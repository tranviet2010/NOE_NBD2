<template>
  <page-header-wrapper>
    <!-- PageHeader 第二种使用方式 (v-slot) -->
    <template v-slot:content>
      TAB QUẢN LÝ
    </template>
    <a-card :bordered="false">
      <div class="search">
        <div class="title_search">
          <p class="title_search_child">Tìm kiếm người dùng</p>
        </div>
        <div class="search_main">
          <div>
            <span>Tài khoản:</span>
            <a-input-search class="search_acc" type="text" v-model="searchQuery" />
          </div>
          <div>
            <span>Loại người dùng:</span>
            <select name="" id="type_acc" v-model="type_accN">
              <option value="">--Lựa chọn--</option>
              <option v-for="(datas, index) in type_acc" :key="index" :value="datas">{{ datas }}</option>
            </select>
          </div>
          <div>
            <span>Trạng thái:</span>
            <select name="" id="status" v-model="type_sttN">
              <option value="">--Lựa chọn--</option>
              <option v-for="(datas, index) in type_stt" :key="index" :value="datas">{{ datas }}</option>
            </select>
          </div>
        </div>
      </div>
    </a-card>

    <a-card :bordered="false">
      <a-table :columns="columns" :data-source="searchQueryfor" bordered>
        <template
          v-for="col in ['name', 'age', 'address', 'account', 'type_account', 'status', 'time_create']"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">Save</a>
              <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a type="info" :disabled="editingKey !== ''" @click="() => info(record.key)">Info</a>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
              <a @click="() => delete1(record.key)">Delete</a>
            </span>
          </div>
        </template>
      </a-table>
      <div>
        <a-modal v-model="visible" title="Thông tin chi tiết người dùng" @width="1000">
          <!-- Tên tài khoản: <span>{{ data[valueClick].account }}</span> -->
        </a-modal>
      </div>
    </a-card>
  </page-header-wrapper>
</template>
<script>
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: '5%',
    scopedSlots: { customRender: 'stt' }
  },
  {
    title: 'Tài khoản',
    dataIndex: 'account',
    width: '14.28%',
    scopedSlots: { customRender: 'account' }
  },
  {
    title: 'Loại người dùng',
    dataIndex: 'type_account',
    width: '14.28%',
    scopedSlots: { customRender: 'type_account' }
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'name',
    width: '14.28%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: '14.28%',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'time_create',
    width: '14.28%',
    scopedSlots: { customRender: 'time_create' }
  },
  {
    title: 'Trạng thái',
    dataIndex: 'operation',
    width: '14.28%',
    scopedSlots: { customRender: 'operation' }
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    stt: i,
    account: `Neo${i}`,
    type_account: i % 2 === 0 ? 'Admin' : 'Normal',
    key: i.toString(),
    name: `Neo${i}`,
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    age: 32,
    address: `London Park no. ${i}`
  })
}
export default {
  props: ['data1', 'dataInput1'],
  data() {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      type_accN: '',
      type_sttN: '',
      type_acc: ['Admin', 'Normal'],
      type_stt: ['Active', 'Inactive'],
      columns,
      editingKey: '',
      visible: false,
      valueClick: '',
      searchQuery: null
    }
  },
  mounted() {
    console.log('ádfasdfsadfasdf', this.data)
    console.log('data1', this.data1)
  },
  computed: {
    searchQueryfor() {
      if (this.searchQuery) {
        return this.data.filter(val => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every(v => val.account.toLowerCase().includes(v))
        })
      }
      if (this.type_accN) {
        return this.data.filter(val => val.type_account == this.type_accN)
      }
      if (this.type_sttN) {
        return this.data.filter(val => val.status == this.type_sttN)
      } else {
        return this.data
      }
    }
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    info(key) {
      this.visible = true
      this.valueClick = key
    },
    delete1(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key !== item.stt)[0]
      if (target) {
        this.data = target
      }
    },
    save(key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter(item => key === item.key)[0]
      const targetCache = newCacheData.filter(item => key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      this.editingKey = ''
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    }
  }
}
</script>
<style lang="less" scoped>
.editable-row-operations a {
  margin-right: 8px;
}
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
