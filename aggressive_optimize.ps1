
Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\New Admin\.gemini\antigravity\playground\void-chromosphere\public\hero.jpg"
$destPath = "c:\Users\New Admin\.gemini\antigravity\playground\void-chromosphere\public\hero_super_compressed.jpg"

if (-not (Test-Path $sourcePath)) {
    Write-Host "Error: Source file not found: $sourcePath"
    exit 1
}

$image = [System.Drawing.Image]::FromFile($sourcePath)

# Encoder parameters for JPEG quality - Aggressive 30%
$Encoder = [System.Drawing.Imaging.Encoder]::Quality
$EncoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
$EncoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($Encoder, 30) 

# Get JPEG Codec
$Codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

# Save
try {
    $image.Save($destPath, $Codec, $EncoderParameters)
    Write-Host "Success: Image super compressed."
} catch {
    Write-Host "Error saving image: $_"
} finally {
    $image.Dispose()
}
