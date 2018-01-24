<template>
  <div id="app">
    <el-container>
      <el-header>
        <i class="el-icon-location"></i> Choice lunch
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
