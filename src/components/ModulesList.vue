<template>
  <div class="module-list">
    <el-button class="add-btn" type="text" icon="el-icon-plus" @click="createModule">新增模块</el-button>
    <el-table :data="modules" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
      <el-table-column label="PROXY_ADDRESS">
        <template slot-scope="scope">
          <span>{{getProxyAddress(scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm title="确定删除吗？" @onConfirm="() => removeModule(scope.row.id)">
            <el-button slot="reference" type="text" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
          <el-button type="text" icon="el-icon-edit" @click="() => editModule(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <module-detail
      @save="onSave"
      :data="currentData"
      :visible.sync="drawer"
      @closed="drawer = false"
    />
  </div>
</template>

<script>
import ModuleDetail from "./ModuleDetail";
import { getModules } from "../api";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "modules-list",
  components: {
    ModuleDetail
  },
  computed: {
    ...mapGetters(["modules"])
  },
  data() {
    return {
      drawer: false,
      currentData: undefined
    };
  },
  methods: {
    ...mapActions(["setModulesList", "removeModule"]),
    createModule() {
      this.currentData = undefined;
      this.drawer = true;
    },
    onSave() {
      this.setModulesList();
    },
    editModule(rowData) {
      this.currentData = rowData;
      this.drawer = true;
    },
    getProxyAddress(row) {
      try {
        const proxyConfig = JSON.parse(_.result(row, "proxyConfig", "{}"));
        const hostname = proxyConfig.hostname;
        const port = proxyConfig.port;
        return hostname + (port ? `:${port}` : "");
      } catch (e) {
      }
    }
  },
  mounted() {
    this.setModulesList();
  }
};
</script>

<style lang="scss" scoped></style>
