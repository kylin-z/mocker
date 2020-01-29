<template>
  <div class="rules-list">
    <el-button
      class="add-btn"
      type="text"
      icon="el-icon-plus"
      @click="createRules"
      >新增规则</el-button
    >
    <el-table :data="rules" stripe style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="type" label="type" width="180"></el-table-column>
      <el-table-column prop="url" label="url"></el-table-column>
      <el-table-column prop="method" label="method"></el-table-column>
      <el-table-column prop="module" label="所属模块"></el-table-column>
      <el-table-column prop="status" label="启用/禁用">
        <el-switch active-color="#13ce66"> </el-switch>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="() => removeRule(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <rule-detail @save="onSave" />
    </el-drawer>
  </div>
</template>

<script>
import RuleDetail from "./RuleDetail";
import { getRules } from "../api";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "rules-list",
  components: {
    RuleDetail
  },
  computed: {
    ...mapGetters(["rules"])
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    ...mapActions(["setRulesList", "removeRule"]),
    createRules() {
      this.drawer = true;
    },
    onSave() {
      this.setRulesList();
    }
  },
  mounted() {
    this.setRulesList();
  }
};
</script>

<style lang="scss" scoped></style>
