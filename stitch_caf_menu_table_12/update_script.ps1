$path = "swiggy-style_elite_main_menu_390x2500\script.js"
$content = Get-Content $path -Raw
$newContent = $content -replace '\.\./\.\./image new/', 'assets/'
Set-Content $path $newContent
Write-Host "Updated script.js"
