const PDFDocument = require("pdfkit");
const fs = require("fs");

module.exports = {
  generatePDF: data => {
    let i;
    let end;
    let userName;
    const doc = new PDFDocument({
      bufferPages: true
    });

    for (let index in data.exam) {
      head(data, doc, index, data.exam.length);
      userName = userInfo(data.exam[index], doc);
      userExamResult(data.exam[index], doc);
      infoSpecialist(data.exam[index], doc);

      /**
       * Title
       */
      doc
        .font("Times-Bold")
        .fontSize(13)
        .text("RESULTADO DE EXAMEN", 100, 90, {
          align: "center"
        });

      /**
       * Footer
       */
      doc
        .font("Times-Roman")
        .fontSize(9)
        .text(
          "Nota (*) corresponde a valor fuera de rango",
          25,
          doc.page.height - 30,
          {
            lineBreak: false
          }
        );
      doc.addPage();
    }

    // see the range of buffered pages
    const range = doc.bufferedPageRange(); // => { start: 0, count: 2 }
    range.count = range.count - 1;
    for (
      i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
      doc.switchToPage(i);
      doc.text(
        `No de Páginas        :    ${i + 1} de ${range.count}`,
        399,
        56,
        {
          width: 400,
          align: "left"
        }
      );
    }
    doc.pipe(
      fs.createWriteStream(
        `/home/sethflox/Documents/Proyectos/Freelance/${userName}.pdf`
      )
    );

    doc.end();
  }
};

/**
 * Generate info date
 * @param {*} data
 * @param {*} doc
 */
function head(data, doc) {
  let margin = 20;
  for (let infoDate in data) {
    if (infoDate != "exam") {
      doc.font("Times-Roman").fontSize(9);

      doc.text(infoDate, 400, margin, {
        width: 400,
        align: "left"
      });

      doc.text("    :    " + data[infoDate], 460, margin, {
        width: 400,
        align: "left"
      });

      margin = margin + 12;
    }
  }
}

/**
 * Generate data User
 * @param {*} data
 * @param {*} doc
 */
function userInfo(data, doc) {
  let marginA = 125;
  let marginB = 125;
  let userInfo = data.userInfo;
  let userName = "";
  for (let item in userInfo) {
    if (item <= 7) {
      if (userInfo[item].name == "Paciente") {
        userName = userInfo[item].value;
      }

      doc.text(userInfo[item].name, 25, marginA, {
        width: 400,
        align: "left"
      });

      doc.text("  : " + userInfo[item].value, 75, marginA, {
        width: 400,
        align: "left"
      });
      marginA = marginA + 12;
    } else if (item == 8) {
      doc.text(userInfo[item].name, 255, marginB, {
        width: 400,
        align: "left"
      });

      doc.text("  : " + userInfo[item].value, 275, marginB, {
        width: 400,
        align: "left"
      });
    } else {
      doc.text(userInfo[item].name, 335, marginB, {
        width: 400,
        align: "left"
      });

      doc.text("  : " + userInfo[item].value, 410, marginB, {
        width: 400,
        align: "left"
      });

      marginB = marginB + 12;
    }
  }

  return userName;
}

/**
 * Result Exam
 * @param {*} data
 * @param {*} doc
 */
function userExamResult(data, doc) {
  doc.font("assets/fonts/CourierCyrillic_12144.ttf").fontSize(9);
  let margin = 225;
  let userExamResult = data.userExamResult;
  for (let item in userExamResult.data) {
    let result = userExamResult.data[item];
    doc.text(result.texto_formato, 30, margin);
    margin = margin + 12;
  }
}

function infoSpecialist(data, doc) {
  doc.font("Times-Bold").fontSize(9);
  let specialist = data.specialist;
  doc.text(specialist.name + ":" + specialist.value, 25, doc.page.height - 85, {
    lineBreak: false
  });
  doc.image(specialist.firm, 450, 680, {
    fit: [150, 75],
    align: "center",
    valign: "center"
  });
}
