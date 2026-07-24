document.getElementById('folderInput').addEventListener('change', async function(event) {
  const files = event.target.files;
  const statusDiv = document.getElementById('status');
  
  if (!files || files.length === 0) {
    statusDiv.textContent = 'No files selected.';
    return;
  }

  statusDiv.textContent = 'Processing and organizing files...';
  const zip = new JSZip();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Skip system/hidden files
    if (file.name.startsWith('.')) continue;

    // Extract file extension
    const nameParts = file.name.split('.');
    const ext = nameParts.length > 1 ? nameParts.pop().toLowerCase() : 'other';

    // Group inside zip structure by extension folder
    zip.folder(ext).file(file.name, file);
  }

  statusDiv.textContent = 'Creating sorted ZIP file...';

  // Generate and download zip
  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'Sorted_Files.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  statusDiv.textContent = '✅ Success! Sorted files downloaded as Sorted_Files.zip';
});