import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

const SourceLinks = ({ sources }) => {
  // If no sources array or it's empty, don't render the section
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 pt-4 border-t border-border-light dark:border-border-dark">
      <h3 className="text-sm font-semibold mb-2 text-text-secondary-light dark:text-text-secondary-dark">
        Sources:
      </h3>
      <ul className="space-y-1.5">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start">
            <LinkIcon
              size={14}
              className="mr-2 mt-1 text-brand-blue dark:text-brand-blue-light flex-shrink-0"
              aria-hidden="true"
            />
            <a
              href={source.url}
              className="text-sm text-brand-blue dark:text-brand-blue-light hover:underline break-words" // Allow long URLs to wrap
              target="_blank" // Open in new tab
              rel="noopener noreferrer" // Security best practice
              title={source.url} // Show full URL on hover
            >
              {source.title || source.url} {/* Show title or URL if title is missing */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourceLinks;
