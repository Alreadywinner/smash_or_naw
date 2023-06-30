import { useEffect, useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setValue(
          event.newValue !== null ? JSON.parse(event.newValue) : defaultValue,
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [defaultValue, key]);

  return { value };
};

export default useLocalStorage;
