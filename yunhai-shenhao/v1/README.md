# 云海神豪系统：黑金名利场 v1

这是一个 SillyTavern 重度前端角色卡原型，结构仿照“世界书驱动 + MVU/Zod + 外链 HTML 前端”的卡片工程方式。v1.2 将主界面升级为“神豪系统终端”，并加入 AI 显式选项评分与单人触发女主色盘人设。

## 文件

- `云海神豪系统_黑金名利场_v1.json`：可导入 SillyTavern 的角色卡。
- `index.html`：黑金外链前端界面，主区域为高科技神豪系统终端。
- `mvu-adapter.js`：MVU 依赖薄层入口。
- `schema.js`：Zod 变量结构、默认值、数值钳制。
- `ui-bridge.js`：隐藏旧楼层、监听聊天切换、刷新前端。

## v1.1 重点

- 女主关系是主界面核心：沈清璃、顾晚音、林知夏、苏曼青、许明月都会显示阶段、好感、信任、警惕、态度、最近互动和事件进度。
- 专属资源由前端静态映射：投行、豪门、助理、传媒、法务五条资源线分别绑定对应女主。
- 档案按钮会尝试直接发送自然语言行动；若 SillyTavern DOM 不允许点击发送，会自动把行动填入输入框。
- 缺少变量时前端显示沉浸式默认档案，不再显示开发态“未初始化”文案。
- 推荐搭配 Kemini Dramatron 这类普通叙事预设使用，不建议搭配会强制输出 `branches/details/html` 协议的重型预设。

## v1.2 重点

- 第一屏改为“云海神豪系统 OS”：资产扫描、任务雷达、能力评估、系统日志和行动预测。
- `<option>` 支持 `<score>`，前端显示总收益、能力变化、关系变化、风险和系统推荐高亮。
- 开场改为小说式系统绑定过程，先写异常、扫描、权限、资金托管，再进入玩家选择。
- 五位女主从合并条目拆成单人触发世界书，降低提到一个名字时加载全部详设的概率。

## GitHub Raw 路径

请把本目录上传到：

```text
Baichen-xi/SillyTavern-storehouse/main/yunhai-shenhao/v1/
```

角色卡内已经使用以下 Raw 基础路径：

```text
https://raw.githubusercontent.com/Baichen-xi/SillyTavern-storehouse/main/yunhai-shenhao/v1/
```

## 使用前提

- SillyTavern 已安装并可正常导入 `chara_card_v3` JSON。
- 已安装并启用酒馆助手/TavernHelper 类扩展，支持角色脚本。
- 网络环境能访问 `raw.githubusercontent.com`。

如果 Raw 链接无法访问，可以把 `index.html`、`mvu-adapter.js`、`schema.js`、`ui-bridge.js` 放到 VPS 静态目录，然后替换角色卡 JSON 里的 Raw URL。
