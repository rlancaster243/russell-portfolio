import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SkillData {
  skill: string;
  level: number;
}

interface SkillsRadarChartProps {
  data: SkillData[];
}

export default function SkillsRadarChart({ data }: SkillsRadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 500;
    const height = 500;
    const margin = 80;
    const radius = Math.min(width, height) / 2 - margin;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const angleSlice = (Math.PI * 2) / data.length;

    // Create radial scale
    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    // Draw circular grid
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i;
      g.append('circle')
        .attr('r', levelRadius)
        .attr('fill', 'none')
        .attr('stroke', 'hsl(var(--border))')
        .attr('stroke-opacity', 0.3);

      if (i === levels) {
        g.append('text')
          .attr('x', 5)
          .attr('y', -levelRadius)
          .attr('fill', 'hsl(var(--muted-foreground))')
          .attr('font-size', '10px')
          .text('100%');
      }
    }

    // Draw axes
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const lineCoord = {
        x: rScale(100) * Math.cos(angle),
        y: rScale(100) * Math.sin(angle),
      };

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', lineCoord.x)
        .attr('y2', lineCoord.y)
        .attr('stroke', 'hsl(var(--border))')
        .attr('stroke-opacity', 0.3);

      // Add labels
      const labelCoord = {
        x: rScale(115) * Math.cos(angle),
        y: rScale(115) * Math.sin(angle),
      };

      g.append('text')
        .attr('x', labelCoord.x)
        .attr('y', labelCoord.y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'hsl(var(--foreground))')
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .text(d.skill);
    });

    // Draw data polygon
    const radarLine = d3
      .lineRadial<SkillData>()
      .radius((d) => rScale(d.level))
      .angle((d, i) => angleSlice * i)
      .curve(d3.curveLinearClosed);

    g.append('path')
      .datum(data)
      .attr('d', radarLine as any)
      .attr('fill', 'hsl(var(--primary))')
      .attr('fill-opacity', 0.3)
      .attr('stroke', 'hsl(var(--primary))')
      .attr('stroke-width', 2);

    // Add data points
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const coord = {
        x: rScale(d.level) * Math.cos(angle),
        y: rScale(d.level) * Math.sin(angle),
      };

      g.append('circle')
        .attr('cx', coord.x)
        .attr('cy', coord.y)
        .attr('r', 5)
        .attr('fill', 'hsl(var(--primary))')
        .attr('stroke', 'hsl(var(--background))')
        .attr('stroke-width', 2);
    });
  }, [data]);

  return (
    <div className="flex justify-center items-center w-full">
      <svg ref={svgRef} className="max-w-full h-auto"></svg>
    </div>
  );
}
