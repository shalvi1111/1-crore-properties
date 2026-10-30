$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$resolutions = @(
    @{ name = "1920x1080"; w = 1920; h = 1080 },
    @{ name = "1600x900";  w = 1600; h = 900 },
    @{ name = "1440x900";  w = 1440; h = 900 },
    @{ name = "1366x768";  w = 1366; h = 768 },
    @{ name = "1280x800";  w = 1280; h = 800 },
    @{ name = "1024x768";  w = 1024; h = 768 }
)

$pages = @(
    @{ name = "properties"; url = "http://localhost:3000/properties" },
    @{ name = "property_detail"; url = "http://localhost:3000/property/CP10241" },
    @{ name = "nri_dashboard"; url = "http://localhost:3000/nri/dashboard" },
    @{ name = "buyer_dashboard"; url = "http://localhost:3000/buyer/dashboard" },
    @{ name = "admin_dashboard"; url = "http://localhost:3000/admin/dashboard" }
)

# Ensure scratch directory exists
New-Item -ItemType Directory -Force -Path "D:\TechRider\scratch\captures" | Out-Null

# Capture key resolution for all pages
foreach ($p in $pages) {
    $out = "D:\TechRider\scratch\captures\$($p.name)_1920x1080.png"
    Write-Host "Capturing $($p.name) at 1920x1080..."
    Start-Process $chrome -ArgumentList '--headless=new', '--disable-gpu', '--virtual-time-budget=6000', "--window-size=1920,1080", "--screenshot=$out", $p.url -Wait
}

# Capture properties discovery page across all 6 requested viewports to verify desktop responsiveness
foreach ($r in $resolutions) {
    $out = "D:\TechRider\scratch\captures\properties_$($r.name).png"
    Write-Host "Capturing properties at $($r.name)..."
    Start-Process $chrome -ArgumentList '--headless=new', '--disable-gpu', '--virtual-time-budget=6000', "--window-size=$($r.w),$($r.h)", "--screenshot=$out", "http://localhost:3000/properties" -Wait
}

Write-Host "All captures complete!"
