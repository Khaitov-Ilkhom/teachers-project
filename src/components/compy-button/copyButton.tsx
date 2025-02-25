import {message} from "antd";
import useClipboard from "../../hooks/useClipboard.ts";
import {LuCopy, LuCopyCheck} from "react-icons/lu";

const CopyButton = ({text}: { text: string }) => {
  const {isCopied, copyToClipboard} = useClipboard();

  const handleCopy = () => {
    copyToClipboard(text);
    message.success("Matn nusxalandi!");
  };

  return (
      <button className="px-2" onClick={handleCopy}>
        {isCopied ? <LuCopyCheck/> : <LuCopy/>}
      </button>
  );
};

export default CopyButton;
