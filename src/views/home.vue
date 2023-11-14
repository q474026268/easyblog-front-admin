<template>
  <div class="layout">
    <el-container class="container">
      <el-header class="header">Header</el-header>
      <el-container>
        <el-aside width="200px" class="left-aside">
          <div>
            <el-button class="post-btn">发布</el-button>
          </div>
          <div class="menu-panel">
            <ul>
              <li v-for="menu in menuList" :key="menu.title">
                <span :class="menu.icon"></span>
                <span>{{ menu.title }}</span>
                <ul>
                  <li v-for="subMenu in menu.children" :key="subMenu.titie">
                    <span>{{ subMenu.titie }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main class="right-main">main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
const menuList = reactive([
  {
    title: "博客",
    icon: "icon-blog",
    open: true,
    children: [
      {
        titie: "博客管理",
        path: "/blog/list"
      },
      {
        title: "分类管理",
        path: "/blog/category"
      }
    ]
  },
  {
    title: "专题",
    icon: "icon-zhuanti",
    open: true,
    children: [
      {
        titie: "专题管理",
        path: "/special/category"
      }
    ]
  },
  {
    title: "设置",
    icon: "icon-shezhi",
    open: true,
    children: [
      {
        titie: "个人信息设置",
        path: "/setting/my"
      },
      {
        titie: "博客成员",
        path: "/setting/user"
      },
      {
        titie: "系统设置",
        path: "/setting/sysSetting",
        roleType: 1
      },
    ]
  },
  {
    title: "回收站",
    icon: "icon-shanchu",
    open: true,
    children: [
      {
        titie: "回收站",
        path: "/recovery/list"
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.layout {
  .header {
    border-bottom: 1px solid #ddd;
  }

  .container {
    padding-top: 10px;
    background: #f5f6f7;
    height: calc(100vh - 60px);

    .left-aside {
      padding: 0 15px;
      width: 250px;

      .post-btn {
        background: green;
        color: #fff;
        height: 40px;
        width: 100%;
      }

      .menu-panel {
        ul,
        li {
          padding: 0;
          margin: 0;
          list-style: none;
        }
      }
    }

    .right-main {
      background: #fff;
    }
  }
}
</style>
