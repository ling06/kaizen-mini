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
  const [isPercentages, setPercentages] = useState<string>("0");

  useEffect(() => {
      setIsStarted(percentage > 0);
      setPercentages(() => displayPercentages());

  }, [percentage])

  function displayPercentages() {
    if(IS_MOBILE){
      if (percentage === 0) return '00';
      if (percentage === 100) return '';
      return String(percentage);
    }
    return percentage + '%';
  }
    

  return <S.Progress 
      $styles={styles} 
      $isStarted={isStarted} 
      $isHidden={isHidden}
      $progress={percentage}
    >
      {isPercentages}
    </S.Progress>;
}
