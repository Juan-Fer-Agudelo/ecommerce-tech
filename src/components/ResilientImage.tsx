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
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#16161B] via-[#121215] to-[#0B0B0D] text-[#A1A1AA] border border-white/[0.06] ${className}`}
      >
        <AudioWaveform className="w-8 h-8 text-[#D9A05B]/70" strokeWidth={1.5} />
        {fallbackTitle && (
          <span className="text-xs font-medium tracking-wide text-[#A1A1AA] px-4 text-center">
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
