// THIS CODE WORKS BUT NEEDS TO BE REFACTORED
export interface RdfLink {
  source: URL;
  target: URL;
  label: string;
}

export interface SerializedRdfLink {
  source: { id: string; x?: number; y?: number };
  target: { id: string; x?: number; y?: number };
  label: string;
}
export interface RdfNode {
  idUrl: URL;
  name: string;
  outgoingLinks?: RdfLink[];
  type: "object" | "subject";
}

export interface SerializedRdfNode {
  idUrl: string;
  name: string;
  type: "object" | "subject";
  x?: number;
  y?: number;
}
export interface IRdfNodeSet {
  set: RdfNode[];
  getIndex(nodeUrl: RdfNode["idUrl"]): number;
  addNode(node: RdfNode): boolean;
  addOrUpdateNode(node: Partial<RdfNode>): boolean;
  extractNodesFromRdf(xmlDoc: Document): void;
}
export default class RdfNodeSet implements IRdfNodeSet {
  constructor(args: RdfNode[]) {
    if (args.length > 0) this.set = this.set.concat(args);
  }
  set: RdfNode[] = [];

  getIndex(nodeUrl: RdfNode["idUrl"]): number {
    return this.set.findIndex((node) => node.idUrl.href === nodeUrl.href);
  }
  addNode(node: RdfNode) {
    if (this.getIndex(node.idUrl) !== -1) return false;
    this.set.push(node);
    return true;
  }
  addOrUpdateNode(node: Partial<RdfNode>) {
    if (!node.idUrl) return false;
    const index = this.getIndex(node.idUrl);
    if (index > -1) {
      this.set[index].idUrl = node.idUrl || this.set[index].idUrl;
      this.set[index].name = node.name || this.set[index].name;
      this.set[index].outgoingLinks =
        node.outgoingLinks || this.set[index].outgoingLinks;
      this.set[index].type = node.type || this.set[index].type;
      return true;
    }
    if (node.idUrl && node.name && node.outgoingLinks && node.type) {
      this.set.push(node as RdfNode);
      return true;
    }
    return false;
  }
  extractNodesFromRdf(xmlDoc: Document) {
    const rdfElements = xmlDoc.getElementsByTagName("rdf:Description");

    Array.from(rdfElements).forEach((element: Element) => {
      const rdfAbout = element.getAttribute("rdf:about");
      if (!rdfAbout) return;
      const idUrl = new URL(rdfAbout);
      const name =
        element.getElementsByTagName("foaf:name")[0].textContent || "";
      const outgoingLinks: RdfLink[] = [];
      const type = "object";
      const predicates = element.children;
      Array.from(predicates).forEach((child: Element) => {
        if (child.nodeName === "foaf:name") return;
        if (child.nodeName === "rdf:about") return;
        const rdfResource = child.getAttribute("rdf:resource");
        if (!rdfResource) return;
        const rdfLink = {
          source: idUrl,
          target: new URL(rdfResource),
          label: child.nodeName.split(":").pop() || "",
        };
        outgoingLinks.push(rdfLink);
        if (this.getIndex(new URL(rdfResource)) < 0) {
          this.set.push({
            idUrl: rdfLink.target,
            name: rdfResource.split("/").pop() || "",
            outgoingLinks: [],
            type: "object",
          });
        }
      });
      const indexInSet = this.getIndex(idUrl);
      if (indexInSet < 0) {
        this.set.push({ idUrl, name, outgoingLinks, type });
      } else {
        this.set[indexInSet] = { idUrl, name, outgoingLinks, type };
      }
    });
  }
}
