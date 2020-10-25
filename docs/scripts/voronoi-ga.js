const createVoronoi = () => {
  const width = 600;
  const height = 600;

  const radius = 10;
  const circles = d3.range(30).map(i => ({
    x: Math.random() * (width - radius * 2) + radius,
    y: Math.random() * (height - radius * 2) + radius
  }));

  const delaunay = d3.Delaunay.from(circles, d => d.x, d => d.y);
  const voronoi = delaunay.voronoi([0, 0, width, height]);

  
};
