# Basit PowerShell HTTP Sunucusu
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()

Write-Host "BM Profil Uygulamasi sunucusu baslatildi. http://localhost:8080/ adresinden erisebilirsiniz."
Write-Host "Sunucuyu durdurmak icin Ctrl+C tusuna basin."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq '/') {
            $localPath = '/index.html'
        }
        
        $filePath = Join-Path $PSScriptRoot $localPath.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            
            $extension = [System.IO.Path]::GetExtension($filePath)
            switch ($extension) {
                '.html' { $response.ContentType = 'text/html' }
                '.css' { $response.ContentType = 'text/css' }
                '.js' { $response.ContentType = 'text/javascript' }
                '.json' { $response.ContentType = 'application/json' }
                '.png' { $response.ContentType = 'image/png' }
                '.jpg' { $response.ContentType = 'image/jpeg' }
                '.jpeg' { $response.ContentType = 'image/jpeg' }
                '.gif' { $response.ContentType = 'image/gif' }
                '.svg' { $response.ContentType = 'image/svg+xml' }
                '.ico' { $response.ContentType = 'image/x-icon' }
                default { $response.ContentType = 'application/octet-stream' }
            }
            
            $output = $response.OutputStream
            $output.Write($content, 0, $content.Length)
            $output.Close()
        } else {
            $response.StatusCode = 404
            $response.Close()
        }
    }
} finally {
    $listener.Stop()
}
