+++
title= "Voronoi Diagram"
date= 2019-10-13T21:27:45+11:00
draft= false
pre= "<b>29th. </b>"
weigh= 29
tags= ["Nearest Neighbour", "Maps", "Voronoi"]
+++

<script src="https://unpkg.com/d3@5.12.0/dist/d3.min.js"></script>
<script src="/blog/scripts/d3-delaunay.min.js"></script>


{{% notice note %}}

One of the most common query when working with maps is the nearest neighbour query. This blog post will use Voronoi Diagrams to explain more regarding the nearest neighbour query.

{{% /notice %}}


Below is an example of a Voronoi diagram generated using d3.js.

<div id="canvas" style="text-align:center"></div>

<p align="center"><strong>Voronoi Diagram generated with 30 random points</strong></p>

<!-- <embed src="https://www.desmos.com/calculator/q0nyt99bcr?embed" width="100%" height="500px" style="border: 1px solid #ccc" frameborder=0></embed> -->

```javascript

const width = 500, height = 500;
const vertices = d3.range(10).map(function(d) {
    return [Math.random() * width, Math.random() * height];
});

const delaunay = d3.Delaunay.from(vertices);
const voronoi = delaunay.voronoi([0, 0, 500, 500]);
let svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);

const mesh = svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1)
    .attr("d", voronoi.render());

const bounds = svg.append("path")
    .attr("fill", "none")
    .attr("stroke","#ccc")
    .attr("stroke-width", 1)
    .attr("d", voronoi.renderBounds());

const points = svg.append("path")
    .attr("fill", "black")
    .attr("stroke","#ccc")
    .attr("stroke-width", 1)
    .attr("d", delaunay.renderPoints());

```

#### Lessons from this blog post.

- The learning curve for d3.js is **pretty insane.** 
- Voronois are pretty easy using d3.


<!-- https://bl.ocks.org/aaizemberg/raw/8063f8c2d1adb7c7ee68/ -->
<!-- https://observablehq.com/@d3/circle-dragging-iii?collection=@d3/d3-delaunay -->
<script>

    const width = 500, height = 500;
    const vertices = d3.range(30).map(function(d) {
        return [Math.random() * width, Math.random() * height];
    });

    const delaunay = d3.Delaunay.from(vertices);
    const voronoi = delaunay.voronoi([0, 0, 500, 500]);
    let svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);
    
    const mesh = svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1)
        .attr("d", voronoi.render());

    const bounds = svg.append("path")
        .attr("fill", "none")
        .attr("stroke","#ccc")
        .attr("stroke-width", 1)
        .attr("d", voronoi.renderBounds());

    // for (let index = 0; index < 10; index++) {
    //     svg.append("path")
    //     .attr("fill", d3.schemeTableau10[index % 10])
    //     .attr("stroke","#ccc")
    //     .attr("stroke-width", 1)
    //     .attr("d", voronoi.renderCell(index));
    // }; 

    const points = svg.append("path")
        .attr("fill", "black")
        .attr("stroke","#ccc")
        .attr("stroke-width", 1)
        .attr("d", delaunay.renderPoints());

</script>
