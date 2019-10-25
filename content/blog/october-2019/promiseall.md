+++
title = "Promise All"
weight = 25
date = 2019-10-25
pre = "<b>25th. </b>"
draft = true
tags = ["JavaScript", "Promise", "API"]
+++

{{% notice note %}}

This post is a an entry to describe a use case when the Promise.all JavaScript method is needed. The official reference can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all). 
This assumes that the reader has a basic understanding of how promises work.


{{% /notice %}}

There are a lot of times, when you need the information obtain from one promise to be used in another. 


### References

1. https://stackoverflow.com/questions/38180080/when-to-use-promise-all


<script>

function getPage(pageNumber){
  let endPoint = "https://api.hnpwa.com/v0/news/" + pageNumber + ".json";
  return fetch(endPoint, {
    mode: "cors"
  }).then((response) => response.json())
};


</script>