import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Injectable({ providedIn: 'root' })
export class PdfFirmaService {

    async firmarPdfExistente(
        pdfOriginal: Blob,
        firmaBase64: string
    ): Promise<Blob> {

        const pdfBytes = await pdfOriginal.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const page = pdfDoc.getPages()[0];

        const firmaBytes = await fetch(firmaBase64).then(r => r.arrayBuffer());
        const firmaImage = await pdfDoc.embedPng(firmaBytes);

        const { width } = page.getSize();

        page.drawImage(firmaImage, {
            x: width / 2 - 60,
            y: 120,
            width: 120,
            height: 60
        });

        const signedPdfBytes = await pdfDoc.save();

        const arrayBuffer = signedPdfBytes.slice().buffer;

        return new Blob([arrayBuffer], { type: 'application/pdf' });

    }
}
