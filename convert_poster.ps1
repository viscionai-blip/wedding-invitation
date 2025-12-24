
Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\New Admin\.gemini\antigravity\playground\void-chromosphere\public\video_poster.png"
$destPath = "c:\Users\New Admin\.gemini\antigravity\playground\void-chromosphere\public\video_poster.jpg"

if (-not (Test-Path $sourcePath)) {
    Write-Host "Error: Source file not found: $sourcePath"
    exit 1
}

$image = [System.Drawing.Image]::FromFile($sourcePath)

# Encoder parameters for JPEG quality - 60%
$Encoder = [System.Drawing.Imaging.Encoder]::Quality
$EncoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
$EncoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($Encoder, 60) 

# Get JPEG Codec
$Codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

# Save
try {
    $image.Save($destPath, $Codec, $EncoderParameters)
    Write-Host "Success: Poster converted to JPG."
} catch {
    Write-Host "Error saving image: $_"
} finally {
    $image.Dispose()
}
