import type { DialogProps } from 'rc-dialog'
import Dialog from 'rc-dialog'

import './styles.css'

interface ModalProps extends DialogProps {}

function Modal(props: ModalProps) {
  return (
    <Dialog
      animation="zoom"
      maskAnimation="fade"
      {...props}
    >
      {props?.children && props.children}
    </Dialog>
  )
}

export type { ModalProps }
export { Modal }
export default Modal
