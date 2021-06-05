import { useState } from 'react';

export const useLeftMenu = (defaults: boolean) => {
  const [isOpen, setIsOpen] = useState(defaults);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return { isOpen, toggleIsOpen };
}