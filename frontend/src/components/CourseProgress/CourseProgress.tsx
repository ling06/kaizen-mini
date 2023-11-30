import { RuleSet } from 'styled-components';
import * as S from './styles';
import { useState, useEffect } from 'react';

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

  return <S.Progress $styles={styles} $isStarted={isStarted} $isHidden={isHidden}>{percentage}%</S.Progress>;
}
