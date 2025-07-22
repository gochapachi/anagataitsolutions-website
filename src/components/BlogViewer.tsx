interface BlogViewerProps {
  content: string;
  title: string;
}

const BlogViewer = ({ content, title }: BlogViewerProps) => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        srcDoc={content}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        title={title}
        style={{ 
          display: 'block',
          width: '100%',
          height: '100vh',
          border: 'none',
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
};

export default BlogViewer;