// context/PopupContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface PopupContextType {
  showPopup: (message: string, title?: string) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("Notice");

  const showPopup = (msg: string, popupTitle: string = "Notice") => {
    setMessage(msg);
    setTitle(popupTitle);
  };

  const closePopup = () => setMessage(null);

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {message && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p
              className="mb-4 max-h-[120px] overflow-auto break-words whitespace-pre-wrap"
              title={message} // show full text on hover
            >
              {message.length > 200 ? message.slice(0, 200) + "..." : message}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={closePopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};
