import { usePDF } from "@react-pdf/renderer"
import { useState } from "react"
import { Doc } from "./pdf"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function App() {
  const pdf = usePDF({ document: <Doc /> })
  const [numPages, setNumPages] = useState<number | null>(null)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }
  return (
    <div>
      {!pdf[0].loading && (
        <Document file={pdf[0].blob} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={600} // Adjust width as per requirement
            />
          ))}
        </Document>
      )}
    </div>
  )
}
