+++
title = "Programming to an Interface (Java)"
date = 2019-11-07
draft = false
pre = "<b>7th. </b>"
weight = 7
commentoEnable = true
tags = ["Java", "Design Pattern", "Interface"]
+++


{{% notice note %}}

A question that often arises is, what is the benefit of **programming to an interface**? This blog post will attempt to explain why. It is quite common for people to have heard of the term but do not really understand the significance of it.

{{% /notice %}}

The most commonly used example is as follows. Notice that in this example, the **LHS (Left hand side)**, is using **List** while the **RHS (Right hand side)** is specifying it to be **ArrayList.** Here, I am trying to create a List of Strings.


```java
List<String> usingList = new ArrayList<>();
```
<p align="center">Declaration 1. The first method using <strong>List on the LHS</strong>.</p>

```java
ArrayList<String> usingArrayList = new ArrayList<>();
```
<p align="center">Declaration 2. The first method using <strong>ArrayList on the LHS</strong>.</p>

Notice that in declaration 2, the LHS is using ArrayList instead of the List. One of the biggest difference is that by the first declaration using List on the LHS. By using this way (Declaration 1), you are ensuring that you only call methods defined by the **List** instead of **ArrayList** specific methods. There are a few ArrayList specific methods like **trimToSize** and **ensureCapacity**. Generally declaration 2 should be avoided.

```java
// trimToSize method cannot be resolved
usingList.trimtoSize();

// trimToSize method can be resolved
usingArrayList.trimToSize();

// ensureCapacity method cannot be resolved
usingList.ensureCapacity();

// ensureCapacity can be resolved
usingArrayList.ensureCapacity();

```
<p align="center">Snippet 1. An example when methods like trimToSize and ensureCapacity <strong> could not resolved.</strong>.</p>

To be brief, declaration 1 using List will allow the user to only use methods defined in the List interface, declaration 2 will allow users to use methods specific to the ArrayList class which includes trimToSize and ensureCapacity. It might not be very obvious when dealing with a class like the ArrayList but it is more evident if the class is a **LinkedList** instead. There is a big difference in the underlying implementation of the ArrayList and the LinkedList. An ArrayList is essentially an array where else a LinkedList is implemented as a double linked list.

The main idea here is that by using Declaration 1, it will allow developers to easily change the specific data structure used without causing massive changes in the code base if at a later stage you decided to change the ArrayList to a LinkedList instead. In fact, perhaps using a TreeList.


{{% notice tip %}}

When using **List** it is important to decide which implementation of List to use. Each implementation like ArrayList or LinkedList are suited for different use cases.

{{% /notice %}}
