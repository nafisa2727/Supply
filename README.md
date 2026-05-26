# Campus Substitute 概念原型

这是一个 Vite + React 前端原型项目，已适配 GitHub Pages。

## 本地运行

```bash
npm install
npm run dev
```

运行后打开终端显示的本地地址，例如：

```text
http://localhost:5173/
```

## GitHub Pages 部署

本项目已经包含：

```text
vite.config.js
.github/workflows/deploy.yml
```

上传到 `nafisa2727/Supply` 仓库后：

1. 进入 GitHub 仓库 `Settings`
2. 点击左侧 `Pages`
3. 在 `Build and deployment` 中把 `Source` 改为 `GitHub Actions`
4. 回到仓库首页，点击 `Actions`
5. 等待 `Deploy to GitHub Pages` 运行完成
6. 打开：

```text
https://nafisa2727.github.io/Supply/
```

## 说明

项目中的发布、接单、支付、上传、隐私展示等均为前端模拟，不包含真实后端、真实支付或真实文件上传。
