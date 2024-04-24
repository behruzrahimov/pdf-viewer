import { Document, Page, Text } from "@react-pdf/renderer"
export const Doc = () => (
  <Document>
    <Page wrap={false}>
      <Text>Hello world</Text>
      <Text>Hello world</Text>
    </Page>
  </Document>
)
