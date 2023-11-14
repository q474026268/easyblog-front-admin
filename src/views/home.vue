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
              <li v-for="(menu, index) in  menuList " :key="menu.title">
                <span class="menu-title-p" @click="openClose(index)">
                  <span :class="['iconfont', menu.icon]"></span>
                  <span class="menu-title">{{ menu.title }}</span>
                  <span :class="['iconfont', 'open-close', menu.open ? 'icon-open' : 'icon-close']"></span>
                </span>
                <ul class="sub-menu" v-show="menu.open">
                  <li v-for="subMenu in menu.children " :key="subMenu.titie">
                    <span class="sub-menu-item">{{ subMenu.titie }}</span>
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
import { reactive } from "vue";

// 菜单列表
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
        titie: "分类管理",
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
// 点击对应菜单 展开|收缩
const openClose = (index) => {
  menuList[index].open = !menuList[index].open;
}
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
      width: 300px;

      .post-btn {
        background: green;
        color: #fff;
        height: 40px;
        width: 100%;
      }

      .menu-panel {
        margin-top: 5px;

        ul,
        li {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .menu-title-p {
          display: flex;
          cursor: pointer;
          line-height: 40px;
          padding: 0px 5px;

          &:hover {
            background: #ddd;
          }

          .iconfont {
            color: #91949a;
            font-size: 16px;
          }

          .menu-title {
            flex: 1;
            color: #3f4042;
            margin-left: 15px;
          }

          .open-close {
            width: 20px;
            font-size: 18px;
          }
        }

        .sub-menu {
          margin-left: 25px;
          font-size: 14px;
          .sub-menu-item {
            display: block;
            padding: 0 10px 0 33px;
            line-height: 40px;
            cursor: pointer;

            
            &:hover {
              
              background: #ddd;
            }
          }
        }
      }
    }

    .right-main {
      background: #fff;
    }
  }
}
</style>
