$source = "..\image new"
$dest = "swiggy-style_elite_main_menu_390x2500\assets"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }
Copy-Item "$source\*" -Destination $dest -Force -Recurse
Write-Host "Done copying"
