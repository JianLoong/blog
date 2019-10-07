+++
title = "What are State Machine Diagrams?"
weight = 10
pre = "<b>1. </b>"
tags = ["UML", "State Machine", "State Chart"]
+++

{{% notice warning %}}

This blog post is incomplete.

{{% /notice %}}

{{% notice note %}}

This blog entry assumes that the reader has a basic understanding of UML diagrams and would wish to understand more regarding state machine diagrams.

{{% /notice %}}

#### Introduction

This article is written based on my teaching experiencing in Monash University Australia (Faculty of Information Technology) for the unit Software Engineering.

Often times, one of the most **misunderstood** diagram in UML is the **state machine**. These are also called state charts at times, as we often use terms interchangeably. The semantical difference between two of these diagrams are miniscule at best.

<!-- https://stackoverflow.com/questions/8193675/draw-a-hollow-circle-in-svg -->
<style>
    .cssClass > circle {
        fill:black !important;
        stroke:gray !important;
        stroke-width:3 !important;
     }    
</style>

{{<mermaid align="center">}}

graph LR
S(( ))
A(Open)
B(Close)
E(( ))
S-->A
A-->B
B-->E
style S fill:#000000
class E cssClass

{{< /mermaid >}}

<p align="center">A simple initial state chart for the state of a door.</p>


In fact, for most people, UML is perceived to be something that is not very useful in the development world. The main reason, is because the lack of understanding how the diagrams would relate to a real world application. When I first learn about UML state machines, I often confuse it with other diagrams like the **flow chart** as well as the **activity diagram**. I would also question its usefulness. Over time, I realised that it is the most useful diagrams in UML. I would rank it second in terms of importance, the first spot being the class diagram itself.

**I will attempt to explain why in this blog post.**

Remember that at the end of the day, diagrams are very useful to gain a better understanding of the system. As the saying goes, a picture tells a thousand words. The very first thing to understand is that a state chart is a **dynamic** modelling technique. It focuses on identifying the behavior of your system, specific to instances of **a single class**. <sup>[1](#1)</sup>

The main keywords here are

- A Single Class
- Dynamic

**Let's try to understand these keywords in more details.**

#### A single class

The key features of a state machine, is that it used to model a specific instance of a **single class**. This concept is at utmost importance when dealing with state diagrams. Not **two** classes, not **three** classes but a **single** class. Before we move on, lets see an example of a class diagram for now. Remember that normally the construction of a state diagram happens after the class diagram.

{{<mermaid align="center">}}

graph LR
A[Student]
B[Unit]
A --> B
{{< /mermaid >}}

<p align="center">A simple class diagram. (Initial level)</p>

The example above is a simplification of what a class diagram is at its very basic nature. Two classes, Student and Unit and the Student class using the Unit class.

```
public class Student {
    private String firstName;
    private String lastName;
    private Unit unit;

    // Other methods omitted..
}
```

```
public class Unit {
    private String name;
    private String description;


    // Other methods omitted..
}
```

So, where does the state machine come into the picture in this situation? Since the state machine diagram aims to model a single class. Which class would we model here? Do we model both of them or just one? The answer is pretty simple, we actually attempt to do a state chart of **all of the classes.**

Since based on the diagram, the Student class is using the Unit class, we should start modelling the state chart from the Unit class. The very first steps when drawing the state machine diagram would be to list out all the possible states.

{{% notice tip %}}

Remember that the objective of modelling is always to understand the system in more detailed view. We would also like to understand requirements better. This can be achieved in real life by talking to the real clients and users. If it is a fictional scenario, assumptions would then be made.

{{% /notice %}}

**The more intellectually stimulating steps is probably where you list out the possible states in a state chart.**

So, lets say the possible states of a Unit are

- Offered
- Not offered

{{<mermaid align="center">}}

    graph LR
    S(( ))
    A(Offered)
    B(Not Offered)
    E(( ))
    S-->A
    A-->B
    B-->E
    style S fill:#000000
    class E cssClass

{{< /mermaid >}}

However, if you continue the thought process, there are probably more states which can only be derived by understanding the requirements further.

For example, if we apply the concept of **4W1H**, we will attempt to understand more regarding the requirements itself.

| Category | Question |
| -------- | ------ |
| Who      | ?      |
| Where    | ?      |
| When     | ?      |
| How      | ?      |




#### Dynamic

One of the biggest difference regarding state diagrams in comparison to the other diagrams in UML is that it attempts to model the **dynamic nature of a system**. In comparison to the other diagrams, state machine diagrams can model something which is not captured by the **class diagram**, as well as the **use case diagram**.

It is very important to understand that over time, the state of a class changes. In the semantical sense, **dynamic** conveys the meaning of _(of a process or system) characterised by constant change, activity, or progress_.

{{<mermaid align="center">}}

    graph LR
    S(( ))
    A(Offered)
    B(Not Offered)
    E(( ))
    S-->A
    A-->B
    B-->E
    style S fill:#000000
    class E cssClass

{{< /mermaid >}}

So, if we take a look at our current state chart, what we would like to know is, how does it shift from one state into another state.

#### Diagrams

P.S. - The real reason I wanted to make to blog post, is actually just to use mermaid diagrams.

#### References

<a name="1">1</a>. [UML 2 State Machine Diagrams: An Agile Introduction](http://www.agilemodeling.com/artifacts/stateMachineDiagram.htm)
