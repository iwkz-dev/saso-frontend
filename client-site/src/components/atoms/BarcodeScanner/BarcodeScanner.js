import React from "react";
import dynamic from "next/dynamic";

const BarcodeScanner = ({ getBarcode }) => {
    const BarcodeScannerComponent = dynamic(
        () => import("react-qr-barcode-scanner"),
        { ssr: false },
    );

    return (
        <BarcodeScannerComponent
            onUpdate={(err, result) => {
                if (result) getBarcode(result.text);
            }}
        />
    );
};

export default BarcodeScanner;
