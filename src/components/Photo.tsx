import { PHOTOS, type PhotoKey } from '../data';

type Props = {
  k: PhotoKey;
  className?: string;
  eager?: boolean;
  position?: string;
  alt?: string;
};

const MEDIA = `${import.meta.env.BASE_URL}media/`;

export function Photo({ k, className, eager, position, alt }: Props) {
  const p = PHOTOS[k];
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${MEDIA}${p.base}.webp`} />
      <img
        src={`${MEDIA}${p.base}.${p.ext}`}
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
