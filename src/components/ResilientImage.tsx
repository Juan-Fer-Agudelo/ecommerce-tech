import { useState } from 'react';
import { AudioWaveform } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-[var(--bg-surface-alt)] text-[var(--text-secondary)] border border-[var(--border-hairline)] ${className}`}
      >
        <AudioWaveform
          className="w-8 h-8 text-[var(--accent)]"
          strokeWidth={1.5}
        />
        {fallbackTitle && (
          <span className="text-xs font-medium tracking-wide text-[var(--text-secondary)] px-4 text-center">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
