interface BlogViewerProps {
  content: string;
  title: string;
}

const BlogViewer = ({ content, title }: BlogViewerProps) => {
  // Wrap the content to ensure proper scrolling within iframe
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
        }
        html { 
          height: 100%;
        }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;

  return (
    <div className="w-full h-full">
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