<template>
  <div>
    <textarea
      v-model="rdfXml"
      class="text-xs"
      placeholder="Paste RDF XML here"
    ></textarea>
    <button class="text-xs" @click="parseRdfXml">Parse RDF XML</button>
    <canvas ref="canvas" width="850" height="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as d3 from "d3";
import RdfNodeSet, {
  type RdfLink,
  type RdfNode,
  type SerializedRdfNode,
  type SerializedRdfLink,
} from "./RdfNodes.ts";

const rdfXml = ref(`
<!-- TRY CHANGING THE RDF XML HERE-->
<!-- THIS DOESN'T FULLYFOLLOW THE SPECIFICATIONS AND STANDARDS, IT'S JUST A SIMPLE EXAMPLE -->

<rdf:RDF xmlns:rdf="http://www.w4.org/1999/02/22-rdf-syntax-ns#"
  xmlns:foaf="http://xmlns.com/foaf/0.1/"
  xmlns:ex="http://example.org/">

  <rdf:Description rdf:about="http://example.org/Bujayr_the_Bedouin">
    <foaf:name>Bujayr the Bedouin</foaf:name>
    <ex:owns rdf:resource="http://example.org/Cecil_the_Camel" />
    <ex:livesIn rdf:resource="http://example.org/Desert" />
    <ex:occupation>Nomad Shepherd</ex:occupation>
  </rdf:Description>

  <rdf:Description rdf:about="http://example.org/Cecil_the_Camel">
    <foaf:name>Cecil the Camel</foaf:name>
    <ex:type rdf:resource="http://example2.org/Animal" />
    <ex:habitat rdf:resource="http://example.org/Desert" />
    <ex:usedFor rdf:resource="http://example.org/Transportation" />
  </rdf:Description>

  <rdf:Description rdf:about="http://example.org/Toyota4x4">
    <foaf:name>Toyota 4x4</foaf:name>
    <ex:type rdf:resource="http://example2.org/Car" />
    <ex:engine rdf:resource="http://example.org/V6_diesel_engine" />
    <ex:usedFor rdf:resource="http://example.org/Transportation" />
  </rdf:Description>

  <rdf:Description rdf:about="http://example.org/FennecFox">
    <foaf:name>Fennec Fox</foaf:name>
    <ex:type rdf:resource="http://example2.org/Animal" />
    <ex:habitat rdf:resource="http://example.org/Desert" />
    <ex:alimentation rdf:resource="http://example2.org/Omnivore" />
  </rdf:Description>

  <rdf:Description rdf:about="http://example2.org/Omnivore">
    <foaf:name>Omnivore</foaf:name>
    <ex:subsetOf rdf:resource="http://example2.org/Animal" />
  </rdf:Description>
</rdf:RDF>
`);

const canvas = ref<HTMLCanvasElement | null>(null);

const parseRdfXml = () => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rdfXml.value, "application/xml");
  const rdfNodeSet = new RdfNodeSet([]);
  rdfNodeSet.extractNodesFromRdf(xmlDoc);

  drawGraph(rdfNodeSet.set);
};

const drawGraph = (nodeSet: RdfNode[]) => {
  if (!canvas.value) return;
  const context = canvas.value.getContext("2d");
  if (!context) return;
  context.clearRect(0, 0, canvas.value.width, canvas.value.height);

  const nodes: SerializedRdfNode[] = [];
  const links: SerializedRdfLink[] = [];

  Array.from(nodeSet).forEach((node: RdfNode) => {
    nodes.push({
      idUrl: node.idUrl.href,
      name: node.name,
      type: node.type,
    });
    node.outgoingLinks?.forEach((link: RdfLink) => {
      links.push({
        source: link.source.href,
        target: link.target.href,
        label: link.label,
      });
    });
  });

  const simulation = d3
    .forceSimulation(nodes)
    .force("x", d3.forceX(canvas.value.width / 2).strength(0.4))
    .force("y", d3.forceY(canvas.value.height / 2).strength(0.6))
    .force(
      "charge",
      d3.forceManyBody().strength((d: any) => {
        const hasLinks = links.some(
          (link) =>
            link.source.idUrl === d.idUrl || link.target.idUrl === d.idUrl
        );
        return hasLinks ? -100 : -10000;
      })
    )
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d: any) => d.idUrl)
        .distance(() => 150)
    );

  // this gets sticky after the first render, you have to wait and try to zoom in and out and pan to 'unstick' it
  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 10])
    .on("zoom", (event: { transform: { x: number; y: number; k: number } }) => {
      context.save();
      context.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
      context.translate(event.transform.x, event.transform.y);
      context.scale(event.transform.k, event.transform.k);
      draw();
      context.restore();
    });

  d3.select(canvas.value).call(zoom);

  function draw() {
    if (context) {
      context.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
      context.strokeStyle = "#11cc11";
      links.forEach((link) => {
        context.beginPath();
        context.moveTo(link.source.x, link.source.y);
        context.lineTo(link.target.x, link.target.y);
        context.stroke();

        // Draw arrow
        const arrowLength = 10;
        const arrowWidth = 3;
        const angle = Math.atan2(
          link.target.y - link.source.y,
          link.target.x - link.source.x
        );
        context.save();
        context.translate(link.target.x, link.target.y);
        context.rotate(angle);
        context.beginPath();
        context.moveTo(-arrowLength, -arrowWidth);
        context.lineTo(0, 0);
        context.lineTo(-arrowLength, arrowWidth);
        context.fillStyle = "#11cc11";
        context.fill();
        context.restore();
      });

      context.fillStyle = "#f0f0f0";
      nodes.forEach((node) => {
        context.beginPath();
        context.arc(node.x, node.y, 5, 0, 2 * Math.PI);
        context.fill();

        context.fillStyle = "#f0f0f0";
        context.font = "12px Arial";
        context.fillText(node.name, node.x + 6, node.y - 6);
      });

      context.fillStyle = "#cc121f";
      context.font = "12px Arial";
      links.forEach((link) => {
        const midX = (link.source.x + link.target.x) / 2;
        const midY = (link.source.y + link.target.y) / 2;
        let angle = Math.atan2(
          link.target.y - link.source.y,
          link.target.x - link.source.x
        );

        // Reverse the direction of the angle for the line right to left cases
        if (link.source.x > link.target.x) {
          angle += Math.PI;
        }

        context.save();
        context.translate(midX, midY);
        context.rotate(angle);
        context.fillText(link.label, 0, -5); // Adjust -5 to position text above the link
        context.restore();
      });

      // Draw legend box
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = "gray";
      context.fillRect(10, 10, 150, 80);
      context.strokeStyle = "black";
      context.strokeRect(10, 10, 150, 80);

      context.fillStyle = "#11cc11";
      context.fillText("Links", 20, 30);
      context.fillStyle = "#f0f0f0";
      context.fillText("Nodes", 20, 50);
      context.fillStyle = "#cc121f";
      context.fillText("Relations", 20, 70);
      context.restore();
    }
  }
  simulation.on("tick", draw);
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
canvas {
  border: 1px solid black;
}
</style>
