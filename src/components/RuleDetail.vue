<template>
  <el-drawer
    :visible.sync="visible"
    :with-header="false"
    @closed="onDrawerClosed"
    @opened="onDrawerOpened"
  >
    <div class="rules-detail">
      <h1>编辑规则</h1>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="type">
          <el-select v-model="form.type">
            <el-option
              v-for="type in types"
              :value="type"
              :key="type"
              :label="type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="method">
          <el-select v-model="form.method">
            <el-option
              v-for="method in methods"
              :value="method"
              :key="method"
              :label="method"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属模块">
          <el-select v-model="form.moduleId">
            <el-option
              v-for="module in modules"
              :value="module.id"
              :key="module.id"
              :label="module.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用/禁用">
          <el-switch v-model="form.status" active-color="#13ce66"> </el-switch>
        </el-form-item>
        <el-form-item label="mock数据">
          <el-input
            type="textarea"
            :rows="4"
            v-model="form.response.body"
            @blur="onResponseBodyBlur"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { types, methods } from "../constants";
import { saveRule } from "../api";
import Hjson from "hjson";
import _ from 'lodash';
import { mapGetters, mapActions } from "vuex";

const defaultFormValue = {
  response: {}
};

export default {
  name: "rule-detail",
  components: {},
  data() {
    return {
      types,
      methods,
      form: _.cloneDeep(defaultFormValue)
    };
  },
  computed: {
    ...mapGetters(["modules"])
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return _.cloneDeep(defaultFormValue);
      }
    }
  },
  methods: {
    onResponseBodyBlur() {
      let obj = Hjson.parse(this.form.response.body);
      let response = Hjson.stringify(obj, {
        separator: true
      });
      this.form.response.body = response;
    },
    async onSave() {
      let res = await saveRule(this.form);
      this.$emit("save", res);
    },
    onCancel() {
      this.onDrawerClosed();
    },
    resetForm() {
      this.form = _.cloneDeep(defaultFormValue);
    },
    onDrawerClosed() {
      this.$emit("closed");
      this.resetForm();
    },
    onDrawerOpened() {
      this.form = _.cloneDeep(this.data);
    }
  }
};
</script>
<style lang="scss" scoped>
.rules-detail {
  padding: 16px;
  .el-select {
    width: 100%;
  }
}
</style>
