<template>
  <el-drawer
    :visible.sync="visible"
    :with-header="false"
    @closed="onDrawerClosed"
    @opened="onDrawerOpened"
  >
    <div class="modules-detail">
      <h1>编辑模块</h1>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="proxy_config">
          <el-input type="textarea" :rows="4" v-model="form.proxyConfig" @blur="onProxyConfigBlur"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.desc"></el-input>
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
import { saveModule } from "../api";
import _ from "lodash";
import Hjson from "hjson";

const defaultFormValue = {
  proxyConfig: Hjson.stringify(
    {
      hostname: "127.0.0.1",
      port: 80
    },
    {
      separator: true
    }
  )
};

export default {
  name: "module-detail",
  components: {},
  data() {
    return {
      form: _.cloneDeep(defaultFormValue)
    };
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
    async onSave() {
      let res = await saveModule(this.form);
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
    },
    onProxyConfigBlur() {
      let obj = Hjson.parse(this.form.proxyConfig);
      let response = Hjson.stringify(obj, {
        separator: true
      });
      this.form.proxyConfig = response;
    }
  }
};
</script>
<style lang="scss" scoped>
.modules-detail {
  padding: 16px;
  .el-select {
    width: 100%;
  }
}
</style>
