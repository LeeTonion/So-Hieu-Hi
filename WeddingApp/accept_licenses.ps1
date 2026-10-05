$sdkRoot = "D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK"
$jdk = "D:\6000.3.9f1\Editor\Data\PlaybackEngines\AndroidPlayer\OpenJDK"

$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = Join-Path $sdkRoot "cmdline-tools\16.0\bin\sdkmanager.bat"
$psi.Arguments = "--sdk_root=`"$sdkRoot`" --licenses"
$psi.UseShellExecute = $false
$psi.RedirectStandardInput = $true
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.EnvironmentVariables["JAVA_HOME"] = $jdk

$process = [System.Diagnostics.Process]::Start($psi)

# Continuously send 'y\n' every 200ms
$timer = [System.Diagnostics.Stopwatch]::StartNew()
while (-not $process.HasExited -and $timer.ElapsedMilliseconds -lt 30000) {
    try {
        $process.StandardInput.WriteLine("y")
        $process.StandardInput.Flush()
    } catch {}
    Start-Sleep -Milliseconds 300
}

$output = $process.StandardOutput.ReadToEnd()
Write-Host $output
Write-Host "Exit Code: $($process.ExitCode)"
