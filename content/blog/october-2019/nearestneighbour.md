---
title: "k-Nearest Neighbour on Maps"
date: 2019-10-27
draft: false
pre: "<b>27th. </b>"
weight: 27
---

{{% notice note %}}

One of the most common query when working with maps is the nearest neighbour query. This post will explain how to accomplish an easy nearest neighbour query.

{{% /notice %}}

We will first start with a data set or coordinates.

<embed src="https://www.desmos.com/calculator/q0nyt99bcr?embed" width="100%" height="500px" style="border: 1px solid #ccc" frameborder=0></embed>

The Nearest Neighbour Query on the map aims to return the nearest neighbour of a point. So, in the example, it can be seen that the 1st Nearest Neighbour of New York would be Boston and the 2nd Nearest Neighbour of New York Would be Chicago. This goes on for the k value. The interesting thing to remember is that **the starting point of the query often times do not start from the set of existing points**.

What if we would like to query 20 nearest neighbour from a query point? This solution can easily be answered with a **naive** linear query if we do not have an existing data structure. Basically we can just calculate the distance from each point (each city) to our location to determine which ones are the nearest 20 points to us.

However, in bigger applications where there would be more points (Think 1 million points), data structures like the **R-tree** would play a very important role to perform such queries. At the end of the day, it is important to understand that algorithms operate on data structures.

The naive solution would be to do something as follows. (Written in JavaScript)

```js
const sortPointsBasedOnDistance = (queryPoint, points) => {
    points.sort((pointA, pointB) => {
        calculateDistance(queryPoint, pointA) - calculateDistance(queryPoint, pointB); 
    })
}

const calculateDistance = (startingPoint, endingPoint) => {
    let x = endingPoint.x - startingPoint.x;
    let y = endingPoint.y - startingPoint.y;

    return Math.hypot(x, y);
}

let pointA = {
    x: 5,
    y: 5
};

let pointB = {
    x: 4,
    y: 4
};

let points = [];
points.push(pointA, pointB);

let queryPoint = {
    x: 1,
    y: 1
}

sortPointsBasedOnDistance(queryPoint, points);

console.log(points);

```
#### Lessons from this blog post.
- It is hard to explain a year longs' research in a single blog post.
- Console.log in JavaScript is passed a reference to the object, thus the value will actually change when the object changes. It is **not** the value of he object at the moment in time where you call console.log.
- There are not many existing libraries written in JavaScript that deals with these specialised queries. (Perhaps more investigation is needed)


<script>
const sortPointsBasedOnDistance = (queryPoint, points) => {
    points.sort((pointA, pointB) => ( 
        calculateDistance(queryPoint, pointA) - calculateDistance(queryPoint, pointB)
    ));
};

const calculateDistance = (startingPoint, endingPoint) => {
    let x = endingPoint.x - startingPoint.x;
    let y = endingPoint.y - startingPoint.y;
    return Math.hypot(x, y);
};

let pointA = {
    x: 10,
    y: 10
};

let pointB = {
    x: 4,
    y: 4
};

let pointC = {
    x:2,
    y:3
}

let points = [];
points.push(pointA);
points.push(pointB);
points.push(pointC);

console.log(points);

let queryPoint = {
    x: 1,
    y: 1
}

//sortPointsBasedOnDistance(queryPoint, points);

console.log(points);

</script>