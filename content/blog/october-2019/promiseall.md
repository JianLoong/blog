+++
title = "Promise All"
weight = 25
date = 2019-10-25
pre = "<b>25th. </b>"
draft = false
tags = ["JavaScript", "Promise", "API"]
+++

{{% notice note %}}

This post is a an entry to describe a use case when the Promise.all JavaScript method is needed. The official reference can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all). This assumes that the reader has a basic understanding of how promises work.


{{% /notice %}}

Before we start, there is a need to understand how certain RESTful services are structured. For example, the Hacker News API has the end point called **topstories**. This end point however, does not contain any other information besides a list of item IDs. So, if you would like to obtain the top 10 post including their **title**, there would be a need to do several GET request to fetch them all.

The code example below would demonstrate a situation where the **Promise.all** becomes useful.

```js
const getTopStoriesId = () => {
  let endPoint = "https://hacker-news.firebaseio.com/v0/topstories.json";
  return fetch(endPoint, {
    mode: "cors"
  }).then((response) => response.json());
};

const getItem = (itemNumber) => {
  let endPoint = "//hacker-news.firebaseio.com/v0/item/" + itemNumber + ".json";
  return fetch(endPoint, {
    mode: "cors"
  }).then((response) => response.json());
}

const topStories = () => getTopStoriesId().then((result) => {
    let promiseArray = [];
    result.forEach((element) => {
      promiseArray.push(getItem(element));
    })

    return Promise.all(promiseArray);
});
```


### References

1. https://stackoverflow.com/questions/38180080/when-to-use-promise-all


<script>

// const getTopStoriesId = () => {
//   let endPoint = "https://hacker-news.firebaseio.com/v0/topstories.json";
//   return fetch(endPoint, {
//     mode: "cors"
//   }).then((response) => response.json());
// };

// const getItem = (itemNumber) => {
//   let endPoint = "//hacker-news.firebaseio.com/v0/item/" + itemNumber + ".json";
//   return fetch(endPoint, {
//     mode: "cors"
//   }).then((response) => response.json());
// }

// const topStories = () => getTopStoriesId().then((result) => {
//     let promiseArray = [];
//     result.forEach((element) => {
//       promiseArray.push(getItem(element));
//     })

//     return Promise.all(promiseArray);
// });

// const result = topStories().then((result)=> {
//   let resultArray = result;
//   let titleString = "";
//   result.forEach((element)=> {
//     titleString += element["title"];
//   });
//   return titleString;
// });

</script>