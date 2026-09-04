@echo off
echo Menambahkan semua perubahan ke staging...
git add .

set /p msg="Masukkan pesan commit (tekan Enter untuk menggunakan pesan default 'Update portofolio'): "
if "%msg%"=="" set msg=Update portofolio

echo.
echo Melakukan commit...
git commit -m "%msg%"

echo.
echo Melakukan push ke GitHub...
git push

echo.
echo Selesai! Perubahan berhasil di-push.
pause
