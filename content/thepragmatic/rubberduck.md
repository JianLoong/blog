+++
title = "Rubber Duck"
weight = 5
date = "{{ .Date }}"
pre = "<b>1. </b>"
tags = ["Debugging", "Rubber Duck"]
+++


{{% notice warning %}}

This post is under construction.

{{% /notice %}}


### Introduction
----

![Monash University](/blog/images/rubberduck.jpg?width=30pc&featherlight=true&classes=border,shadow)


One of the most frustrating thing about teaching programming these days, is that we do not often teach the process of debugging. 

Students often approach me when they are having an issue in their codes and most often times, I do not directly tell them the answer, but I will spend my time using a process known as **rubber ducking** while attempting to solve their issue.

> <strong>One of my co-workers asked why do I not just tell them the answer? </strong>

My reply to him was, if I was just telling them the answer right away, it is actually pointless because **I would be solving the problem for them.** I do not want to solve the problem for them. In actual fact, I want to teach them a useful skill where they could arrive to the solution by **understanding the problem**, thus they would be able to solve the problem with my help but not with me **outright** giving the answer.

There's an old saying.... 

<div class="shadow">
Give a man a fish, and you'll feed him for a day. Teach a man to fish, and you've fed him for a ife time.
<div class="pull-right">- <strong>Confucius</strong></div>
</div>

Of course, I would save a lot of time by just giving out the solution, but will that be useful for the student in the long term?

Most students generally have more time at hand than the teaching staff, however most of the times, teaching associates (TA)s find it frustrating when handling and teaching students how to solve a problem due to their own schedules as well. It is my belief that, it is very important to teach students the correct process of debugging and problem solving in this scenario.

**I totally disagree with my co-worker that I should outright give them the solution for their programming issue.** However, I think it would also depends on the personality and the method of teaching each individual would have. I think the depth of understanding plays a very important role when attempting to do rubber duck debugging. That very individual does not have much of a programming background but more towards a business background thus the mind set is completely different.

### What is Rubber Duck Debugging?
---

**Rubber ducking** is a very useful technique for finding the cause of a problem by explaining it someone else. This is one of the techniques I often use when another programmer comes to me and asks for help.


{{<mermaid align="center">}}
graph TD
    A(Issue/Problem)
    B[Why?]
    C[Who?]
    D[When?]
    E[What?]
    F[Solution]
    A --> B
    A --> C
    A --> D
    A --> E
    B --> F
    C --> F
    D --> F
    E --> F
{{< /mermaid >}}


One of the more interesting about rubber duck technique, is that it will allow you to tell another programmer why something should not be done.



<style>
.shadow {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding-right: 1em;
    padding-left: 1em;
    padding-top: 1em;
    padding-bottom: 0.5em;
}

.pull-right {
    text-align:right;
}
</style>