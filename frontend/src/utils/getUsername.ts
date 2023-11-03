
interface IUsername {
  firstName: string;
  lastName: string;
}
/**
 * Retrieves the first and last name from a given username string.
 *
 * @param {string} username - The username string.
 * @return {IUsername | null} - An object containing the first and last name, or null if the username is empty or invalid.
 */
export const getUsername = (username?: string): IUsername | null => {
  if (!username) return null;

  const [firstName, lastName] = username.split(' ');

  if (!firstName || !lastName) return null;

  return {
    firstName,
    lastName,
  };
};
