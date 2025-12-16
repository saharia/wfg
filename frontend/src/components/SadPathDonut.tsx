
import * as d3 from "d3";
import { useEffect, useRef } from "react";


export function SadPathDonut() {
  const ref = useRef<SVGSVGElement>(null);

  const innerData = [
    { name: "Unsupported Language", value: 30, color: "#6eaad8" },
    { name: "Customer Hostility", value: 10, color: "#cfe8b4" },
    { name: "Caller Identification", value: 60, color: "#bfe1f2" },
  ];

  const outerData = [
    { name: "Assistant did not speak Spanish", value: 25, color: "#9fc8e3" },
    { name: "Assistant did not speak French", value: 25, color: "#78b3dc" },
    { name: "Verbal Aggression", value: 10, color: "#5a9ccc" },
    { name: "User refused to confirm identity", value: 20, color: "#d7ebf6" },
    { name: "Incorrect caller identity", value: 20, color: "#b5d9ef" },
  ];


  useEffect(() => {
    const width = 800;
    const height = 380;
    const radiusOuter = 135;
    const radiusInner = 85;
    const holeRadius = 35;
    const labelOffset = 160;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<any>().value(d => d.value).sort(null);

    const outerArc = d3.arc<any>()
      .innerRadius(radiusInner)
      .outerRadius(radiusOuter);

    const innerArc = d3.arc<any>()
      .innerRadius(holeRadius)
      .outerRadius(radiusInner - 2);


    const outerArcs = pie(outerData);
    const innerArcs = pie(innerData);

    /* ---------------- DRAW DONUTS ---------------- */

    svg.selectAll(".outer-slice")
      .data(outerArcs)
      .enter()
      .append("path")
      .attr("class", "outer-slice")
      .attr("d", outerArc)
      .attr("fill", d => d.data.color);

    svg.selectAll(".inner-slice")
      .data(innerArcs)
      .enter()
      .append("path")
      .attr("class", "inner-slice")
      .attr("d", innerArc)
      .attr("fill", d => d.data.color);

    /* ---------------- LABEL SOURCE ---------------- */
    /**
     * Decide which arcs control labels.
     * This keeps layout identical to your screenshot.
     */
    const labelArcs = [
      ...outerArcs.map(d => ({ ...d, ring: "outer" })),
      ...innerArcs.map(d => ({ ...d, ring: "inner" })),
    ];

    const innerR = innerArc.innerRadius()(null);
    const innerR2 = innerArc.outerRadius()(null);

    const outerR = outerArc.innerRadius()(null);
    const outerR2 = outerArc.outerRadius()(null);

    const anchorRadius = {
      inner: innerR + (innerR2 - innerR) * 0.6,
      outer: outerR + (outerR2 - outerR) * 0.55,
    };

    function polarToCartesian(d: any, r: number) {
      const angle = midAngle(d) - Math.PI / 2;
      return [
        Math.cos(angle) * r,
        Math.sin(angle) * r,
      ];
    }


    /* ---------------- CONNECTORS ---------------- */

    svg.selectAll("line.connector")
      .data(labelArcs)
      .enter()
      .append("line")
      .attr("class", "connector")
      // .attr("stroke", d => d.data.color)
      .attr("stroke", d => {
        const c = d3.color(d.data.color);
        return c ? c.darker(0.8).toString() : d.data.color;
      })
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", d =>
        d.ring === "outer" ? "3,3" : "0"
      )
      .attr("x1", d => polarToCartesian(d, anchorRadius[d.ring as keyof typeof anchorRadius])[0])
      .attr("y1", d => polarToCartesian(d, anchorRadius[d.ring as "inner" | "outer"])[1])
      .attr("x2", d => labelOffset * (midAngle(d) < Math.PI ? 1 : -1))
      .attr("y2", d => polarToCartesian(d, anchorRadius[d.ring as "inner" | "outer"])[1]);



    /* ---------------- LABELS ---------------- */


    svg.selectAll("text.label")
      .data(labelArcs)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => labelOffset * (midAngle(d) < Math.PI ? 1 : -1))
      .attr("y", d => {
        const sourceArc = d.ring === "outer" ? outerArc : innerArc;
        return sourceArc.centroid(d)[1];
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", d =>
        midAngle(d) < Math.PI ? "start" : "end"
      )
      .attr("font-size", d =>
        d.ring === "inner" ? 13 : 11   // 🔥 inner bigger
      )
      .attr("font-weight", d =>
        d.ring === "inner" ? 500 : 400
      )
      .attr("fill", d => d.data.color)
      .text(d => d.data.name);


    function midAngle(d: any) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
  }, []);

  return (
    <div className="bg-[#eef2f6] p-6 rounded-xl">
      <svg ref={ref} />
    </div>
  );
}
