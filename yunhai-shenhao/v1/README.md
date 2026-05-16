# 云海神豪系统：黑金名利场 v1

这是一个 SillyTavern 重度前端角色卡原型，结构仿照“世界书驱动 + MVU/Zod + 外链 HTML 前端”的卡片工程方式。

## 文件

- `云海神豪系统_黑金名利场_v1.json`：可导入 SillyTavern 的角色卡。
- `index.html`：黑金外链前端界面。
- `mvu-adapter.js`：MVU 依赖薄层入口。
- `schema.js`：Zod 变量结构、默认值、数值钳制。
- `ui-bridge.js`：隐藏旧楼层、监听聊天切换、刷新前端。

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
