+++
title = "Genetic Algorithm"
weight = 15
date = 2019-10-19
pre = "<b>19th. </b>"
draft = false
tags = ["Genetic Algorithm", "Chart", "Knapsack Problem"]
+++

{{% notice info %}}

This blog post is under construction. More features and explanation will be added soon.

{{% /notice %}}

<div>
<label for="crossOver">Cross Over Method</label> 
<select id="crossOverMethod">
  <option value="onePoint">One Point</option>
  <option value="twoPoint">Two Point</option>
  <option value="uniform">Uniform</option>
</select>
</div>

<div>
<label for="selection">Selection Method</label> 
<select id="selectionMethod">
  <option value="tournament">Tournament</option>
  <option value="random">Random</option>
</select>
</div>


<div>
    <label for="targetString">Target String </label>    
    <input type="text" id="targetString" autocomplete="off">
</div>

<button type="button" id="run" class="hvr-sweep-to-right">Run</button>


<p class="result"></p>


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
</style>

<script>

const entry = document.querySelector("#targetString");
const result = document.querySelector(".result");
const cm = document.getElementById("crossOverMethod");
const sm = document.getElementById("selectionMethod");
const button = document.getElementById("run");

if (window.Worker) {
  const myWorker = new Worker("/blog/scripts/ga-worker.js");

  cm.onchange = function() {
    result.innerHTML = "";
    if (entry.value.length >= 100 || entry.value.length == 0)
        return;   
  };

  button.onclick = function() {
    
    
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
    //console.log(e);

    result.innerHTML = "<p>" + "Generation " + e.data[0] + " Current - " + e.data[1] + "</p>" + text;
    //console.log("Message received from worker");
  };
} else {
  console.log("Your browser doesn't support web workers.");
}

</script>
