$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

$pages = @(
    @{ name = "nri_my_properties"; url = "http://localhost:3000/nri/my-properties" },
    @{ name = "nri_shortlisted";   url = "http://localhost:3000/nri/shortlisted" },
    @{ name = "nri_compare";       url = "http://localhost:3000/nri/compare" },
    @{ name = "nri_management";    url = "http://localhost:3000/nri/property-management" },
    @{ name = "nri_services";      url = "http://localhost:3000/nri/services" },
    @{ name = "nri_documents";     url = "http://localhost:3000/nri/documents" },
    @{ name = "nri_details";       url = "http://localhost:3000/nri/details" },
    @{ name = "buyer_add_property"; url = "http://localhost:3000/buyer/add-property" },
    @{ name = "buyer_add_open_plot"; url = "http://localhost:3000/buyer/add-open-plot" },
    @{ name = "buyer_prop_dash";    url = "http://localhost:3000/buyer/property-dashboard" },
    @{ name = "register_nri";      url = "http://localhost:3000/register/nri" }
)

foreach ($p in $pages) {
    $out = "D:\TechRider\scratch\captures\$($p.name)_1920x1080.png"
    Write-Host "Capturing $($p.name)..."
    Start-Process $chrome -ArgumentList '--headless=new', '--disable-gpu', '--virtual-time-budget=6000', "--window-size=1920,1080", "--screenshot=$out", $p.url -Wait
}

Write-Host "Batch captures complete!"
