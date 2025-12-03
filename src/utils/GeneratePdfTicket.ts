import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import fs from "fs";

interface TicketPDFOptions {
  ticketCode: string;
  eventTitle: string;
  userName: string;
  savePath: string; // e.g. "./tickets/ticket_123.pdf"
}

export const generateTicketPDF = async (
  options: TicketPDFOptions
): Promise<void> => {
  const { ticketCode, eventTitle, userName, savePath } = options;

  return new Promise(async (resolve, reject) => {
    try {
      // Generate QR code as DataURL
      const qrDataUrl = await QRCode.toDataURL(ticketCode);

      // Convert base64 QR to Buffer
      const qrImage = qrDataUrl.replace(/^data:image\/png;base64,/, "");
      const qrBuffer = Buffer.from(qrImage, "base64");

      // Create PDF
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      // Pipe PDF to file
      const pdfStream = fs.createWriteStream(savePath);
      doc.pipe(pdfStream);

      // Title
      doc.fontSize(26).text("Event Ticket", { align: "center" }).moveDown(1);

      // Event details
      doc.fontSize(18).text(`Event: ${eventTitle}`).moveDown(0.5);

      doc.fontSize(18).text(`Participant: ${userName}`).moveDown(0.5);

      doc.fontSize(18).text(`Ticket Code: ${ticketCode}`).moveDown(1);

      // Add QR code
      doc.text("Scan to verify:", { align: "left" }).moveDown(0.5);

      doc.image(qrBuffer, {
        width: 150,
        height: 150,
        align: "left",
      });

      // Footer
      doc
        .moveDown(2)
        .fontSize(12)
        .text("This ticket is auto-generated and valid for event entry.", {
          align: "center",
        });

      doc.end();

      pdfStream.on("finish", () => resolve());
      pdfStream.on("error", (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};
