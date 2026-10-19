'use client';

import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type AppImageProps = ImageProps & {
  fallbackClassName?: string;
};

export function Image({
  className,
  fallbackClassName,
  onError,
  alt,
  ...props
}: AppImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex items-center justify-center bg-slate-100 text-slate-300',
          props.fill && 'absolute inset-0',
          fallbackClassName ?? className,
        )}
        style={
          !props.fill
            ? { width: props.width as number, height: props.height as number }
            : undefined
        }
      >
        <ImageIcon className="w-1/3 h-1/3 max-w-8 max-h-8" />
      </div>
    );
  }

  const src = typeof props.src === 'string' ? props.src : '';
  const unoptimized = props.unoptimized || src.startsWith('data:') || src.endsWith('.svg');

  return (
    <NextImage
      alt={alt}
      className={className}
      unoptimized={unoptimized}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}
