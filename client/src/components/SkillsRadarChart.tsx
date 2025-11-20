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

    const width = 550;
    const height = 600;
    const margin = 100;
    const radius = Math.min(width, height - 100) / 2 - margin;

    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', '700')
      .style('fill', 'hsl(var(--foreground))')
      .text('Technical Proficiency Overview');

    // Add subtitle
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('fill', 'hsl(var(--muted-foreground))')
      .text('Comprehensive skill assessment across key domains');

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${(height + 60) / 2})`);

    const angleSlice = (Math.PI * 2) / data.length;

    // Create radial scale
    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    // Enhanced color scale
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.skill))
      .range([
        'hsl(217, 91%, 60%)',  // Blue
        'hsl(142, 76%, 36%)',  // Green
        'hsl(262, 83%, 58%)',  // Purple
        'hsl(346, 77%, 50%)',  // Red
        'hsl(45, 93%, 47%)',   // Yellow
        'hsl(173, 80%, 40%)',  // Cyan
        'hsl(24, 95%, 53%)',   // Orange
        'hsl(280, 67%, 65%)',  // Lavender
        'hsl(160, 60%, 45%)'   // Teal
      ]);

    // Draw circular grid with enhanced styling
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i;
      
      // Grid circles
      g.append('circle')
        .attr('r', levelRadius)
        .attr('fill', 'none')
        .attr('stroke', 'hsl(var(--border))')
        .attr('stroke-opacity', i === levels ? 0.5 : 0.2)
        .attr('stroke-width', i === levels ? 2 : 1.5);

      // Level labels
      const levelValue = (100 / levels) * i;
      g.append('text')
        .attr('x', 8)
        .attr('y', -levelRadius + 4)
        .attr('fill', 'hsl(var(--muted-foreground))')
        .attr('font-size', '11px')
        .attr('font-weight', i === levels ? '600' : '400')
        .text(`${levelValue}%`);
    }

    // Draw axes with enhanced styling
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const lineCoord = {
        x: rScale(100) * Math.cos(angle),
        y: rScale(100) * Math.sin(angle),
      };

      // Axis lines
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', lineCoord.x)
        .attr('y2', lineCoord.y)
        .attr('stroke', 'hsl(var(--border))')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', 0.4);
    });

    // Create gradient for the radar area
    const radarGradient = svg.append('defs')
      .append('radialGradient')
      .attr('id', 'radar-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    radarGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'hsl(217, 91%, 60%)')
      .attr('stop-opacity', 0.6);

    radarGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'hsl(173, 80%, 40%)')
      .attr('stop-opacity', 0.3);

    // Draw the radar area
    const radarLine = d3.lineRadial<SkillData>()
      .angle((d, i) => angleSlice * i)
      .radius(d => rScale(d.level))
      .curve(d3.curveLinearClosed);

    g.append('path')
      .datum(data)
      .attr('d', radarLine)
      .attr('fill', 'url(#radar-gradient)')
      .attr('stroke', 'hsl(217, 91%, 60%)')
      .attr('stroke-width', 3)
      .style('filter', 'drop-shadow(0 0 12px hsla(217, 91%, 60%, 0.6))')
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    // Draw data points with enhanced interactivity
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const pointCoord = {
        x: rScale(d.level) * Math.cos(angle),
        y: rScale(d.level) * Math.sin(angle),
      };

      // Outer glow
      g.append('circle')
        .attr('cx', pointCoord.x)
        .attr('cy', pointCoord.y)
        .attr('r', 10)
        .attr('fill', colorScale(d.skill))
        .attr('opacity', 0.3)
        .style('filter', 'blur(6px)');

      // Main data point
      g.append('circle')
        .attr('cx', pointCoord.x)
        .attr('cy', pointCoord.y)
        .attr('r', 6)
        .attr('fill', colorScale(d.skill))
        .attr('stroke', 'hsl(var(--background))')
        .attr('stroke-width', 2.5)
        .style('cursor', 'pointer')
        .style('filter', `drop-shadow(0 0 6px ${colorScale(d.skill)})`)
        .on('mouseenter', function(event) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 9)
            .style('filter', `drop-shadow(0 0 12px ${colorScale(d.skill)})`);

          tooltip
            .style('opacity', '1')
            .style('left', `${event.pageX + 15}px`)
            .style('top', `${event.pageY - 15}px`)
            .html(`
              <div style="font-weight: 700; color: ${colorScale(d.skill)}; margin-bottom: 8px; font-size: 15px;">
                ${d.skill}
              </div>
              <div style="margin-bottom: 6px; font-size: 14px;">
                <strong>Proficiency:</strong> ${d.level}%
              </div>
              <div style="font-size: 12px; color: hsl(var(--muted-foreground)); margin-top: 8px; padding-top: 8px; border-top: 1px solid hsl(var(--border));">
                ${d.level >= 85 ? 'Expert level proficiency' : 
                  d.level >= 75 ? 'Advanced proficiency' : 
                  'Intermediate to advanced proficiency'}
              </div>
            `);
        })
        .on('mousemove', function(event) {
          tooltip
            .style('left', `${event.pageX + 15}px`)
            .style('top', `${event.pageY - 15}px`);
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 6)
            .style('filter', `drop-shadow(0 0 6px ${colorScale(d.skill)})`);

          tooltip.style('opacity', '0');
        })
        .attr('opacity', 0)
        .transition()
        .duration(800)
        .delay(i * 100)
        .attr('opacity', 1);
    });

    // Draw skill labels with enhanced positioning
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const labelDistance = radius + 35;
      const labelCoord = {
        x: labelDistance * Math.cos(angle),
        y: labelDistance * Math.sin(angle),
      };

      // Label background for better readability
      const labelText = g.append('text')
        .attr('x', labelCoord.x)
        .attr('y', labelCoord.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', colorScale(d.skill))
        .attr('font-size', '12px')
        .attr('font-weight', '700')
        .style('pointer-events', 'none')
        .text(d.skill);

      // Add background rect for better contrast
      const bbox = (labelText.node() as SVGTextElement).getBBox();
      g.insert('rect', 'text')
        .attr('x', bbox.x - 4)
        .attr('y', bbox.y - 2)
        .attr('width', bbox.width + 8)
        .attr('height', bbox.height + 4)
        .attr('fill', 'hsl(var(--background))')
        .attr('opacity', 0.85)
        .attr('rx', 4)
        .style('pointer-events', 'none');

      // Re-append text to be on top
      labelText.raise();
    });

  }, [data]);

  return (
    <div className="flex justify-center items-center w-full overflow-x-auto relative">
      <svg ref={svgRef} className="max-w-full h-auto"></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          opacity: 0,
          pointerEvents: 'none',
          background: 'hsl(var(--popover))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '10px',
          padding: '14px 16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
          transition: 'opacity 0.2s',
          color: 'hsl(var(--popover-foreground))',
          fontSize: '13px',
          minWidth: '220px',
          backdropFilter: 'blur(8px)'
        }}
      />
    </div>
  );
}
