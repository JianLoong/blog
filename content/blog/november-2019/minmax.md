+++
title = "Min and Max value of an Array (Java)"
date = 2019-11-06
draft = false
pre = "<b>6th. </b>"
weight = 6
commentoEnable = true
tags = ["Sort", "Java", "Streams"]
+++

{{% notice note %}}

There are many ways to obtain the min and maximum value of items inside of an Array. This blog post will show case its many ways.

{{% /notice %}}

The most basic way to do this is to loop through the entire array manually. The benefit of doing it this way, is that it just relies on the standard library and can be easily rewritten to an even simpler form. This way uses the **Math.max** and **Math.min** method. It will also, store the min value as the **Integer.MAX_VALUE** as the initial value and vice versa. One other way to do it would be to keep the first index as the minimum and maximum value.


```java
public void usingManual(int[] numbers){
    if (numbers.length == 0)
        throw new IllegalArgumentException("Invalid array");
    int min = Integer.MAX_VALUE;
    int max = Integer.MIN_VALUE;

    for(int value : numbers){
        if (value > max)
            max = Math.max(max, value);
        if (value < min)
            min = Math.min(min, value);
    }

    System.out.println("Min is " + min);
    System.out.println("Max is " + max);
}
```

<p align="center">Method 1. Using the <strong>manual method.</strong> </p>


Another way would be to sort the array. The first index would be the least and the last index would be the maximum. This is easily done using the **Array.sort** method. The issue with this way is that it would sort the array in place and it also rely on the inbuilt sort method. It is **generally** a bad idea to use a sort in a method you want to obtain the minimum and maximum because users of this method would not expect this method to be sorting the array itself. Thus, it is better to create a **clone** of it or a **copy** of the numbers array itself so that you do not sort the elements in place but sort the **cloned** array instead.

```java
public void usingSort(int[] numbers){
    if (numbers.length == 0)
        throw new IllegalArgumentException("Invalid array");
    int[] clonedArray = numbers.clone();
    Arrays.sort(clonedArray);
    System.out.println("Min is " + clonedArray[0]);
    System.out.println("Max is " + clonedArray[clonedArray.length - 1]);
}
```

<p align="center">Method 2. Using the in-built <strong>Arrays.sort</strong>. </p>


You can also use a stream as well. However, it is only available in later versions of Java. The **IntStream** is only available since Java 1.8 and considerations need to be taken into account when using it. Here, there are is a need to decide if a **parallel** stream should be used as well.

```java

public void usingIntStream(int[] numbers){
    if (numbers.length == 0)
        throw new IllegalArgumentException("Invalid array");    
    IntStream intStream = Arrays.stream(numbers);
    System.out.println("Min is " + intStream.min());
    System.out.println("Max is " + intStream.max());
}
```

<p align="center">Method 3. Using <strong>streams</strong> </p>


You can also do it using the summaryStatistics of the int stream class. This is basically a **state object** for collecting statistics such as count, min max, sum and average. This would potentially be one of the better ways. This reason it is probably one of the better ways is because the **IntSummaryStatistics** is able to store other information as well besides the min and max, thus increasing its re-usability. So, there is no need for the iteration of the array itself again.

```java
public void usingSummaryStats(int[] numbers){
    if (numbers.length == 0)
        throw new IllegalArgumentException("Invalid array");    
    IntSummaryStatistics stats = Arrays.stream(numbers).summaryStatistics();
    System.out.println("Min is " + stats.getMin());
    System.out.println("Max is " + stats.getMax());
}
```

<p align="center">Method 4. Using the <strong>IntSummaryStatistics</strong> </p>

Finally, you can also use a Collections class to do it. However, in order to do so, you must **box** the primitive values into their class equivalent.

```java
public void usingCollections(int[] numbers){
    if (numbers.length == 0)
        throw new IllegalArgumentException("Invalid array");
    List<Integer> integerList = new ArrayList<>();
    Arrays.stream(numbers).forEach(value -> integerList.add(value));
    System.out.println(Collections.min(integerList));
    System.out.println(Collections.max(integerList));
}

```
<p align="center">Method 5. Using the <strong>Collections</strong> class.</p>


#### Summary

There are many ways to obtain the *min* and *max* of an array in Java. My personal preference is that, if you are using Java 8 or higher, it would better to use the **IntSummaryStatistics** method, otherwise the classical way where a loop is written would be preferred. Besides that, it is also not a very good idea for your method to do two things, thus it would be better to introduce two methods instead, but if you are using the IntSummaryStatistics method, you can avoid these needless complexities.
