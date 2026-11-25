import { useState } from 'react';
import { Icon } from './Icon';

interface Props {
  src: string;
  alt: string;
  fallbackIcon?: string;
  className?: string;
}

/** Image that shows a clean branded placeholder if the remote photo fails to load. */
export function SmartImage({ src, alt, fallbackIcon = 'mouse', className }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`img-fallback ${className ?? ''}`} role="img" aria-label={alt}>
        <Icon name={fallbackIcon} size={64} />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setFailed(true)} />;
}
