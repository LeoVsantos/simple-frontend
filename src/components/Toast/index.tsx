import { ToastContainer, Toast } from 'react-bootstrap';


interface toastOptions {
  variant?: 'info' | 'warning' | 'success' | 'danger',
  title: string;
  body: string;
}


export function ToastMessage({title, body, variant = 'info'}: toastOptions) {
  return (
        <ToastContainer className="p-3" position={'top-end'}>
          <Toast bg={variant}>
            <Toast.Header closeButton={true}>
              <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
          </Toast>
        </ToastContainer>
  );
}