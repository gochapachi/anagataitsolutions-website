interface BlogViewerProps {
  content: string;
  title: string;
}

const BlogViewer = ({ content, title }: BlogViewerProps) => {
  // Clean and wrap the content to ensure proper isolation
  const cleanContent = content
    .replace(/<!DOCTYPE html>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '<div>')
    .replace(/<\/body>/gi, '</div>');

  const wrappedContent = `
    <!DOCTYPE html>
    <html style="height: 100%;">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <style>
        body { 
          margin: 0; 
          padding: 20px; 
          min-height: 100vh;
          box-sizing: border-box;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #fff;
        }
        html { 
          height: 100%;
        }
        /* Reset some conflicting styles */
        * {
          box-sizing: border-box;
        }
        h1, h2, h3, h4, h5, h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        p {
          margin-bottom: 1em;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1em 0;
        }
        th, td {
          padding: 8px 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f5f5f5;
          font-weight: 600;
        }
        /* Ensure external scripts don't interfere */
        .chart-container canvas {
          max-width: 100% !important;
          height: auto !important;
        }
      </style>
    </head>
    <body>
      ${cleanContent}
    </body>
    </html>
  `;

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        srcDoc={wrappedContent}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        title={title}
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
};

export default BlogViewer;