# 快速部署说明

## 方法 1：使用自动化脚本（推荐）

1. 右键点击 `deploy.ps1` → "使用 PowerShell 运行"
2. 或在 PowerShell 中执行：
   ```powershell
   .\deploy.ps1
   ```
3. 按提示输入你的 GitHub 用户名和仓库名
4. 按照脚本指引完成部署

---

## 方法 2：手动命令行部署

### 第一步：在 GitHub 创建仓库
访问 https://github.com/new
- 仓库名：`portfolio` 或 `你的用户名.github.io`
- 设为 **Public**（公开）
- **不勾选**任何初始化选项
- 点击 **Create repository**

### 第二步：推送代码
在项目文件夹中打开 PowerShell，替换下面的占位符后执行：

```powershell
# 1. 删除旧的远程配置（如果存在）
git remote remove origin

# 2. 添加正确的远程仓库（替换你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/仓库名.git

# 3. 推送代码
git branch -M main
git push -u origin main
```

**示例**（假设用户名是 `johndoe`，仓库名是 `portfolio`）：
```powershell
git remote add origin https://github.com/johndoe/portfolio.git
git branch -M main
git push -u origin main
```

### 第三步：启用 GitHub Pages
1. 进入仓库页面（如 `https://github.com/你的用户名/仓库名`）
2. 点击 **Settings** 标签
3. 左侧菜单找到 **Pages**
4. **Source** 选择：`Deploy from a branch`
5. **Branch** 选择：`main` + `/ (root)`
6. 点击 **Save**
7. 等待 1-2 分钟，刷新页面查看部署状态

### 第四步：访问网站
- 普通仓库：`https://你的用户名.github.io/仓库名/`
- 特殊命名（仓库名为 `你的用户名.github.io`）：`https://你的用户名.github.io/`

---

## 认证问题解决

如果推送时提示需要认证，使用 **Personal Access Token**：

1. 生成 Token：https://github.com/settings/tokens
   - 点击 **Generate new token (classic)**
   - 勾选 `repo` 权限
   - 生成并复制 Token

2. 推送时：
   - 用户名：填写你的 GitHub 用户名
   - 密码：粘贴刚生成的 Token（不是你的 GitHub 密码）

---

## 后续更新网站

每次修改代码后，执行：
```powershell
git add .
git commit -m "更新描述"
git push
```

GitHub Pages 会自动重新部署（1-2 分钟生效）。

---

## 常见问题

**Q: 推送失败显示 "Repository not found"**  
A: 确认仓库已在 GitHub 创建，且用户名/仓库名拼写正确

**Q: 网站访问 404**  
A: 检查 Settings → Pages 是否已启用，等待几分钟后重试

**Q: 照片或 PDF 无法加载**  
A: 检查文件路径是否正确，文件名避免空格和中文

**Q: 需要修改用户名/仓库名**  
A: 删除现有 origin 并重新添加：
```powershell
git remote remove origin
git remote add origin https://github.com/新用户名/新仓库名.git
git push -u origin main
```
