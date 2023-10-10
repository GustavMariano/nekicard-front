import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastSuccessProps {
    message: string;
  }

const ToastSuccess: React.FC<ToastSuccessProps> = ({ message }) => {
  return toast.success(message, {
    toastId: "toastSuccess",
    autoClose: 3000,
    position: "top-left",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default ToastSuccess;