import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CertData {
  year: number;
  count: number;
}

interface CertificationsTimelineProps {
  data: CertData[];
}

export default function CertificationsTimeline({ data }: CertificationsTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year) as [number, number])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) as number])
      .nice()
      .range([height, 0]);

    // Create line generator
    const line = d3
      .line<CertData>()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.count))
      .curve(d3.curveMonotoneX);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('font-weight', '500');

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('font-weight', '500');

    // Add Y axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .text('Certifications Earned');

    // Create gradient for the area
    const areaGradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    areaGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'hsl(142, 76%, 36%)')
      .attr('stop-opacity', 0.6);

    areaGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'hsl(142, 76%, 36%)')
      .attr('stop-opacity', 0.1);

    // Add area under the line
    const area = d3
      .area<CertData>()
      .x((d) => xScale(d.year))
      .y0(height)
      .y1((d) => yScale(d.count))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#area-gradient)')
      .attr('d', area);

    // Create gradient for the line
    const lineGradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    lineGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'hsl(217, 91%, 60%)');

    lineGradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', 'hsl(262, 83%, 58%)');

    lineGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'hsl(142, 76%, 36%)');

    // Add the line path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 4)
      .attr('d', line)
      .style('filter', 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))');

    // Color scale for points
    const colorScale = d3.scaleOrdinal<number, string>()
      .domain(data.map(d => d.year))
      .range([
        'hsl(217, 91%, 60%)',
        'hsl(262, 83%, 58%)',
        'hsl(142, 76%, 36%)'
      ]);

    // Add interactive data points with tooltips
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.year))
      .attr('cy', (d) => yScale(d.count))
      .attr('r', 7)
      .attr('fill', (d) => colorScale(d.year))
      .attr('stroke', 'hsl(var(--background))')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .style('filter', (d) => `drop-shadow(0 0 6px ${colorScale(d.year)})`)
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 10)
          .style('filter', `drop-shadow(0 0 12px ${colorScale(d.year)})`);

        tooltip
          .style('opacity', '1')
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`)
          .html(`
            <div style="font-weight: 600; color: ${colorScale(d.year)}; margin-bottom: 4px;">
              Year ${d.year}
            </div>
            <div style="font-size: 14px;">
              Certifications: <strong>${d.count}</strong>
            </div>
            <div style="font-size: 12px; color: hsl(var(--muted-foreground)); margin-top: 4px;">
              ${d.year === 2023 ? 'Started certification journey' : 
                d.year === 2024 ? '+30 certifications' : 
                '+25 certifications'}
            </div>
          `);
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 7)
          .style('filter', `drop-shadow(0 0 6px ${colorScale(d.year)})`);

        tooltip.style('opacity', '0');
      });

    // Add value labels on points
    g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d.count) - 15)
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => colorScale(d.year))
      .attr('font-size', '14px')
      .attr('font-weight', '700')
      .text((d) => d.count)
      .style('pointer-events', 'none');
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
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          transition: 'opacity 0.2s',
          color: 'hsl(var(--popover-foreground))',
          fontSize: '13px',
          minWidth: '180px'
        }}
      />
    </div>
  );
}
