import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrScanner = ({ onScanSuccess }) => {
    const scannerRef = useRef(null);

    useEffect(() => {
        if (!scannerRef.current) return;
        const html5QrCode = new Html5Qrcode(scannerRef.current.id);
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        
        html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess)
            .catch(err => console.error("QR Scanner failed to start.", err));

        return () => {
            if (html5QrCode.isScanning) {
                html5QrCode.stop().catch(err => console.error("Failed to stop QR scanner.", err));
            }
        };
    }, [onScanSuccess]);

    return <div id={`qr-scanner-${Math.random()}`} ref={scannerRef} className="qr-scanner"></div>;
};

export default QrScanner;