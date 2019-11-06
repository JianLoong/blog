+++
title = "Inheritance"
date = 2019-11-04
draft = true
pre = "<b>5th. </b>"
weight = 5
tags = ["Java", "Design Pattern", "Inheritance", "Composition"]
+++

{{% notice note %}}

One of the most common relationship when teaching UML is the **inheritance relationship.** However, it is important to understand when it is needed and when it is not. 

{{% /notice %}}

The interesting thing about design is that there is almost **no such thing of a bad design** but every design would have its merits and demerits.

The most interesting in UML is the inheritance relationship during the modelling of a class diagram. In academia, inheritance seems to be almost always encouraged, however academia suffers from quite a number of issues these days. The most glaring problem is that most of the materials are never updated by the people who are responsible to update them.

Here is a simple example of where the inheritance relationship is commonly taught to students.

{{<mermaid align="center">}}

classDiagram
    User <|-- Guest
    User <|-- Admin
    User <|-- Verified

    User: +String username
    User: +String password

{{</mermaid>}}
