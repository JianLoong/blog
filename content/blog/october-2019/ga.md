+++
title = "Genetic Algorithm"
weight = 15
date = 2019-10-19
pre = "<b>19th. </b>"
draft = false
tags = ["Genetic Algorithm", "Selection", "Cross Over", "Phrase Solver"]
+++

<link href="/blog/css/site.css" rel="stylesheet">

{{% notice note %}}

This post is a simple implementation of <strong>Genetic Algorithm GA.</strong> Here, you would start with a random string and end up with the target string.

{{% /notice %}}

This post is heavily inspired based on this [website](https://github.com/subprotocol/genetic-js). However, I created the codes with a very different methodology to also include newer JavaScript methods like using classes and etc.

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
    <input type="text" id="targetString" autocomplete="off" placeholder="" value="Any fool can write code that a computer can understand. Good programmers write code that humans can understand">
</div>

<button type="button" id="run" class="hvr-sweep-to-right">Run</button>

<p></p>

<br />

<div class="table-wrapper-scroll-y my-custom-scrollbar">
    <table style="font-family: monospace;" class="result-table table table-bordered table-striped mb-0">
        <tr><th>Generation</th><th>Fitness</th><th>String</th>
        <tbody class="result"></tbody>
    </table>
    </div>
</div>

#### Lessons from this post

- The web worker is often times cached for a longer period in production/live environments. Users would have a better experience if it is not required for them to do a hard refresh on the browsers. One easy way is to use the best practice to load the web worker in the head. Others suggested to versioning web-workers.

- The web worker at times, does not like while loops. It would be better if for loops are used instead. 

- The cross over methodology for GA needs to be implemented with complexity in mind.

- Using jQuery might not be the best idea as the **hide()** and **show()** which manipulates the display either changing to none or block does not work well on mobile browsers. Perhaps not using jQuery would be better.

- Designing an encoding is very important. For example, in a knapsack problem there are only two choices. So, each item can either be true or false.


#### References

1. [Python Easy GA](https://pypi.org/project/pyeasyga/)


<style>
.my-custom-scrollbar {
position: relative;
height: 200px;
overflow: auto;
}
.table-wrapper-scroll-y {
display: block;
}
</style>

<script>

const entry = document.querySelector("#targetString");
const result = document.querySelector(".result");
const cm = document.getElementById("crossOverMethod");
const sm = document.getElementById("selectionMethod");
const button = document.getElementById("run");

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
    $(".result-table").show();
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

  };
} else {
  console.log("Your browser doesn't support web workers.");
}

</script>
