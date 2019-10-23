+++
title = "TSP using GA"
weight = 23
date = 2019-10-23
pre = "<b>23th. </b>"
draft = true
tags = ["Genetic Algorithm", "Selection", "Cross Over", "Phrase Solver"]
+++


<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>

<div class="row">
 
  <div class="column">
    <div>
      <label for="crossOver">Cross Over Method</label> 
        <select id="crossOverMethod"  class="select-css">
        <option value="onePoint">One Point</option>
        <option value="ordered">Ordered</option>
        <option value="pmx">PMX</option>
        </select>
    </div>
    <div>
      <label for="selection">Selection Method</label> 
      <select id="selectionMethod"  class="select-css">
        <option value="tournament">Tournament</option>
        <option value="random">Random</option>
        <option value="rank">Rank</option>
        <option value="rouletteWheel">Roulette Wheel</option>
      </select>
    </div>
    <button type="button" id="run" class="hvr-sweep-to-right">Run</button>
  </div>  
  <div>
    <div class="column">
      <div class="ct-chart ct-perfect-fourth"></div>
    </div>
  </div>
 
</div>



<script>

new Chartist.Line(".ct-chart",[], {
showLine: true,
axisX: {
  type: Chartist.AutoScaleAxis,
  onlyInteger: true
}
});

const mapLocation = (x, y) => {
  return {
    x: x,
    y: y
  };
};

const locationA = mapLocation(40, -74);
const locationB = mapLocation(34, -118);
const locationC = mapLocation(41, -87);
const locationD = mapLocation(44, -93);
const locationE = mapLocation(39, -104);
const locationF = mapLocation(32, -96);
const locationG = mapLocation(47, -122);
const locationH = mapLocation(42, -71);
const locationI = mapLocation(37, -122);
const locationJ = mapLocation(38, -90);
const locationK = mapLocation(29, -95);
const locationL = mapLocation(33, -111);
const locationM = mapLocation(40, -111);

const buildSeries = result => {
  let arrayResult = [];
  let array = result.split("");

  arrayResult.push([locationA]);

  for (let index = 1; index < array.length; index++) {
    const element = array[index];
    let inner = [];
    inner.push(determineLocation(array[index]));
    inner.push(determineLocation(array[index - 1]));
    inner.sort((a, b) => a.x - b.x);
    arrayResult.push(inner);
  }

  let final = [];

  return arrayResult;
};

const determineLocation = character => {
  let location = undefined;

  switch (character) {
    case "A":
      return locationA;
    case "B":
      return locationB;
    case "C":
      return locationC;
    case "D":
      return locationD;
    case "E":
      return locationE;
    case "F":
      return locationF;
    case "G":
      return locationG;
    case "H":
      return locationH;
    case "I":
      return locationI;
    case "J":
      return locationJ;
    case "K":
      return locationK;
    case "L":
      return locationL;
    case "M":
      return locationM;
  }
};

const button = document.getElementById("run");
const cm = document.getElementById("crossOverMethod");
const sm = document.getElementById("selectionMethod");

if (window.Worker) {
  const tspWorker = new Worker("/blog/scripts/tsp-worker.js");
  

  tspWorker.onmessage = function(e) {

  
    
    let result = "A" + e.data + "A";
    console.log(result);
     

    const seriesBuilder = {
      labels: [],
      series: buildSeries(result)
    };

    console.log(seriesBuilder);
    new Chartist.Line(".ct-chart",seriesBuilder, {
    showLine: true,
    axisX: {
      type: Chartist.AutoScaleAxis,
      onlyInteger: true
    }
   });

  };

  button.onclick = function() {

    let crossOverMethod = cm.options[cm.selectedIndex].value;
    let selectionMethod = sm.options[sm.selectedIndex].value;
    tspWorker.postMessage([crossOverMethod, selectionMethod]);
    //tspWorker.postMessage();

  };


  
}



</script>



<style>


@media only screen and (min-width: 1000px)  {
  .row {
    display: flex !important;
  }
  .column {
    flex: 50% !important;
  }

  .ct-chart {
    width: 40em;
  }

}
</style>