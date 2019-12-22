<template>
  <div id="app">
    <el-container class="app-container">
      <el-aside width="64px">
        <el-menu
          class="app-menu"
          collapse
          default-active="rules"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="rules">
            <i class="el-icon-s-operation"></i>
            <span slot="title">规则配置</span>
          </el-menu-item>
          <el-menu-item index="setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  .app-container {
    height: 100%;
  }
  .app-menu {
    height: 100%;
  }
}
</style>
