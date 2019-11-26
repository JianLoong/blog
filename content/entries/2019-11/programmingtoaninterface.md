+++
title = "Programming to an Interface (Java)"
date = 2019-11-07
draft = false
pre = "<b>7th. </b>"
weight = 7
commentoEnable = true
tags = ["Java", "Design Pattern", "Interface"]
+++

#### Introduction

{{% notice note %}}

A question that often arises is, what is the benefit of **programming to an interface**? This blog post will attempt to explain why. It is quite common for people to have heard of the term but do not really understand the significance of it.

{{% /notice %}}

#### The Fallacy

It is important to understand that the **interface** word used here is actually the broader concept of what an interface is, it does not mean the **Java Interface**. This post however aims to use Java as an example. The main objective of programming to an interface would be to **loosen coupling**.


#### The Declaration

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

The main idea here is that by using Declaration 1, **it will allow developers to easily change the specific data structure used without causing massive changes in the code base** if at a later stage you decided to change the ArrayList to a LinkedList instead. In fact, perhaps using a TreeList.

```java
// Using a List on the LHS
List<String> usingList = new ArrayList<>();

// The process of using a LinkedList instead of an ArrayList can easily be done.
List<String> usingList = new LinkedList<>();

// In fact, you can just use the TreeList library from the ApacheCommons
List<String> usingList = new TreeList<>();

```
<p align="center">Snippet 2. The RHS can be changed to use a<strong> LinkedList or TreeList</strong>.</p>

{{% notice tip %}}

When using **List** it is important to decide which implementation of List to use. Each implementation like ArrayList or LinkedList are suited for different use cases.

{{% /notice %}}


It is also important to understand the difference in the implementation of the ArrayList, LinkedList and TreeList as mentioned earlier. If you are interested in the internal workings, they can be found by referring to the OpenJDK implementation of the ArrayList located [here](http://hg.openjdk.java.net/jdk/jdk12/file/06222165c35f/src/java.base/share/classes/java/util/ArrayList.java) and the LinkedList which can be found [here](http://hg.openjdk.java.net/jdk/jdk12/file/06222165c35f/src/java.base/share/classes/java/util/LinkedList.java).

```java
public class ArrayList<E> 
    extends AbstractList<E> 
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable

{
    private static final long serialVersionUID = 8683452581122892189L;
    private static final int DEFAULT_CAPACITY = 10;

    // Notice that the underlying implementation of the ArrayList uses an Object[] //which is essentially a fixed sized array.
    private static final Object[] EMPTY_ELEMENTDATA = {};

    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    //....omitted
}

```
<p align="center">Snippet 3. Open JDK12 implementation of the <strong> ArrayList</strong>.</p>


```java
public class LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable

{
    transient int size = 0;

    // Notice that it is using a Node here 
    transient Node<E> first;
    transient Node<E> last;

    //...omitted

    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;
        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }
    //...omitted
}
```

<p align="center">Snippet 4. Open JDK12 implementation of the <strong> LinkedList</strong>.</p>

Based on the two snippets, it can be seen that the **underlying implementation of both of the ArrayList and LinkedList are different**, however they still have implementations of all methods that exist within the List interface itself. The ArrayList uses a fixed sized array as its implementation while the LinkedList uses a node that has a next and previous.

{{% notice tip %}}

When following the notion of **programming to an interface** there is still a need to determine the correct implementation to use as ArrayList and LinkedList have different run time complexity when adding and removing elements.

{{% /notice %}}

#### Summary

- It is good idea to always have the LHS (Left hand side) to use List.
- ArrayList and LinkedList are very different in terms of their internal implementation.
