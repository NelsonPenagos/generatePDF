const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = {

  generatePDF: (userInfo, userExam) => {

    const doc = new PDFDocument;

    doc.pipe(fs.createWriteStream('C:\\Users\\nelson.penagos\\Documents\\output.pdf'));

    doc.font('Times-Roman')
      .fontSize(12)
      .text('', 125, 20);

    for (let item in userInfo) {
      if (item != 'data') {
        doc.text(item + ':' + userInfo[item], {
          width: 400,
          align: 'right'
        });
      }
    }

    doc.font('Times-Bold')
      .fontSize(15)
      .text('RESULTADO DE EXAMEN', 100, 90, {
        align: 'center'
      })

    doc.font('Times-Roman')
      .fontSize(10)
      .text('', 30)
      .moveDown();

    for (let item in userInfo.data) {
      if (item <= 7) {
        doc.text(userInfo.data[item].name + ':' + userInfo.data[item].value)
      }
    }

    doc.text('', 300, 120)

    for (let item in userInfo.data) {
      if (item > 7) {
        doc.text(userInfo.data[item].name + ':' + userInfo.data[item].value)
      }
    }

    doc.font('assets/fonts/B612Mono-Regular.ttf')
      .fontSize(9)
      .text('', 40)
      .moveDown(3);

    console.log(userExam.length)
    for (let item in userExam) {
      let data = userExam[item].data
      for (let info in data) {
        doc.text(data[info].texto_formato)
      }
    }


    // Add an image, constrain it to a given size, and center it vertically and horizontally
    /*doc.image('path/to/image.png', {
       fit: [250, 300],
       align: 'center',
       valign: 'center'
    });*/

    // Add another page


    doc.end();
  }
}


