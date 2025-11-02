# 一键推送脚本
# 前提：已在 GitHub 创建 portfolio 仓库

Write-Host "推送到 GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ 推送成功！" -ForegroundColor Green
    Write-Host "`n=== 下一步：启用 GitHub Pages ===" -ForegroundColor Yellow
    Write-Host "1. 访问: https://github.com/Peter-cuhk/portfolio/settings/pages"
    Write-Host "2. Source → Deploy from a branch"
    Write-Host "3. Branch → main + / (root)"
    Write-Host "4. 点击 Save"
    Write-Host "`n等待 1-2 分钟后访问："
    Write-Host "https://peter-cuhk.github.io/portfolio/" -ForegroundColor Green
} else {
    Write-Host "`n✗ 推送失败，请检查：" -ForegroundColor Red
    Write-Host "1. 仓库是否已创建？ https://github.com/Peter-cuhk/portfolio"
    Write-Host "2. 是否需要登录认证？"
}
