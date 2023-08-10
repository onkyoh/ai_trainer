import { COLORS } from "../../../utils/constants";

interface IProps {
  success: Boolean;
  message: string;
}

const Toast = ({ success, message }: IProps) => {
  const toastIcon = {
    backgroundColor: success ? COLORS.MINT : COLORS.YELLOW,
  };

  return (
    <div className="toast" aria-label="alert">
      <span style={toastIcon}>{success ? "✓" : "!"}</span>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
