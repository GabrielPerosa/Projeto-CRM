import React from 'react';
import { Dialog } from 'primereact/dialog';

interface PopupDialogProps {
    visible: boolean;
    onHide: () => void;
    message: string;
}

const PopupDialog: React.FC<PopupDialogProps> = ({ visible, onHide, message }) => {
    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            className="bg-green-400 p-4 text-center rounded-lg shadow-lg"
        >
            <p className="text-white font-bold">{message}</p>
        </Dialog>
    );
};

export default PopupDialog;