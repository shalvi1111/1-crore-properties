$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$targets = @(
    @{ name = "login_page"; url = "http://localhost:3000/login" },
    @{ name = "register_customer"; url = "http://localhost:3000/register/customer" },
    @{ name = "register_builder"; url = "http://localhost:3000/register/builder" },
    @{ name = "public_compare"; url = "http://localhost:3000/compare" },
    @{ name = "public_shortlisted"; url = "http://localhost:3000/shortlisted" },
    @{ name = "nri_payments"; url = "http://localhost:3000/nri/payments" },
    @{ name = "nri_agent"; url = "http://localhost:3000/nri/agent" }
)

foreach ($t in $targets) {
    $out = "D:\TechRider\scratch\captures\$($t.name)_1920x1080.png"
    Write-Host "Capturing $($t.name)..."
    Start-Process $chrome -ArgumentList '--headless=new', '--disable-gpu', '--virtual-time-budget=6000', '--window-size=1920,1080', "--screenshot=$out", $t.url -Wait
}
Write-Host "Completed all remaining captures!"
