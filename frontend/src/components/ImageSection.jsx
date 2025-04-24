import React, { useState } from 'react';

const ImageSection = ({ imageUrl, altText = "Relevant visual information" }) => {
  const [imageError, setImageError] = useState(false);

  // If no URL or if there was an error loading, don't render anything
  if (!imageUrl || imageError) {
    return null;
  }

  const handleError = () => {
    console.warn(`Failed to load image: ${imageUrl}`);
    setImageError(true);
  };

  // Fallback placeholder if the original image fails
  const fallbackSrc = `https://placehold.co/600x300/cccccc/ffffff?text=Image+Not+Available`;

  return (
    <div className="mb-5 sm:mb-6 overflow-hidden rounded-lg border border-border-light dark:border-border-dark">
      <img
        src={imageError ? fallbackSrc : imageUrl}
        alt={altText}
        className="w-full h-auto object-cover display-block" // Ensure image displays correctly
        onError={handleError}
        loading="lazy" // Lazy load images
      />
    </div>
  );
};

export default ImageSection;
