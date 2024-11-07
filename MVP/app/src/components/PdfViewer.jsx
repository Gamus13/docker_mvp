import React from 'react';

const PdfViewer = ({ src, width = '100%', height = '300px' }) => {
    return (
        <div className="pdf-viewer">
            <iframe 
                src={src} 
                title="PDF Viewer" 
                width={width} 
                height={height} 
                style={{ border: 'none' }} 
            ></iframe>
        </div>
    );
};

export default PdfViewer;
