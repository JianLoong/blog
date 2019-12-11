+++
title = "Explicit Else (Guard)"
weight = 1
draft = false
date = 2019-10-01T20:56:02+11:00
pre = "<b>&nbsp;1st. </b>"
tags = ["Swift", "Coding Style"]
commentoEnable = true
+++


Before we start, lets take a look at the grammar of a guard statement for the **Swift** language.

> Grammar of a Guard Statement

> <strong>guard-statement</strong> --> guard condition-list else code-block

This was a conversation I had with a co-worker a couple of days back. I asked him, what is this **guard** in Swift? I have not been programming in Swift since iOS development made a shift from Objective C to Swift and I have not seen a guard statement used in any other languages I programmed in. It seems that **guard**s are everywhere in Swift, but my coworker said that **guard**s are something he never used. This is a very interesting notion. At the end of the day, each programmer has his or her own style. It is not wrong to not use guards at all but if so, why are guards everywhere?

(In fact, **guards** were only added in Swift 2.0)

Let's try to understand why guards are everywhere in Swift. Semantically, guards are just a methodology to **practice defensive programming** and the notion where you need to **return early.**

The main reason guards are so dominant in Swift is due to the fact there are **Optionals**. 

#### References

1. StackExchange post regarding guards [here](https://softwareengineering.stackexchange.com/questions/350472/developer-insists-if-statements-shouldnt-have-negated-conditions-and-should-al).
2. Nested conditionals and guards. Post found [here](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)