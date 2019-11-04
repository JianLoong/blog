+++
title= "JavaScript Sort Stability"
date= 2019-11-04
draft= false
pre= "<b>4th. </b>"
weight= 4
commentoEnable= true
tags= ["Sort", "JavaScript", "ES6"]
+++

{{% notice note %}}

Sorting is important. Sorting in JavaScript can be **quirky**. This blog post will be regarding a recent post made by the v8 team regarding the Array.prototype.sort.

{{% /notice %}}

This blog post will demonstrate an example where the stability of a sort becomes important. The situation is normally known as the **two-pass sorting which is commonly used sort by two columns.** In other words, I would like to use one function to sort one column first and then another function to sort another column. This is **different** in comparison to having a single function that sorts two columns in a **single pass.** Hence, with a two-pass, two different functions will be used for sorting instead of a call to a single function. (This would apply for two or more passes as well, otherwise known as a chain.)

{{% notice warning %}}

JavaScript implementation of sort is **not stable**.

{{% /notice %}}

Let's have a look at a JavaScript example below.

```javascript
const sortExample = () => {
  const students = [
    { name: "Charlie Doe", score: 50 },
    { name: "Alex Smith", score: 60 },
    { name: "Alex Doe", score: 60 },
    { name: "Drew Doe", score: 50 },
    { name: "Taylor Doe", score: 50 },
    { name: "Jordan Doe", score: 55 },
    { name: "Blake Doe", score: 50 }
  ];

  const sortByScore = students => students.sort((a, b) => b.score - a.score);
  const sortByName = students =>
    students.sort((a, b) => ("" + a.name).localeCompare(b.name));

  sortByName(students);
  console.log(JSON.parse(JSON.stringify(students)));
  sortByScore(students);
  console.log(JSON.parse(JSON.stringify(students)));
};

sortExample();
```

In this example, I have two functions one of them sortByScore and another sortByName. Each of them would work individually and let's assume that test cases have been written for them. So what I would do is, I would use sortByName first. After, it is completed, I would then use sortByScore. **I would expect my results to be sorted by the score but ordered based on the alphabetical order as I have already sorted by their names.**

However, this will only be the case if, the sort is **stable.** If the sort is **not stable**, the final results might not be in alphabetical order for the same scores.

The output for the **sortByName**.

```shell
0: {name: "Alex Doe", score: 60}
1: {name: "Alex Smith", score: 60}
2: {name: "Blake Doe", score: 50}
3: {name: "Charlie Doe", score: 50}
4: {name: "Drew Doe", score: 50}
5: {name: "Jordan Doe", score: 55}
6: {name: "Taylor Doe", score: 50}
length: 7
__proto__: Array(0)
```

Notice that in this output, the array is sorted by their names.

We will now sort the entries by the score by using the same function on the array using the sortByScore function.

```shell
0: {name: "Alex Doe", score: 60}
1: {name: "Alex Smith", score: 60}
2: {name: "Jordan Doe", score: 55}
3: {name: "Blake Doe", score: 50}  😄
4: {name: "Charlie Doe", score: 50}😄
5: {name: "Drew Doe", score: 50}   😄
6: {name: "Taylor Doe", score: 50} 😄
length: 7
__proto__: Array(0)
```

A **stable** sort will return the entries in the order they would appear in the original array. If the sorting algorithm used is not stable, an outcome that could happen from the **sortByScore** can be something like the following.

```shell
0: {name: "Alex Doe", score: 60}
1: {name: "Alex Smith", score: 60}
2: {name: "Jordan Doe", score: 55}
3: {name: "Charlie Doe", score: 50} 😓
4: {name: "Blake Doe", score: 50}   😓
5: {name: "Drew Doe", score: 50}    😄
6: {name: "Taylor Doe", score: 50}  😄
length: 7
__proto__: Array(0)
```

Here the entries **Charlie Doe** and **Blake Doe** has been swapped. This is not the intended result from the sorting algorithm as the sort itself is not stable.

Of course, I could rewrite the sort to be a single pass by using. However, this single pass sort function is still **not stable** because of the implementation of the sorting algorithm in which JavaScript uses. However, it does fit for my specific use case.

```javascript
const sortByScoreThenName = students =>
  students.sort((a, b) => {
    if (b.score > a.score) return 1;
    if (b.score < a.score) return -1;
    if (b.score == a.score) return ("" + a.name).localeCompare(b.name);
  });
```

But the main objective of this blog post is to describe a situation where the stability of the sort becomes important. In short, the stability of a sort matters when there is a need for the list or array to be **chained** through multiple conditions.

{{% notice note %}}

The take away message from this blog post is <br />
- JavaScript sort is **not stable.** <br />
- The stability of a sort matters when there is a need to **chain** sorts.

{{% /notice %}}

<script>

const sortExample = () => {

    const students = [
        {name: "Charlie Doe", score: 50},
        {name: "Alex Smith", score: 60},
        {name: "Alex Doe", score: 60},
        {name: "Drew Doe", score: 50},
        {name: "Taylor Doe", score: 50},
        {name: "Jordan Doe", score: 55},
        {name: "Blake Doe", score: 50}
    ];
 

    const sortByScore = (students) => students.sort((a,b) => b.score - a.score);
    const sortByName = (students) => students.sort((a,b) => ('' + a.name).localeCompare(b.name));
   
    sortByName(students);
    console.log(JSON.parse(JSON.stringify(students)));
    sortByScore(students);
    console.log(JSON.parse(JSON.stringify(students)));


    // const sortByScoreThenName = (students) => students.sort((a,b) => {
    //     if(b.score > a.score) return 1;
    //     if(b.score < a.score) return -1;
    //     if(b.score == a.score) return ('' + a.name).localeCompare(b.name);
    // });

    // sortByScoreThenName(students);

    // console.log(students);
}

sortExample();

</script>

#### Lessons from this blog post.

1. JavaScript String sort can be easily done using **localeCompare.**
2. Console.log uses reference. (Once again, so it is much better to Stringify it)
3. Safari no longer support Windows. (I wonder how long ago it ended support for Windows)
4. V8 is an amazing engine.

### References

- V8.dev. (2019). Stable Array.prototype.sort · V8. [online] Available at: https://v8.dev/features/stable-sort [Accessed 3 Nov. 2019].
- stable?, W., Brunell, M., Robinson, A., Koberg, J. and Carter, J. (2019). What is the benefit for a sort algorithm to be stable?. [online] Stack Overflow. Available at: https://stackoverflow.com/questions/808617/what-is-the-benefit-for-a-sort-algorithm-to-be-stable [Accessed 3 Nov. 2019].

<!-- More information can be obtained at this [link](https://v8.dev/blog/array-sort) and also [here](https://v8.dev/features/stable-sort) -->
