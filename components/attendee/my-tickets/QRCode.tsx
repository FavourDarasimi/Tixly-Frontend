"use client";

import { QRCodeCanvas } from "qrcode.react";

type Props = {
  uuid: string;
};

export default function QRCode({ uuid }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <QRCodeCanvas
        value={uuid}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
    </div>
  );
}
