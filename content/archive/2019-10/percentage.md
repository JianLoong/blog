+++
title = "Reddit Chart"
weight = 9
date = 2019-10-09T20:56:02+11:00
pre = "<b>&nbsp;9th. </b>"
tags = ["Reddit", "Chart", "Visualisation"]
+++

<script src="https://unpkg.com/frappe-charts@1.1.0/dist/frappe-charts.min.iife.js"></script>

The charts here are visualisation of the _AmIthea-hole_ subreddit which can be found [here](https://www.reddit.com/r/AmItheAsshole/)

The reason this post is made, is so that it would easier to see the percentage of votes of a certain type.

{{% notice info %}}

Please note that the posts here are generated based on the Reddit website by doing `GET` requests. So, it is based on their current entries.

{{% /notice %}}

| Abbreviation | Meaning             |
| ------------ | ------------------- |
| YTA          | You're the A-hole   |
| NTA          | Not the A-hole      |
| ESH          | Everyone sucks here |
| NAH          | No A-holes here     |
| INFO         | Not Enough Info     |

### Posts

<div class="result">
</div>



<script>

let summary = [];

let parseResult = (link) => {
    const endPoint = "https://reddit.com" + link + ".json?limit=80&jsonp=?";
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

let showResult = (jsonResult) => {
    let output = "<strong>" + jsonResult["title"] + "</strong>";    
    let out = output + "<p><a id=" + jsonResult["id"] + "_link> Click here</a> to view post in context.</p>";

    $(".result").append("<div class = 'shadow'>" + out +"<div class='' id=" + jsonResult["id"] + "></div></div>");
    $("#" + jsonResult["id"] + "_link").prop("href", jsonResult["url"]);
    $(".result").append("<p></p>");

    let id = "#" + jsonResult["id"];
    const data = {
                labels: ["NTA","YTA","ESH","NAH","INFO"],
                datasets: [
                    {
                        name: "data",
                        charType: 'percentage',
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
        colors: ['#33691e', '#b71c1c', '#f47e17','#1a237e','#e8eaf6']
    })
}

let getPost = () => {
    let result = "";
    let entries = [];
    let endPoint = "https://reddit.com/r/amitheasshole.json?limit=50&jsonp=?"
    $.getJSON(endPoint, function(data){
        result = data;
        entries = result["data"].children;
        for(let i = 0; i < entries.length; i++){
            let link = (entries[i]["data"]["permalink"]);
            parseResult(link)
        }
    });
}

getPost();
    
</script>

<style>
.shadow {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding-right: 1em;
    padding-left: 1em;
    padding-top: 1em;
}
</style>

