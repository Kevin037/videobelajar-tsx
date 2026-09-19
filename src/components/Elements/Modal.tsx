type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};


export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      {/* MODAL */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-100">
        {children}
      </div>
    </div>
  );
}
