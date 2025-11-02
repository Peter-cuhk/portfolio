# 快速更新并部署脚本
# 使用方法: .\update.ps1 "更新说明"

param(
    [string]$message = "Update portfolio"
)

Write-Host "=== 更新并部署到 GitHub Pages ===" -ForegroundColor Cyan

# 1. 添加所有修改
Write-Host "`n添加修改的文件..." -ForegroundColor Yellow
git add .

# 2. 提交
Write-Host "提交更改..." -ForegroundColor Yellow
git commit -m $message

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⚠️  没有检测到更改，无需更新" -ForegroundColor Yellow
    exit 0
}

# 3. 推送
Write-Host "推送到 GitHub..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ 更新成功！" -ForegroundColor Green
    Write-Host "`nGitHub Pages 正在重新部署..." -ForegroundColor Cyan
    Write-Host "等待 1-2 分钟后刷新网页即可看到更新" -ForegroundColor Yellow
    Write-Host "`n网站地址: https://peter-cuhk.github.io/portfolio/" -ForegroundColor Green
    Write-Host "部署状态: https://github.com/Peter-cuhk/portfolio/actions" -ForegroundColor Cyan
} else {
    Write-Host "`n✗ 推送失败" -ForegroundColor Red
}
