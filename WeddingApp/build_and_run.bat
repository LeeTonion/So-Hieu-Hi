@echo off
set JAVA_HOME=D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\OpenJDK
set ANDROID_HOME=D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK
set PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\16.0\bin;%PATH%

echo ========================================================
echo Installing NDK 27.1.12297006
echo ========================================================
(echo y) | "%ANDROID_HOME%\cmdline-tools\16.0\bin\sdkmanager.bat" --sdk_root="%ANDROID_HOME%" "ndk;27.1.12297006"

echo ========================================================
echo Building Android App
echo ========================================================
cd /d D:\WeddingApp\android
call gradlew.bat assembleDebug --stacktrace

if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo Installing to LDPlayer Emulator
    echo ========================================================
    cd /d D:\WeddingApp
    call "%ANDROID_HOME%\platform-tools\adb.exe" install -r android\app\build\outputs\apk\debug\app-debug.apk
    call "%ANDROID_HOME%\platform-tools\adb.exe" shell am start -n com.weddingapp/.MainActivity
    echo SUCCESS!
)
