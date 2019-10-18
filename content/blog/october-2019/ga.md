+++
title = "Genetic Algorithm"
weight = 15
date = 2019-10-15
pre = "<b>15th. </b>"
draft = true
tags = ["Genetic Algorithm", "Chart", "Knapsack Problem"]
+++


<div>
    <label for="number1">Multiply number 1: </label>    
    <input type="text" id="number1" value="0">
</div>
<div>
    <label for="number2">Multiply number 2: </label>   
    <input type="text" id="number2" value="0">
</div>

<div>
    <label for="targetString">Target String </label>    
    <input type="text" id="targetString">
</div>

<p class="result">Result: 0</p>


<script>

const first = document.querySelector("#number1");
const second = document.querySelector("#number2");
const third = document.querySelector("#targetString");


const result = document.querySelector(".result");

if (window.Worker) {
  const myWorker = new Worker("/blog/scripts/ga-worker.js");

  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log("Message posted to worker");
  };

  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log("Message posted to worker");
  };

  third.onchange = function() {
    myWorker.postMessage(third.value);
    console.log("Message posted to worker");
  };

  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log("Message received from worker");
  };
} else {
  console.log("Your browser doesn't support web workers.");
}

</script>
