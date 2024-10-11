import axios from "axios";

const baseUrl = "https://api.figma.com";
const documentId = "8B6ypiC8UN7cqrLUXf7QuC";

axios.defaults.headers.common["X-Figma-Token"] = token;

const documentUrl = `${baseUrl}/v1/files/${documentId}`;
const styleMetaUrl = `${baseUrl}/v1/files/${documentId}/styles`;
const result = await axios.get(documentUrl);
const element = result.data.document;
const styleMetaResult = await axios.get(styleMetaUrl);

const styles: {key: string, node_id: string, name: string}[] = styleMetaResult.data.meta.styles;

for (const s of styles) {
  const k = s.node_id;

}


//console.log(result);