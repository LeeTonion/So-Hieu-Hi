@echo off
echo ========================================================
echo  KHOI DONG REACT NATIVE ANDROID APP
echo  (Su dung JDK & SDK co san tu Unity)
echo ========================================================

set "JAVA_HOME=D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\OpenJDK"
set "ANDROID_HOME=D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK"
set "PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin;%PATH%"

echo JAVA_HOME: %JAVA_HOME%
echo ANDROID_HOME: %ANDROID_HOME%
echo.

call npm.cmd run android

pause
