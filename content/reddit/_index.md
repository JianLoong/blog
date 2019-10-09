+++
title = "Reddit Chart"
weight = 5
date = "{{ .Date }}"
pre = "<b></b>"
tags = ["Java", "Effective Java"]
+++

<script src="https://unpkg.com/frappe-charts@1.1.0/dist/frappe-charts.min.iife.js"></script>

{{% notice warning %}}

Under construction.

{{% /notice %}}

The charts here are visualisation of the *AmItheasshole* subreddit which can be found [here](https://www.reddit.com/r/AmItheAsshole/)

<div class="result">
</div>

<div class="chart">
</div>

<script>

let summary = [];

function parseResult(link){
    console.log(link);
    let endPoint = "https://reddit.com" + link + ".json?limit=50&jsonp=?";
    let replies = "";

    $.getJSON(endPoint, function(data){
        //console.log(data);
        let title = (data[0].data.children[0].data["title"]);

        replies = data[1]["data"].children;
        //console.log(replies);
        let noOfReplies = replies.length;
        let countNTAAppearance = 0;
        let nta = "NTA";
        let countYTAAppearance = 0;
        let countESHAppearance = 0;
        for (let i = 0; i < noOfReplies; i++) {
            //console.log(replies[i]["data"].body);
            let reply = replies[i]["data"].body;
            if (reply == undefined)
                return;
            countNTAAppearance += (reply.match(/NTA/g) || []).length;
            countYTAAppearance += (reply.match(/YTA/g) || []).length;
            countESHAppearance += (reply.match(/ESH/g) || []).length;
        }

        let jsonResult = {
            "id" : data[0].data.children[0].data["id"],
            "title": title,
            "countNTAAppearance": countNTAAppearance,
            "countYTAAppearance": countYTAAppearance,
            "countESHAppearance" : countESHAppearance
        }

       //console.log(jsonResult);
       summary.push(jsonResult);

       //console.log(data[0].data.children[0].data["id"]);

       showResult(jsonResult);
    });
}

function showResult(jsonResult) {
    let output = "<strong>" + jsonResult["title"] + "</strong>";
    $(".result").append(output);
    $(".result").append("<div id=" + jsonResult["id"] + "></div>");

    let id = "#" + jsonResult["id"];
    const data = {
                labels: ["NTA","YTA","ESH"],
                datasets: [
                    {
                        name: "data",
                        charType: 'bar',
                        values: [jsonResult["countNTAAppearance"], jsonResult["countYTAAppearance"], jsonResult["countESHAppearance"]]
                    }
                ]
            }

    const chart = new frappe.Chart(id, {
        title: jsonResult[""],
        data: data,
        type: 'percentage',
        colors: ['blue', 'red', 'yellow']
    })
}

function getPost(){
    let result = "";
    let entries = [];
    let endPoint = "https://reddit.com/r/amitheasshole.json?limit=50&jsonp=?"
    $.getJSON(endPoint, function(data){
        //console.log(data);
        result = data;
        entries = result["data"].children;
        //console.log(entries[0]["data"]["permalink"]);
        for(let i = 0; i < entries.length; i++){
            let link = (entries[i]["data"]["permalink"]);
            console.log(link);
            let text = "<p>" + entries[i]["data"]["title"] + "</p>";
            parseResult(link)
        }
    });

}

getPost();
    
</script>
