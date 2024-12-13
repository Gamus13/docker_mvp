import React from 'react';

const CustomImage = ({ src, alt, width, height, className }) => {
  return (
    <div className={`image-container ${className}`} style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}>
      <img
        src={src}
        alt={alt}
        className="object-contain w-full h-full"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
};

export default CustomImage;
