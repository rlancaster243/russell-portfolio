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
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
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

    // Color scale for vibrant theme-based colors
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.skill))
      .range([
        'hsl(217, 91%, 60%)',  // Primary blue
        'hsl(142, 76%, 36%)',  // Green
        'hsl(262, 83%, 58%)',  // Purple
        'hsl(346, 77%, 50%)',  // Red
        'hsl(45, 93%, 47%)',   // Yellow
        'hsl(173, 80%, 40%)',  // Cyan
        'hsl(24, 95%, 53%)',   // Orange
        'hsl(280, 67%, 65%)'   // Lavender
      ]);

    // Draw circular grid
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i;
      g.append('circle')
        .attr('r', levelRadius)
        .attr('fill', 'none')
        .attr('stroke', 'hsl(var(--border))')
        .attr('stroke-opacity', 0.3)
        .attr('stroke-width', 1.5);

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
        .attr('stroke-opacity', 0.3)
        .attr('stroke-width', 1.5);

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
        .attr('fill', colorScale(d.skill))
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .text(d.skill);
    });

    // Draw data polygon with gradient
    const radarLine = d3
      .lineRadial<SkillData>()
      .radius((d) => rScale(d.level))
      .angle((d, i) => angleSlice * i)
      .curve(d3.curveLinearClosed);

    // Create gradient for the polygon fill
    const gradient = svg.append('defs')
      .append('radialGradient')
      .attr('id', 'radar-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'hsl(217, 91%, 60%)')
      .attr('stop-opacity', 0.6);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'hsl(142, 76%, 36%)')
      .attr('stop-opacity', 0.3);

    g.append('path')
      .datum(data)
      .attr('d', radarLine as any)
      .attr('fill', 'url(#radar-gradient)')
      .attr('stroke', 'hsl(217, 91%, 60%)')
      .attr('stroke-width', 3)
      .style('filter', 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))');

    // Add interactive data points with tooltips
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const coord = {
        x: rScale(d.level) * Math.cos(angle),
        y: rScale(d.level) * Math.sin(angle),
      };

      const point = g.append('circle')
        .attr('cx', coord.x)
        .attr('cy', coord.y)
        .attr('r', 6)
        .attr('fill', colorScale(d.skill))
        .attr('stroke', 'hsl(var(--background))')
        .attr('stroke-width', 3)
        .style('cursor', 'pointer')
        .style('filter', `drop-shadow(0 0 6px ${colorScale(d.skill)})`);

      // Add hover effects and tooltips
      point
        .on('mouseenter', function(event) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 9)
            .style('filter', `drop-shadow(0 0 12px ${colorScale(d.skill)})`);

          tooltip
            .style('opacity', '1')
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`)
            .html(`
              <div style="font-weight: 600; color: ${colorScale(d.skill)}; margin-bottom: 4px;">
                ${d.skill}
              </div>
              <div style="font-size: 14px;">
                Proficiency: <strong>${d.level}%</strong>
              </div>
            `);
        })
        .on('mousemove', function(event) {
          tooltip
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`);
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 6)
            .style('filter', `drop-shadow(0 0 6px ${colorScale(d.skill)})`);

          tooltip.style('opacity', '0');
        });
    });
  }, [data]);

  return (
    <div className="flex justify-center items-center w-full relative">
      <svg ref={svgRef} className="max-w-full h-auto"></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          opacity: 0,
          pointerEvents: 'none',
          background: 'hsl(var(--popover))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          transition: 'opacity 0.2s',
          color: 'hsl(var(--popover-foreground))',
          fontSize: '13px',
          minWidth: '150px'
        }}
      />
    </div>
  );
}
