import React, { useEffect, useState, useRef } from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  ImageFormat,
} from "@syncfusion/ej2-react-documenteditor";
import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF,
} from "@syncfusion/ej2-pdf-export";
DocumentEditorContainerComponent.Inject(Toolbar);
import apiDocs from "../../api/documents/document";

export default function DocEditor() {
  useEffect(() => {
    const data = "Document";
    apiDocs
      .createDocument(data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let container: DocumentEditorContainerComponent;
  let contentChanged: boolean = false;
  function onClick() {
    let obj = container;
    let pdfdocument: PdfDocument = new PdfDocument();
    let count: number = obj.documentEditor.pageCount;
    obj.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
    let loadedPage = 0;
    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        let format: ImageFormat = "image/jpeg" as ImageFormat;
        // Getting pages as image
        let image = obj.documentEditor.exportAsImage(i, format);
        image.onload = function () {
          let imageHeight = parseInt(
            image.style.height.toString().replace("px", "")
          );
          let imageWidth = parseInt(
            image.style.width.toString().replace("px", "")
          );
          let section: PdfSection = pdfdocument.sections.add() as PdfSection;
          let settings: PdfPageSettings = new PdfPageSettings(0);
          if (imageWidth > imageHeight) {
            settings.orientation = PdfPageOrientation.Landscape;
          }
          settings.size = new SizeF(imageWidth, imageHeight);
          (section as PdfSection).setPageSettings(settings);
          let page = section.pages.add();
          let graphics = page.graphics;
          let imageStr = image.src.replace("data:image/jpeg;base64,", "");
          let pdfImage = new PdfBitmap(imageStr);
          graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
          loadedPage++;
          if (loadedPage == count) {
            // Exporting the document as pdf
            pdfdocument.save(
              (obj.documentEditor.documentName === ""
                ? "file-download"
                : obj.documentEditor.documentName) + ".pdf"
            );
          }
        };
      }, 500);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <button id="export" className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
          Export
        </button>
        <DocumentEditorContainerComponent
          id="container"
          height={"100vh"}
          enableToolbar={true}
          ref={(scope) => {
            container = scope;
          }}
        ></DocumentEditorContainerComponent>
      </div>
    </>
  );
}
