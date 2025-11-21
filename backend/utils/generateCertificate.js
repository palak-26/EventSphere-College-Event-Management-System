const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

module.exports = async function generateCertificate({ event, userId }) {
  const user = await User.findById(userId);
  const name = user ? user.name : 'Participant';
  const filename = `certificate_${event._id}_${userId}_${Date.now()}.pdf`;
  const outDir = path.join(__dirname, '..', 'generated');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const filepath = path.join(outDir, filename);

  const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
  doc.pipe(fs.createWriteStream(filepath));

  doc.rect(0,0, doc.page.width, doc.page.height).fill('#f7fbff');
  doc.fill('#0b2a66').fontSize(40).text('Certificate of Participation', { align:'center', valign:'center', margin: 40 });
  doc.moveDown(1);
  doc.fontSize(26).text(`${name}`, { align:'center' });
  doc.moveDown(0.5);
  doc.fontSize(18).text(`has participated in`, { align:'center' });
  doc.moveDown(0.5);
  doc.fontSize(22).text(`${event.title}`, { align:'center' });

  doc.end();
  return `/generated/${filename}`;
};
