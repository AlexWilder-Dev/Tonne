import { PHOTOS, type PhotoKey } from '../data';

type Props = {
  k: PhotoKey;
  className?: string;
  eager?: boolean;
  position?: string;
  alt?: string;
  /** How wide the photo shows, for the browser to pick a file. */
  sizes?: string;
};

const WEB = `${import.meta.env.BASE_URL}media/web/`;

export function Photo({ k, className, eager, position, alt, sizes = '100vw' }: Props) {
  const p = PHOTOS[k];
  const set = (ext: string) => p.widths.map((w) => `${WEB}${p.base}-${w}.${ext} ${w}w`).join(', ');
  const largest = p.widths[p.widths.length - 1];
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`${WEB}${p.base}-${largest}.jpg`}
        srcSet={set('jpg')}
        sizes={sizes}
        width={p.w}
        height={p.h}
        alt={alt ?? p.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        style={position ? { objectPosition: position } : undefined}
        {...(eager ? { fetchpriority: 'high' } : {})}
      />
    </picture>
  );
}
