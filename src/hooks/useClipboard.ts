import { useState } from "react";

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Nusxalashda xatolik yuz berdi:", error);
      setIsCopied(false);
    }
  };

  return { isCopied, copyToClipboard };
};

export default useClipboard;
