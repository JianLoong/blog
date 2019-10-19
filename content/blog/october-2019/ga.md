+++
title = "Genetic Algorithm"
weight = 15
date = 2019-10-19
pre = "<b>19th. </b>"
draft = false
tags = ["Genetic Algorithm", "Selection", "Cross Over", "Phrase Solver"]
+++

<link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">

{{% notice info %}}

This blog post is under construction. More features and explanation will be added soon.

{{% /notice %}}

<div>
<label for="crossOver">Cross Over Method</label> 
<select id="crossOverMethod"  class="select-css">
  <option value="onePoint">One Point</option>
  <option value="twoPoint">Two Point</option>
  <option value="uniform">Uniform</option>
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


<div>
    <label for="targetString">Target String </label>    
    <input type="text" id="targetString" autocomplete="off" placeholder="Enter something here">
</div>

<button type="button" id="run" class="hvr-sweep-to-right">Run</button>

<div class="progress-line"></div>

<br />

<table style="font-family: monospace;" class="result-table">
    <tr><th>Generation</th><th>Fitness</th><th>String</th>
    <tbody class="result"></tbody>
</table>


<style>

.hvr-sweep-to-right {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.hvr-sweep-to-right:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #2098D1;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-sweep-to-right:hover, .hvr-sweep-to-right:focus, .hvr-sweep-to-right:active {
  color: white;
}
.hvr-sweep-to-right:hover:before, .hvr-sweep-to-right:focus:before, .hvr-sweep-to-right:active:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}


.progress-line, .progress-line:before {
  height: 3px;
  width: 100%;
  margin: 0;
}
.progress-line {
  background-color: #b3d4fc;
  display: -webkit-flex;
  display: flex;
}
.progress-line:before {
  background-color: #3f51b5;
  content: '';
  -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@-webkit-keyframes running-progress {
  0% { margin-left: 0px; margin-right: 100%; }
  50% { margin-left: 25%; margin-right: 0%; }
  100% { margin-left: 100%; margin-right: 0; }
}
@keyframes running-progress {
  0% { margin-left: 0px; margin-right: 100%; }
  50% { margin-left: 25%; margin-right: 0%; }
  100% { margin-left: 100%; margin-right: 0; }
}
</style>

<script>

const entry = document.querySelector("#targetString");
const result = document.querySelector(".result");
const cm = document.getElementById("crossOverMethod");
const sm = document.getElementById("selectionMethod");
const button = document.getElementById("run");

$(".progress-line").hide();
$(".result-table").hide();


if (window.Worker) {
  const myWorker = new Worker("/blog/scripts/ga-worker.js");
  let isResultTableShown = false;

  cm.onchange = function() {
    result.innerHTML = "";
    if (entry.value.length >= 100 || entry.value.length == 0)
        return;   
  };

  button.onclick = function() {
    if (entry.value == "")
        return;

    $(".progress-line").show();
    result.innerHTML = "";
    let crossOverMethod = cm.options[cm.selectedIndex].value;
    let selectionMethod = sm.options[sm.selectedIndex].value;
    myWorker.postMessage([crossOverMethod, selectionMethod, entry.value]);
  }

  entry.onchange = function() {

    result.innerHTML = "";
    if (entry.value.length >= 100 || entry.value.length == 0)
        return;
  };

  myWorker.onmessage = function(e) {
      
    let text = result.innerHTML;
    result.innerHTML = "<tr><td>" + e.data[0] + "</td><td>" + e.data[1] + "</td><td>" + e.data[2]+"</td</tr>" + text;

    if (isResultTableShown == false){
            isResultTableShown = true;
             $(".result-table").show();
    }

    if(e.data[3] == true){
        $(".progress-line").hide();
    }

  };
} else {
  console.log("Your browser doesn't support web workers.");
}

</script>
