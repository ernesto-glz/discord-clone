import { generateRandomIntWith } from 'src/utils/utils';
import { Skeleton, SkeletonContent } from './styles';

export const availablHeights = ['1rem', '2rem', '3rem'];
export const availableWidhts = ['14rem', '15rem', '20rem', '23rem', '26rem'];

export interface SkeletonProps {
  cWidht: number;
  cHeight: number;
}

const SkeletonMessage: React.FC = () => {
  return (
    <Skeleton>
      <div className="animationContainer">
        <div className="avatarSkeleton" />
        <div className="message">
          <div className="messageHead" />
          <div className="messageBody">
            {new Array(generateRandomIntWith(4, 1)).fill({}).map((c, index) => (
              <SkeletonContent
                cWidht={generateRandomIntWith(availableWidhts.length)}
                cHeight={generateRandomIntWith(availablHeights.length)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default SkeletonMessage;
