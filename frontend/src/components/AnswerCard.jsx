import React from 'react';
import ImageSection from './ImageSection';
import SourceLinks from './SourceLinks';

const AnswerCard = ({ result }) => {
  // If no result data, don't render anything
  if (!result) {
    return null;
  }

  const { answer, sources, imageUrl } = result;

  return (
    <div className="w-full max-w-2xl lg:max-w-3xl p-5 sm:p-6 md:p-8 bg-surface-light dark:bg-surface-dark rounded-xl shadow-card dark:shadow-card-dark border border-border-light dark:border-border-dark">
      {/* Optional Image */}
      <ImageSection imageUrl={imageUrl} altText={`Visual related to the answer`} />

      {/* Direct Answer Text */}
      {answer && (
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-text-primary-light dark:text-text-primary-dark leading-relaxed">
          {/* Using dangerouslySetInnerHTML can be risky if 'answer' contains malicious script.
              In a real app, sanitize this HTML string on the backend or use a markdown parser
              on the frontend if the LLM returns markdown. For simplicity here, we assume
              the simulated backend provides safe, simple HTML or plain text.
              If 'answer' is plain text, just render it in a <p> tag.
              Example for plain text: <p>{answer}</p>
           */}
           {/* Let's assume the answer is plain text for safety */}
           <p>{answer}</p>
        </div>
      )}

      {/* Source Links */}
      <SourceLinks sources={sources} />
    </div>
  );
};

export default AnswerCard;
