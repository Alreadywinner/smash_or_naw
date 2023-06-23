import { Toast as FlowToast } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import WarningIcon from '../../assets/warning.svg';
import SuccessIcon from '../../assets/success.svg';

const Toast = ({ onClose, message, type }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      // Close the toast after 400ms if it's still open
      timeoutId = setTimeout(() => {
        handleClose();
      }, 4000);
    }

    return () => {
      // Clear the timeout when the component unmounts or isOpen changes
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  return (
    <FlowToast className="fixed top-4 md:right-8 right-2 md:w-auto w-48 z-50">
      <div
        className={` ${
          type === 'error' ? 'bg-red-300' : 'bg-green-300'
        } inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-cyan-500`}
      >
        {type === 'error' ? (
          <img src={WarningIcon} alt="error" className="h-6 w-6" />
        ) : (
          <img src={SuccessIcon} alt="success" className="h-6 w-6" />
        )}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <FlowToast.Toggle onClick={handleClose} />
    </FlowToast>
  );
};

Toast.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Toast;
