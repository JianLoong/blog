+++
title = "Genetic Algorithm"
weight = 15
date = 2019-10-19
pre = "<b>19th. </b>"
draft = false
tags = ["Genetic Algorithm", "Chart", "Knapsack Problem"]
+++

{{% notice warning %}}

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
    <label for="targetString">Target String </label>    
    <input type="text" id="targetString" autocomplete="off">
</div>


<p class="result"></p>

<script>

const entry = document.querySelector("#targetString");
const result = document.querySelector(".result");
const e = document.getElementById("crossOverMethod");

if (window.Worker) {
  const myWorker = new Worker("/blog/scripts/ga-worker.js");

  e.onchange = function() {
    result.innerHTML = "";
    let crossOverMethod = e.options[e.selectedIndex].value;

    if (entry.value.length >= 50 || entry.value.length == 0)
        return;

    myWorker.postMessage([crossOverMethod, entry.value]);
   
  };

  entry.onchange = function() {

    result.innerHTML = "";

    let crossOverMethod = e.options[e.selectedIndex].value;

    if (entry.value.length >= 50 || entry.value.length == 0)
        return;

    myWorker.postMessage([crossOverMethod, entry.value]);
   
    console.log("Message posted to worker");
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
