# Run download_bakery_images.ps1
Write-Host "Running download_bakery_images.ps1..."
& ".\download_bakery_images.ps1"

# List image new folder
Write-Host "Listing image new folder..."
Get-ChildItem "c:\Users\soufyane\Desktop\essai 22 stick stitch designe only cafz qr\image new" | Select-Object -First 20

# Dump HEAD versions of scripts to check for old URLs
Write-Host "Dumping HEAD versions..."
git show HEAD:"black coffee sub catégorie page/script.js" > coffee_head.js
git show HEAD:"juces sub catégorie page/script.js" > juices_head.js
git show HEAD:"milkshake sub catégorie page/script.js" > milkshake_head.js
git show HEAD:"bakery catégorie page/script.js" > bakery_head.js
