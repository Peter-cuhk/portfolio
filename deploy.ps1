# GitHub Pages 部署脚本
# 使用方法：在 PowerShell 中运行 .\deploy.ps1

Write-Host "=== GitHub Pages 部署向导 ===" -ForegroundColor Cyan

# 1. 获取 GitHub 用户名
$username = Read-Host "请输入你的 GitHub 用户名"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "错误：用户名不能为空" -ForegroundColor Red
    exit 1
}

# 2. 获取仓库名
Write-Host "`n建议使用以下仓库名之一：" -ForegroundColor Yellow
Write-Host "  1. portfolio (通用名称)"
Write-Host "  2. $username.github.io (个人主页专用，URL 更简洁)"
$repoName = Read-Host "`n请输入仓库名（默认: portfolio）"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "portfolio"
}

# 3. 构建仓库 URL
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host "`n=== 配置信息 ===" -ForegroundColor Green
Write-Host "用户名: $username"
Write-Host "仓库名: $repoName"
Write-Host "仓库地址: $repoUrl"

# 4. 确认是否已在 GitHub 创建仓库
Write-Host "`n⚠️  重要：请确保已在 GitHub 创建该仓库" -ForegroundColor Yellow
Write-Host "   1. 访问 https://github.com/new"
Write-Host "   2. 仓库名填写: $repoName"
Write-Host "   3. 设为 Public（公开）"
Write-Host "   4. 不勾选任何初始化选项（README、.gitignore等）"
Write-Host "   5. 点击 Create repository`n"

$confirm = Read-Host "已创建仓库？(y/n)"
if ($confirm -ne "y") {
    Write-Host "请先在 GitHub 创建仓库后再运行此脚本" -ForegroundColor Yellow
    exit 0
}

# 5. 检查 Git 状态
Write-Host "`n=== 检查 Git 仓库 ===" -ForegroundColor Cyan
if (Test-Path ".git") {
    Write-Host "✓ Git 仓库已初始化" -ForegroundColor Green
} else {
    Write-Host "初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: Dual-mode portfolio"
}

# 6. 添加远程仓库
Write-Host "`n=== 配置远程仓库 ===" -ForegroundColor Cyan
git remote remove origin 2>$null  # 删除旧的 origin（如果存在）
git remote add origin $repoUrl
Write-Host "✓ 已添加远程仓库: $repoUrl" -ForegroundColor Green

# 7. 推送到 GitHub
Write-Host "`n=== 推送代码到 GitHub ===" -ForegroundColor Cyan
Write-Host "正在推送..." -ForegroundColor Yellow
git branch -M main
$pushResult = git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ 推送成功！" -ForegroundColor Green
    
    # 8. 生成访问链接
    Write-Host "`n=== 部署完成 ===" -ForegroundColor Cyan
    Write-Host "`n下一步：启用 GitHub Pages" -ForegroundColor Yellow
    Write-Host "  1. 访问: https://github.com/$username/$repoName/settings/pages"
    Write-Host "  2. Source 选择: Deploy from a branch"
    Write-Host "  3. Branch 选择: main + / (root)"
    Write-Host "  4. 点击 Save"
    Write-Host "  5. 等待 1-2 分钟部署完成`n"
    
    if ($repoName -eq "$username.github.io") {
        Write-Host "你的网站地址将是: https://$username.github.io/" -ForegroundColor Green
    } else {
        Write-Host "你的网站地址将是: https://$username.github.io/$repoName/" -ForegroundColor Green
    }
    
} else {
    Write-Host "`n✗ 推送失败" -ForegroundColor Red
    Write-Host "错误信息:" -ForegroundColor Red
    Write-Host $pushResult
    Write-Host "`n常见问题排查：" -ForegroundColor Yellow
    Write-Host "  1. 确认仓库已在 GitHub 创建"
    Write-Host "  2. 确认仓库名拼写正确"
    Write-Host "  3. 如需认证，可能需要使用 Personal Access Token"
    Write-Host "     生成 Token: https://github.com/settings/tokens"
    Write-Host "     推送时用 Token 替代密码"
}

Write-Host "`n按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
