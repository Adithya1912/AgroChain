import { useEffect } from 'react';

const MessageBox = ({ message, type, onClear }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => onClear(), 4000);
            return () => clearTimeout(timer);
        }
    }, [message, onClear]);

    if (!message) return null;

    const messageClass = type === 'success' ? 'message-box-success' : 'message-box-error';

    return (
        <div className={`message-box ${messageClass}`}>
            {message}
        </div>
    );
};

export default MessageBox;