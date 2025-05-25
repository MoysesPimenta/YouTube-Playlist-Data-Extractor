// Excel and Word Generation Libraries
class DocumentGenerator {
  constructor() {
    this.xlsx = null;
    this.docx = null;
    this.loadLibraries();
  }

  // Load required libraries
  async loadLibraries() {
    try {
      // Load SheetJS (xlsx) for Excel generation
      if (!window.XLSX) {
        await this.loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');
      }
      this.xlsx = window.XLSX;

      // For HTML to docx conversion, we'll use a simplified approach
      // In a production app, you might want to use a more robust library
      console.log('Libraries loaded successfully');
    } catch (error) {
      console.error('Error loading libraries:', error);
    }
  }

  // Helper to load external scripts
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Generate Excel file from video data
  generateExcel(videos) {
    if (!videos || videos.length === 0) {
      throw new Error('Nenhum dado disponível para gerar a planilha.');
    }

    try {
      // If SheetJS is loaded, use it
      if (this.xlsx) {
        // Prepare data for Excel
        const data = videos.map(video => ({
          'Nome do Episodio': video.title,
          'Duração': video.duration,
          'Views': video.views,
          'Likes': video.likes,
          'Link': `https://www.youtube.com/watch?v=${video.videoId}`,
          'Data de Publicacao': new Date(video.publishedDate).toLocaleDateString()
        }));

        // Create workbook and worksheet
        const ws = this.xlsx.utils.json_to_sheet(data);
        const wb = this.xlsx.utils.book_new();
        this.xlsx.utils.book_append_sheet(wb, ws, 'Playlist');

        // Generate Excel file
        const excelBuffer = this.xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        return {
          blob,
          filename: 'playlist_data.xlsx'
        };
      } else {
        // Fallback to CSV if SheetJS isn't loaded
        return this.generateCSV(videos);
      }
    } catch (error) {
      console.error('Error generating Excel:', error);
      // Fallback to CSV
      return this.generateCSV(videos);
    }
  }

  // Fallback: Generate CSV file
  generateCSV(videos) {
    // Create CSV header
    let csv = 'Nome do Episodio,Duração,Views,Likes,Link,Data de Publicacao\n';
    
    // Add data rows
    videos.forEach(video => {
      const row = [
        `"${video.title.replace(/"/g, '""')}"`,
        video.duration,
        video.views,
        video.likes,
        `"https://www.youtube.com/watch?v=${video.videoId}"`,
        new Date(video.publishedDate).toLocaleDateString()
      ];
      
      csv += row.join(',') + '\n';
    });
    
    // Create blob
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
    return {
      blob,
      filename: 'playlist_data.csv'
    };
  }

  // Generate Word document (HTML format)
  generateWordDocument(videos, screenshots) {
    if (!videos || videos.length === 0 || !screenshots || screenshots.length === 0) {
      throw new Error('Nenhum dado disponível para gerar o documento.');
    }
    
    // Create HTML document
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Comprovação de Dados - Playlist YouTube</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #1a73e8; }
          .video { margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
          .video h2 { color: #202124; }
          .metadata { margin-bottom: 15px; }
          .metadata p { margin: 5px 0; }
          .metadata strong { font-weight: bold; }
          img { max-width: 100%; border: 1px solid #ddd; }
          .page-break { page-break-after: always; }
        </style>
      </head>
      <body>
        <h1>Comprovação de Dados - Playlist YouTube</h1>
    `;
    
    // Add each video
    videos.forEach((video, index) => {
      const screenshot = screenshots[index] || { imageUrl: '' };
      
      html += `
        <div class="video">
          <h2>Vídeo ${index + 1}: ${video.title}</h2>
          <div class="metadata">
            <p><strong>Nome do Episódio:</strong> ${video.title}</p>
            <p><strong>Duração:</strong> ${video.duration}</p>
            <p><strong>Views:</strong> ${video.views.toLocaleString()}</p>
            <p><strong>Likes:</strong> ${video.likes.toLocaleString()}</p>
            <p><strong>Link:</strong> <a href="https://www.youtube.com/watch?v=${video.videoId}">https://www.youtube.com/watch?v=${video.videoId}</a></p>
            <p><strong>Data de Publicação:</strong> ${new Date(video.publishedDate).toLocaleDateString()}</p>
          </div>
          <img src="${screenshot.imageUrl}" alt="Captura de tela: ${video.title}">
        </div>
        ${index < videos.length - 1 ? '<div class="page-break"></div>' : ''}
      `;
    });
    
    html += `
      </body>
      </html>
    `;
    
    // Create blob
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    
    return {
      blob,
      filename: 'playlist_screenshots.html'
    };
  }
}
