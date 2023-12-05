import { RuleSet } from 'styled-components';
import * as S from './styles';
import { useState, useEffect } from 'react';
import { IS_MOBILE } from '@/constants';

interface ICourseProgressProps {
  percentage: number;
  styles?: RuleSet<object>;
  isHidden?: boolean;
}

export function CourseProgress({ percentage, styles, isHidden }: ICourseProgressProps) {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
      setIsStarted(percentage > 0);
  }, [percentage])

  return <S.Progress 
      $styles={styles} 
      $isStarted={isStarted} 
      $isHidden={isHidden}
      $progress={percentage}
    >
      {!IS_MOBILE ? 
        percentage + '%' :
          percentage === 100 ? 
            '' :
            percentage === 0 ? 
              '00' : percentage}
      {/* {percentage === 100 && IS_MOBILE ? '' : percentage}
      {percentage === 0 && IS_MOBILE && '0'}
      {IS_MOBILE ? '' : '%'} */}

    </S.Progress>;
}
