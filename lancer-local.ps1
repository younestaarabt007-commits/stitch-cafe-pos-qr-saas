$merchantServer = Join-Path $PSScriptRoot 'audit-tools/local-preview.cjs'
Write-Host 'Merchant : http://127.0.0.1:8000/isolated_merchant_dashboard/index.html'
Write-Host 'Admin    : http://127.0.0.1:8000/stitch_caf_menu_table_12/super_admin_dashboard/index.html'
node $merchantServer
