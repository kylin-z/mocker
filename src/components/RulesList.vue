<template>
  <div class="rules-list">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="type" label="type" width="180"></el-table-column>
      <el-table-column prop="url" label="url"></el-table-column>
      <el-table-column prop="method" label="method"></el-table-column>
      <el-table-column prop="module" label="所属模块"></el-table-column>
      <el-table-column prop="status" label="启用/禁用">
        <el-switch
          v-model="tableData.status"
          active-color="#13ce66"
        >
        </el-switch>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rules-list",
  components: {},
  data() {
    return {
      tableData: [
        {
          type: "EQUAL",
          url: "/fms-rest/get-user",
          method: "GET",
          status: true,
          module: "fms-rest"
        }
      ]
    };
  }
};
</script>
