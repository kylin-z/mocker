<template>
  <div class="rules-list">
    <el-button
      class="add-btn"
      type="text"
      icon="el-icon-plus"
      @click="createRule"
      >新增规则</el-button
    >
    <el-divider direction="vertical"></el-divider>
    <el-popconfirm title="确定删除吗？" @onConfirm="batchRemoveRule">
      <el-button slot="reference" type="text" icon="el-icon-delete"
        >删除</el-button
      >
    </el-popconfirm>
    <el-divider direction="vertical"></el-divider>
    <el-button
      class="add-btn"
      type="text"
      icon="el-icon-video-play"
      @click="()=>batchUpdateStatus(selectedRowKeys, true)"
      >启用</el-button
    >
    <el-divider direction="vertical"></el-divider>
    <el-button
      class="add-btn"
      type="text"
      icon="el-icon-video-pause"
      @click="()=>batchUpdateStatus(selectedRowKeys, false)"
      >禁用</el-button
    >
    <el-table
      :data="rules"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="type" label="TYPE" width="180"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
      <el-table-column prop="method" label="METHOD"></el-table-column>
      <el-table-column
        prop="module"
        label="所属模块"
        :filters="modulesFilterMap"
        :filter-method="filterModuleId"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <span>{{ getModuleName(scope.row.moduleId) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="启用/禁用">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            :value="scope.row.status"
            @change="value => batchUpdateStatus([scope.row.id], value)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="() => batchRemoveRuleById([scope.row.id])"
          >
            <el-button slot="reference" type="text" icon="el-icon-delete"
              >删除</el-button
            >
          </el-popconfirm>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="() => editRule(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <rule-detail
      @save="onSave"
      :data="currentData"
      :visible.sync="drawer"
      @closed="drawer = false"
    />
  </div>
</template>

<script>
import RuleDetail from "./RuleDetail";
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "rules-list",
  components: {
    RuleDetail
  },
  computed: {
    ...mapGetters(["rules", "modules"]),
    modulesFilterMap() {
      return this.modules.map(o => ({ text: o.name, value: o.id }));
    },
    selectedRowKeys() {
      return this.multipleSelection.map(o=>o.id);
    }
  },
  data() {
    return {
      drawer: false,
      currentData: undefined,
      multipleSelection: []
    };
  },
  methods: {
    ...mapActions([
      "setRulesList",
      "batchUpdateRuleById",
      "setModulesList",
      "batchRemoveRuleById"
    ]),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    createRule() {
      this.currentData = undefined;
      this.drawer = true;
    },
    onSave() {
      this.setRulesList();
    },
    editRule(rowData) {
      this.currentData = rowData;
      this.drawer = true;
    },
    batchUpdateStatus(ids = [], status) {
      this.batchUpdateRuleById({
        ids,
        rule: {
          status
        }
      });

    },
    getModuleName(moduleId) {
      const module = this.modules.find(m => m.id === moduleId);
      return _.result(module, "name");
    },
    filterModuleId(value, row) {
      return row.moduleId === value;
    },
    batchRemoveRule() {
      const ids = this.selectedRowKeys;
      this.batchRemoveRuleById(ids);
    }
  },
  mounted() {
    this.setRulesList();
    this.setModulesList();
  }
};
</script>

<style lang="scss" scoped></style>
