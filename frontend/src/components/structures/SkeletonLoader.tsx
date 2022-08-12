import SkeletonMessage from '../message/skeleton-message';

export const SkeletonLoader: React.FC = () => (
  <div>
    {new Array(10).fill(0).map((_, i) => (
      <SkeletonMessage key={i} />
    ))}
  </div>
);
