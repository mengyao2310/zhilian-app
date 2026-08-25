# 机电运维数智化平台（移动端 APP）

基于 **Vue 2.7 + Element UI 2.15 + Vue Router 3** 的移动端管理系统前端，375×812 设计尺寸，严格按 MasterGo 设计稿还原（设计稿 ID：`200425762466679`，页面：8.22 / 功能页 460:08863）。

## 快速开始

```bash
npm install        # 安装依赖（已配置 npmmirror 镜像，见 .npmrc）
npm run dev        # 开发服务器 http://localhost:5173
npm run build      # 生产构建，输出 dist/
npm run preview    # 本地预览生产包 http://localhost:4173
```

> 路由使用 hash 模式，构建产物 `dist/` 可直接部署到任意静态服务器（Nginx 等），无需服务端重写规则。

## 目录结构

```
src/
├── main.js                 # 入口：Vue + ElementUI + 路由
├── App.vue                 # 根组件（TabBar 挂载判断：仅带 meta.tab 的路由显示）
├── router/index.js         # 路由表（hash 模式）
├── styles/base.css         # 全局样式：外壳、顶部渐变、状态栏、子页底部操作栏等
├── icons/index.js          # SVG 图标注册表（由脚本从设计稿自动生成，勿手改）
├── data/functionData.js    # 功能页卡片/入口数据（图标、渐变、徽标）
├── components/
│   ├── StatusBar.vue       # 状态栏（时间/信号/电量，支持深浅色）
│   ├── NavHeader.vue       # 子页顶栏（返回 + 标题，白色）
│   ├── TabBar.vue          # 底部标签栏（首页/功能/扫一扫/我的，前两个为禁用态）
│   └── SvgIcon.vue         # SVG 图标组件（按 viewBox 等比缩放）
└── views/
    ├── FuncView.vue        # 功能页（4 卡片 28 入口，蓝色横幅 + 渐变面板双层背景）
    ├── MineView.vue        # 我的页（用户信息 + 菜单 + 退出登录弹框）
    ├── PasswordView.vue    # 密码修改（表单校验 + 重置/保存）
    ├── CacheView.vue       # 清除缓存（总量进度环 + 清除交互）
    └── LoginView.vue       # 登录页
```

## 路由与页面

| 路由 | 页面 | TabBar | 说明 |
|---|---|---|---|
| `/` → `/func` | 功能页 | 显示 | 默认落地页 |
| `/home` | - | - | 已禁用，重定向 `/func` |
| `/scan` | - | - | 已禁用，重定向 `/func` |
| `/mine` | 我的页 | 显示 | 菜单入口：密码修改 / 清除缓存 / 关于系统 / 退出登录 |
| `/password` | 密码修改 | 隐藏 | |
| `/cache` | 清除缓存 | 隐藏 | |
| `/login` | 登录页 | 隐藏 | 退出登录后跳转 |

## 接口对接说明（重要）

当前所有交互均为**前端 Mock（setTimeout 模拟）**，后端就绪后替换以下位置：

| 功能 | Mock 位置 | 待接接口 |
|---|---|---|
| 登录 | `LoginView.vue` `onLogin()` | 账号密码校验，返回 token 与用户信息 |
| 修改密码 | `PasswordView.vue` `onSave()` | 原密码校验 + 新密码提交 |
| 清除缓存 | `CacheView.vue` `onClear()` | 当前为纯前端展示，缓存值存 `localStorage('app_cache_mb')` |
| 退出登录 | `MineView.vue` `doLogout()` | token 失效处理 |

数据约定：用户信息（傅智翔 / 15392830508 / 杭州北管理中心-机电信息处）为演示数据，接入接口后由后端返回；密码规则 6-20 位已在表单校验实现。

## 图标体系

- 全部图标（功能入口 28 + TabBar 8 + 菜单 4 + UI 符号）为**设计稿提取的高精度 SVG**，注册在 `src/icons/index.js`（自动生成文件，勿手改结构）
- 新增/更换图标：从设计稿导出 SVG 后，在 `src/icons/index.js` 中按 `分类:名称[:状态]` 键格式注册即可，无需其他改动
- 使用方式：`<SvgIcon name="func:综合监督:检查计划" :size="17.5" />`

## 设计稿还原要点

- 设计尺寸 375×812，外壳居中自适应（桌面浏览器居中显示手机版式）
- 功能页双层背景：底部蓝色渐变（`#2C66F6 → #2C12EE`）+ 上层渐变面板（`#F9FAFA → #EFF6FD`，顶部 12px 圆角、白描边、内嵌高光，容器 61102）
- 我的页：179° 蓝紫渐变头部 + 双装饰圆环、菜单分隔线 `#F2F5FC`、退出红色 `#EB1111`
- 子页（密码/缓存）：白色顶栏 88px、浅灰内容底 `#F4F6FA`、主按钮 `#2C66F6` 48px 胶囊、底部毛玻璃操作栏
