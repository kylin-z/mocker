<template>
  <div class="rules-list">
    <el-button
      class="add-btn"
      type="text"
      icon="el-icon-plus"
      @click="createRule"
      >新增规则</el-button
    >
    <el-table :data="rules" stripe style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="type" label="TYPE" width="180"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
      <el-table-column prop="method" label="METHOD"></el-table-column>
      <el-table-column prop="module" label="所属模块">
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
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="() => removeRule(scope.row.id)"
            >删除</el-button
          >
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
import _ from 'lodash';
import { mapGetters, mapActions } from "vuex";
export default {
  name: "rules-list",
  components: {
    RuleDetail
  },
  computed: {
    ...mapGetters(["rules", "modules"])
  },
  data() {
    return {
      drawer: false,
      currentData: undefined
    };
  },
  methods: {
    ...mapActions([
      "setRulesList",
      "removeRule",
      "batchUpdateRuleById",
      "setModulesList"
    ]),
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
    }
  },
  mounted() {
    this.setRulesList();
    this.setModulesList();
  }
};
</script>

<style lang="scss" scoped></style>
