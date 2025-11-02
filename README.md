# 个人主页（iOS26 液态玻璃风）

这是一个轻量静态个人主页模板，参考自 `fxzhong.github.io` 的布局，但视觉风格改为 iOS26 风格的拟物化玻璃（Skeuomorphic Glassmorphism）。

目录结构：

- `index.html` — 站点首页（含导航、文章卡片、关于/联系）
- `assets/css/style.css` — 主要样式（玻璃效果）
- `assets/js/main.js` — 最小交互脚本

如何替换简历内容：
- 将你的 PDF 简历（例如 `Yuxiang_Xie_CV.pdf`）拷贝到仓库根目录，并在 `index.html` 中替换对应链接或直接把 PDF 内容文本粘贴到 About 区域。

发布到 GitHub Pages（推荐）：
1. 在本地初始化 git 并提交：

```powershell
cd 'c:\Users\10356\Desktop\个人主页';
git init;
git add .;
git commit -m "Initial personal site (glassmorphism)"
```

2a. 使用 GitHub CLI 创建并推送（如果你已安装 `gh` 并登录）：

```powershell
# 把 your-username 换成你的 GitHub 用户名
gh repo create your-username.github.io --public --source=. --push
```

此操作会在 GitHub 上创建一个仓库 `https://github.com/your-username/your-username.github.io` 并把内容推送到 `main` 分支，GitHub Pages 会自动托管为 `https://your-username.github.io`。

2b. 如果没有 `gh`，则在 GitHub 网站上创建一个新仓库 `your-username.github.io`，按页面提示添加远程并推送：

```powershell
# 假设你创建了仓库并得到远程地址
git remote add origin https://github.com/your-username/your-username.github.io.git;
git branch -M main;
git push -u origin main
```

发布到 Netlify（替代方案）：
- 使用 Netlify CLI：

```powershell
npm i -g netlify-cli;
cd 'c:\Users\10356\Desktop\个人主页';
netlify deploy --prod --dir=.
```

安全与兼容性提示：
- `backdrop-filter` 在部分旧浏览器或 IE 中不受支持。我们使用了半透明背景作为回退。
- 若要从 PDF 自动提取文本，可把 PDF 上传到仓库，或使用 `pdftotext`/在线工具提取然后粘贴到 `index.html`。

下一步我可以：
- 帮你把 PDF 简历的文本内容提取并填入 About 区（你可以把 PDF 上传到工作区或粘贴文本）。
- 如果你愿意，提供代为创建 GitHub 仓库并推送的步骤（需要你授权或提供 gh-cli 授权）。
