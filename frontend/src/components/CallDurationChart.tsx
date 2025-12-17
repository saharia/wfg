import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useLastAnalyticsResult } from "../hooks/useLastAnalyticsResult";


// Data that creates a clear bell-curve shape

export type ChatOption = {
  time: number;
  value: number;
};

const CallDurationChart = () => {

  const svgRef = useRef<SVGSVGElement | null>(null);

  const initialData = [
    { time: 0, value: 5 },
    { time: 1, value: 10 },
    { time: 2, value: 25 },
    { time: 3, value: 45 },
    { time: 4, value: 80 },
    { time: 5, value: 95 },
    { time: 6, value: 100 }, // Peak
    { time: 7, value: 95 },
    { time: 8, value: 80 },
    { time: 9, value: 45 },
    { time: 10, value: 25 },
    { time: 11, value: 10 },
    { time: 12, value: 5 },
  ];

  // Get **latest cached data** from any email (or fallback to empty)
  const cachedData = useLastAnalyticsResult();

  console.log("All Cached Queries:", cachedData);


  console.log("First Cached Result:", cachedData);
  const data =
    cachedData && cachedData.length > 0
      ? cachedData
      : initialData;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 250;
    svg.attr("width", width).attr("height", height);

    const margin = { top: 20, right: 0, bottom: 20, left: 0 };

    // **KEY FIX 1: Define the Y-Coordinate of the Flat Baseline**
    // This should be a fixed SVG coordinate near the bottom,
    // which the area fill and the baseline line will both use.
    const baselineYCoordinate = height - margin.bottom - 5; // 5 pixels above the bottom margin

    // --- SCALES ---
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.time) as [number, number])
      .range([margin.left, width - margin.right]);

    const maxValue = d3.max(data, (d) => d.value)!;

    // Y scale range is adjusted so the wave peak is near the top margin
    const y = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([baselineYCoordinate, margin.top]); // Start Y at the flat baseline, end at the top margin

    // --- AREA GENERATOR ---
    const area = d3
      .area<{ time: number; value: number }>()
      .x((d) => x(d.time))
      // **KEY FIX 2: Set Area Baseline (y0) to the Fixed SVG Coordinate**
      // This forces the area fill to stop exactly at the straight horizontal line.
      .y0(baselineYCoordinate)
      .y1((d) => y(d.value))
      .curve(d3.curveBasis);

    // --- RENDERING ---
    svg.selectAll("*").remove();

    // 1. Gradient Definition (Same as before)
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "waveGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#6fa9da"); // Peak color

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#c3e2f5"); // Bottom color

    // 2. Append the Area Path (The Wave Fill)
    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#waveGradient)")
      // We only want the stroke on the top and bottom edge, not the sides.
      .attr("d", area);

    // 3. Draw the Top Edge Stroke (The Wave Line)
    const line = d3.line<{ time: number; value: number }>()
      .x(d => x(d.time))
      .y(d => y(d.value))
      .curve(d3.curveBasis);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#6fa9da") // Medium blue stroke
      .attr("stroke-width", 2)
      .attr("d", line);

    // 4. Draw the Flat Bottom Baseline Stroke
    svg.append("line")
      .attr("x1", margin.left)
      .attr("y1", baselineYCoordinate)
      .attr("x2", width - margin.right)
      .attr("y2", baselineYCoordinate)
      .attr("stroke", "#a3b1c6") // Light grey/blue stroke for the baseline
      .attr("stroke-width", 1.5);

  }, [data]);

  return (
    <div className="bg-[#eef2f6] rounded-xl">
      <h3 className="text-xl font-semibold mb-2">Call Duration Analysis</h3>
      <svg ref={svgRef}></svg>
    </div>
  )
};

export default CallDurationChart;