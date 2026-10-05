@echo off
echo ========================================================
echo  KHOI DONG METRO BUNDLER (JS SERVER)
echo ========================================================

set "JAVA_HOME=D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\OpenJDK"
set "ANDROID_HOME=D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK"
set "PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%"

call npm.cmd start

pause
