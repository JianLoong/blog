+++
title = "Programming Mentions "
weight = 5
date = "{{ .Date }}"
pre = "<b></b>"
tags = ["Reddit", "Chart", "Visualisation"]
+++
Posted on - Fri 11 Oct 00:02:42 AEDT 2019
<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="https://rawgit.com/jasondavies/d3-cloud/master/build/d3.layout.cloud.js"></script>
<div id="cloud"></div>

<script>

let words = "";
let freq = "";
let arr = "";

var stopWords = [
  'about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be',
  'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can',
  'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had',
  'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into',
  'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must',
  'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over',
  'said', 'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than',
  'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were',
  'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your', 'a', 'i', 'its'
];

// https://stackoverflow.com/questions/5631422/stop-word-removal-in-javascript

function remove_stopwords(str) {
    res = []
    words = str.split(' ')
    for(i=0;i<words.length;i++) {
        if(!stopWords.includes(words[i])) {
            res.push(words[i])
        }
    }
    return(res.join(' '))
  }

//Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
//Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

// Encapsulate the word cloud functionality
function wordCloud(selector) {

    var fill = d3.scale.category20();

    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        
        .attr("viewBox", `0 0 800 800`)
        .append("g")
        .attr("transform", "translate(400,400)");


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            d3.layout.cloud().size([800, 800])
                .words(words)
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}


//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
    arr = words.split(" ");
    let freq = foo(arr);
        
    return buildResult(arr);
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    i = i || 0;

    vis.update(getWords(i ++ % words.length))

}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('#cloud');

//Start cycling through the demo data
//showNewWords(myWordCloud);

function foo(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a,b];
}

function buildResult(arr){
    let resultArr = [];
    let sum = 0;    
    let total = freq[0].length;

    for(let i = 0; i < total; i++)
        resultArr.push({
            text: freq[0][i],
            size: freq[1][i] 
        });


    let sorted = resultArr.sort( (a,b) => b.size - a.size);

   
    sorted = sorted.slice(0, 50);

    for(let i = 0; i < sorted.length; i++)
        sum += sorted[i].size;

    resultArr = [];

    for(let i = 0; i < sorted.length; i++)
        resultArr.push({
            text: sorted[i]["text"],
            size: (sorted[i]["size"] / sum) * 60 + 50
        });
       
    return resultArr;
}


let getPost = () => {
    let result = "";
    //let words = "";
    //let arr = [];
    let endPoint = "https://reddit.com/r/programming.json?limit=500&jsonp=?"
    $.getJSON(endPoint, function(data){
        result = data;
        let entries = result["data"].children;
        for(let i = 0; i < entries.length; i++){
            let link = (entries[i]["data"]["title"]);
            words += " " + (entries[i]["data"]["title"]);   
        }

        words = words.replace(/[^\w\s]/gi, '');
        words = words.replace(/\d/g, '');
        words = remove_stopwords(words.toLowerCase());

        arr = words.split(" ");
        freq = foo(arr);
      
        showNewWords(myWordCloud);
    });


}

getPost();

</script>
