/**
 * Returns the initials of a given full name.
 *
 * @param {string} fullName - The full name from which to extract the initials.
 * @return {string} The initials extracted from the full name.
 */
export const getInitials = (fullName: string): string => {
  if (!fullName) {
    return '';
  }
  
  const [firstName, lastName] = fullName.split(' ');
  
  if (!lastName || !firstName) {
    return '';
  }
  
  return `${firstName[0]}${lastName[0]}`;
};
