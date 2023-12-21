/**
 * Retrieves the permissions from a given HTML form.
 *
 * @param {HTMLFormElement} form - The HTML form to retrieve permissions from.
 * @return {Array<string>} An array of permissions.
 */
export const getPermissions = (form: HTMLFormElement): Array<string> => {
  if(!form) {
    console.log('Form is not defined');
    return [];
  }

  const data = new FormData(form as HTMLFormElement);
  const formData = Object.fromEntries(data.entries());
  const permissions = Object.keys(formData).map((key) => key);

  return permissions;
}
