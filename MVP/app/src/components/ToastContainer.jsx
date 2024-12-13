import { useToast } from '../contexts/ToastContext';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 m-4 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="bg-blue-500 text-white p-2 rounded shadow">
          {toast.message}
          <button onClick={() => removeToast(toast.id)} className="ml-2">X</button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
