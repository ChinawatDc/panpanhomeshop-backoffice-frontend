import { Modal } from 'antd';
import { useState } from 'react';

type Config = {
  title?: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  closable?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
};

const useModal = (conf?: Config) => {
  const [isOpen, setIsOpen] = useState(false);

  const mobileWidth = (width: number | string): number | string | undefined => {
    return width;
  };

  const onClose = () => {
    conf?.onClose?.();
    setIsOpen(false);
  };

  const onSuccess = () => {
    conf?.onSuccess?.();
    setIsOpen(false);
  };

  const render = (r: () => JSX.Element) => {
    return (
      <Modal
        open={isOpen}
        width={conf?.width ? mobileWidth(conf?.width) : undefined}
        style={{
          minWidth: conf?.minWidth,
          maxWidth: conf?.maxWidth ? mobileWidth(conf?.maxWidth) : undefined,
        }}
        title={conf?.title ? <h3 className='text-theme-1'>{conf?.title}</h3> : null}
        closable={conf?.closable}
        onCancel={onClose}
        footer={false}
        centered
        destroyOnClose
      >
        {r()}
      </Modal>
    );
  };

  return {
    render,
    open: () => setIsOpen(true),
    close: onClose,
    success: onSuccess,
  };
};

export default useModal;
