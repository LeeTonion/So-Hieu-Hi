@echo off
chcp 65001 >nul
title WeddingApp - One Click Run

echo ========================================================
echo    WEDDING APP - KHOI DONG NHANH
echo ========================================================
echo.

:: Lay duong dan thu muc hien tai (noi dat file bat)
set "PROJECT_DIR=%~dp0"
set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

:: Cau hinh JDK va SDK tu Unity
set "JAVA_HOME=D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\OpenJDK"
set "ANDROID_HOME=D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK"
set "PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%"

:: Kiem tra LDPlayer dang chay
echo [1/5] Kiem tra gia lap LDPlayer...
adb devices | findstr "device" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] Khong tim thay gia lap! Hay mo LDPlayer truoc roi chay lai file nay.
    pause
    exit /b 1
)
echo      OK - Gia lap da ket noi!
echo.

:: Ket noi port Metro
echo [2/5] Ket noi port 8081 voi gia lap...
adb reverse tcp:8081 tcp:8081
echo      OK!
echo.

:: Khoi dong Metro Bundler (chay ngam)
echo [3/5] Khoi dong Metro Bundler (Clear Cache)...
start "Metro Bundler" cmd /c "cd /d "%PROJECT_DIR%" && npx react-native start --port 8081 --reset-cache"
echo      OK - Metro dang chay!
echo.

:: Doi Metro khoi dong
echo [4/5] Doi Metro san sang (10 giay)...
timeout /t 10 /nobreak >nul
echo      OK!
echo.

:: Kiem tra APK da co chua
if exist "%PROJECT_DIR%\android\app\build\outputs\apk\debug\app-debug.apk" (
    echo [5/5] Cai dat va mo app tren gia lap...
    adb install -r "%PROJECT_DIR%\android\app\build\outputs\apk\debug\app-debug.apk"
    adb shell am start -n com.weddingapp/.MainActivity
    echo.
    echo ========================================================
    echo    THANH CONG! App da mo tren LDPlayer!
    echo ========================================================
) else (
    echo [5/5] Chua co file APK, dang build lan dau (mat 15-20 phut)...
    cd /d "%PROJECT_DIR%\android"
    call gradlew.bat assembleDebug
    if %ERRORLEVEL% EQU 0 (
        cd /d "%PROJECT_DIR%"
        adb install -r "android\app\build\outputs\apk\debug\app-debug.apk"
        adb shell am start -n com.weddingapp/.MainActivity
        echo.
        echo ========================================================
        echo    THANH CONG! App da mo tren LDPlayer!
        echo ========================================================
    ) else (
        echo [LOI] Build that bai! Xem log o tren de biet chi tiet.
    )
)

echo.
echo Nhan phim bat ky de dong cua so nay...
echo (Luu y: DUNG DONG cua so Metro Bundler khi dang dung app!)
pause >nul
