/** Five stars, filled to the rating. */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  const pct = (rating / 5) * 100;
  const star = 'M12 2.6l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.9l-5.8 3.2 1.4-6.4L2.7 9.3l6.5-.7z';
  const row = (fill: string) =>
    [0, 1, 2, 3, 4].map((i) => <path key={i} d={star} transform={`translate(${i * 24} 0)`} fill={fill} />);
  return (
    <svg className={className} viewBox="0 0 120 24" role="img" aria-label={`${rating} out of 5 stars`}>
      <defs>
        <clipPath id="stars-fill">
          <rect width={(120 * pct) / 100} height="24" />
        </clipPath>
      </defs>
      <g opacity="0.25">{row('currentColor')}</g>
      <g clipPath="url(#stars-fill)">{row('currentColor')}</g>
    </svg>
  );
}
