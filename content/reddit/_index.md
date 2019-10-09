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

The charts here are visualisation of the _AmItheasshole_ subreddit which can be found [here](https://www.reddit.com/r/AmItheAsshole/)

<div class="result">
</div>

<div class="chart">
</div>

<script>

let summary = [];

function parseResult(link){
    let endPoint = "https://reddit.com" + link + ".json?limit=50&jsonp=?";
    let replies = "";

    $.getJSON(endPoint, function(data){
        let title = (data[0].data.children[0].data["title"]);
        replies = data[1]["data"].children;
        let url = "https://reddit.com" + link;
        let noOfReplies = replies.length;
        let countNTAAppearance = 0;
        let nta = "NTA";
        let countYTAAppearance = 0;
        let countESHAppearance = 0;
        let countNAHAppearance = 0;
        let countINFOAppearance = 0;
        for (let i = 0; i < noOfReplies; i++) {
            let reply = replies[i]["data"].body;
            if (reply == undefined)
                return;
            countNTAAppearance += (reply.match(/NTA/g) || []).length;
            countYTAAppearance += (reply.match(/YTA/g) || []).length;
            countESHAppearance += (reply.match(/ESH/g) || []).length;
            countNAHAppearance += (reply.match(/NAH/g) || []).length;
            countINFOAppearance += (reply.match(/INFO/g) || []).length;
        }

        let jsonResult = {
            "id" : data[0].data.children[0].data["id"],
            "url": url,
            "title": title,
            "countNTAAppearance": countNTAAppearance,
            "countYTAAppearance": countYTAAppearance,
            "countESHAppearance" : countESHAppearance,
            "countNAHAppearance" : countNAHAppearance,
            "countINFOAppearance" : countINFOAppearance,
        }
       summary.push(jsonResult);
       showResult(jsonResult);
    });
}

function showResult(jsonResult) {
    let output = "<strong>" + jsonResult["title"] + "</strong>";
    $(".result").append(output);
    
    $(".result").attr("href", jsonResult["url"]);
    // $(".result").attr("href", jsonResult["url"] + "> Here</a>");
    $(".result").append("<div id=" + jsonResult["id"] + "></div>");
    

    let id = "#" + jsonResult["id"];
    const data = {
                labels: ["NTA","YTA","ESH","NAH","INFO"],
                datasets: [
                    {
                        name: "data",
                        charType: 'bar',
                        values: [
                            jsonResult["countNTAAppearance"], 
                            jsonResult["countYTAAppearance"], 
                            jsonResult["countESHAppearance"],
                            jsonResult["countNAHAppearance"],
                            jsonResult["countINFOAppearance"],
                        ]
                    }
                ]
            }

    const chart = new frappe.Chart(id, {
        data: data,
        type: 'percentage',
        colors: ['blue', 'red', 'yellow','green','black']
    })
}

function getPost(){
    let result = "";
    let entries = [];
    let endPoint = "https://reddit.com/r/amitheasshole.json?limit=50&jsonp=?"
    $.getJSON(endPoint, function(data){
        result = data;
        entries = result["data"].children;
        for(let i = 0; i < entries.length; i++){
            let link = (entries[i]["data"]["permalink"]);
            let text = "<p>" + entries[i]["data"]["title"] + "</p>";
            parseResult(link)
        }
    });
}

getPost();
    
</script>
