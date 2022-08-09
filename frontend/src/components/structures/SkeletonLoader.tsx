import SkeletonMessage from '../message/skeleton-message';

interface SkeletonLoaderProps {
  wrappedRef: React.RefObject<any>;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = (props) => (
  <div ref={props.wrappedRef}>
    {new Array(30).fill(0).map((_, i) => (
      <SkeletonMessage key={i} />
    ))}
  </div>
);
