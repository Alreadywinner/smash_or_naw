export const getCookie = (name) => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.startsWith(`${name}=`)) {
      // Extract the cookie value
      const cookieValue = cookie.substring(name.length + 1);

      // Decode and return the cookie value
      return decodeURIComponent(cookieValue);
    }
  }

  // Cookie not found
  return null;
};
