import * as Figma from 'figma-js';

const client = Figma.Client({
  personalAccessToken: token
});

const baseUrl = "https://api.figma.com";
const documentId = "8B6ypiC8UN7cqrLUXf7QuC";


async function getStyles(documentId: string) {
  const result = await client.file(documentId)
  const styles = result.data.styles;
  const root = result.data.document;

  for (const node_id in styles) {
    const style = styles[node_id];
    const node = await findNode(root, node_id);
    console.log(style, node);
  }
}

async function findNode(node: Figma.Node, nodeId: string) {
  if (node.id === nodeId) {
    return node;
  }


  if ("children" in node && node.children) {
    for (const child of node.children) {
      const result = await findNode(child, nodeId);
      if (result) {
        return result;
      }
    }
  }
  return null;

}

getStyles(documentId);

//console.log(result);