param(
    [ValidateRange(1, 65535)]
    [int]$Port = 8000
)

$ErrorActionPreference = 'Stop'

$phpCommand = Get-Command php -ErrorAction SilentlyContinue
if (-not $phpCommand) {
    throw 'PHP tidak ditemukan di PATH. Aktifkan PHP Laragon atau tambahkan php.exe ke PATH.'
}

$listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
    Select-Object -First 1
if ($listener) {
    throw "Port $Port sedang digunakan (PID $($listener.OwningProcess)). Server tidak dijalankan."
}

$logDirectory = Join-Path ([System.IO.Path]::GetTempPath()) 'tailwind-jquery-tutorial-server'
New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null
$stdoutPath = Join-Path $logDirectory 'server.stdout.log'
$stderrPath = Join-Path $logDirectory 'server.stderr.log'

$server = Start-Process `
    -FilePath $phpCommand.Source `
    -ArgumentList @('-S', "localhost:$Port") `
    -WorkingDirectory $PSScriptRoot\.. `
    -WindowStyle Hidden `
    -RedirectStandardOutput $stdoutPath `
    -RedirectStandardError $stderrPath `
    -PassThru

Start-Sleep -Milliseconds 500
$server.Refresh()
if ($server.HasExited) {
    $errorDetails = Get-Content $stderrPath -Raw -ErrorAction SilentlyContinue
    throw "Server PHP berhenti saat startup. $errorDetails"
}

Write-Output "Server berjalan di background: http://localhost:$Port/ (PID $($server.Id))"
Write-Output "Log: $logDirectory"
