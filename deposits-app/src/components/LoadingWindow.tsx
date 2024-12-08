                    import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

interface LoadingWindowProps {
    show: boolean;
    onHide: () => void;
}

const LoadingWindow: React.FC<LoadingWindowProps> = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body className="text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                </Spinner>
                <p>Loading, please wait...</p>
            </Modal.Body>
        </Modal>
    );
};

export default LoadingWindow;