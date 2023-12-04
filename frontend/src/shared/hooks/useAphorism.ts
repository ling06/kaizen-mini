import { APHORISMS } from '@/shared/constants';
import { IAphorism } from '@/shared/types';

/**
 * Returns a random aphorism from the list of aphorisms, or a default aphorism if the list is empty.
 *
 * @return {IAphorism} The aphorism object with the text and author properties.
 */
export const useAphorism = (): IAphorism => {
  const defaultAphorism: IAphorism = {
    text: 'Во всем надлежит действовать терпеливо.',
    author: 'Набэсима Наосигэ',
  };

  const aphorisms = APHORISMS;
  if (!aphorisms || aphorisms.length === 0) {
    return defaultAphorism;
  }

  const randomIndex = Math.floor(Math.random() * aphorisms.length);
  return aphorisms[randomIndex];
};
