+++
title = "Foreign Key Constraint"
date = 2019-11-09
draft = false
pre = "<b>&nbsp;9th. </b>"
weight = 9
commentoEnable = true
tags = ["Foreign Key", "SQL", "Database", "CQRS"]
+++

#### Introduction

{{% notice note %}}

The motivation for this blog entry is the following post on Hacker News titled **"Thoughts on Foreign Key".** Link [here](https://github.com/github/gh-ost/issues/331#issuecomment-266027731)

{{% /notice %}}

In the post, it is mentioned that **"At GitHub we do not use foreign keys, ever, anywhere."**. This post is actually made by Shlomi Noach, who a principal Software Engineer at Github. Please do note that the post is actually dated **Dec 10, 2016**, this is about 3 years ago. And of course Github runs a **RDMS** instead of a **NoSQL** in that context.

Based on the post it can be seen that the main reasons for not using FKs are as follows (as mentioned by Shlomi)

- FKs are **in your way to shard your database.** Your app is accustomed to rely on FK to maintain integrity, instead of doing it on its own. It may even rely on FK to cascade deletes (shudder). When eventually you want to shard or extract data out, you need to change & test the app to an unknown extent.

- FKs are a performance impact. The fact they require indexes is likely fine, since those indexes are needed anyhow. But the lookup made for each insert/delete is an overhead.

- FKs don't work well with online schema migrations.

**Shlomi also said the following**

---

Let's say you have two tables, P & C, standing for Parent & Child, respectively. There's a foreign key in C such that each row in C points to some "parent" value in P.

Doing schema migration of C is possible. However since foreign keys have unique names, the new (migrated) C table will have a FK with a different name than the original one.

Doing schema migration of P is just not going to work. Recall that gh-ost renames the table at the end. Alas, when renaming a table away, the FK will move with the renamed table. To create a parent-side FK on the ghost table, one would need to migrate C ; and because gh-ost uses async approach, P and P-ghost are never in complete sync at any point in time (except at lock time) which makes it impossible for C to have both a FK to P and to P-ghost. some integrity will be broken.

---

#### The Context and Definition

Before we go **bonkers**, it is important to understand the context of the post itself. When talking about Foreign Keys, it is also good to understand there are two definitions of what a Foreign Key is.

- **(Definition 1)** - A foreign key joins a table to another table by referencing its primary key.

- **(Defintion 2)** - A foreign key constraint specifies that the key can only contain values that are in the referenced primary key, and thus ensures the referential integrity of data that is joined on the two keys.

In this context, Shlomi is actually referring to the **foreign key constraint.**. Judging by the looks, it seems that the application code itself would be responsible for enforcing these constraints. Perhaps, using the **CQRS** pattern? More information regarding the CQRS pattern can be found [here](https://martinfowler.com/bliki/CQRS.html). The main issue with handling the FK constraint in application code is numerous as there is a need to think of situations where you would like a **DELETE CASCADE** and situations win which you do not.

It can be said that it is **very hard** to manage foreign key constraints via application code itself. 

{{% notice tip %}}

**Wait!** <br />There is also a need to understand the context in where Shlomi is referring and more importantly scale in which is at hand.

{{% /notice %}}

In order to understand why this is interesting, there are a few concepts we must first look into. There are two theorems at work here, the **ACID** & **CAP** theorem.

#### ACID vs CAP

The ACID theorem is probably the most well known theorem.

|     Acronym     | Meaning                                                                                                                                      |
| :-------------: | :------------------------------------------------------------------------------------------------------------------------------------------- |
|  **A**tomicity  | An atomic transaction is an indivisible and irreducible series of database operations such that either all occur, or nothing occurs.         |
| **C**onsistency | The guarantee that operations in transactions are performed accurately, correctly, and with validity, with respect to application semantics. |
| **I**solation | Determines how transaction integrity is visible to other users and systems.|
| **D**urability | Guarantees that transactions that have committed will survive permanently. |


<p align="center">Table 1. The <strong>ACID</strong> theorem. </p>

| Acronym | Meaning |
|:-------:|:--------|
| **C**onsistency | is a consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. | 
|**A**vailability | Every request receives a (non-error) response, without the guarantee that it contains the most recent write |
| **P**artition tolerance | The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes|

<p align="center">Table 2. The <strong>CAP</strong> theorem. </p>

The CAP theorem is slightly more interesting because it is said that it is impossible for a a distributed data store to simultaneously provide more than out of the three guarantees. However, the CAP theorem is often misunderstood as it is assumed that there is need to pick two out of the three however, this is not the case. The CAP theorem semantically means **one cannot have 3 out of 3 guarantees at all times.** But the main idea here is that there is a difference between the ACID theorm and CAP theorem, ACID would address the data consistency of an **individual node** where else the CAP theorem would address the **cluster-wide** data consistency. So, the CAP theorem plays a more importantly role when there is talk about scalability.

{{% notice tip %}}

The ACID theorem applies on an individual node, the CAP is for cluster-wide data consistency.

{{% /notice %}}

In short, the post is also talking about scaling as well. So, when scaling relational data, sharding would come into the picture as well. With the presence of FKs, the process of sharding, becomes more complicated. From my personal experience, I notice that it is quite common for developers to always drop FK constraints when attempting to do schema migrations but the main key point here is that the migrations mentioned above are done **online**. Thus, migrations are done without down time.

But.....

At the end of the day, FK constraints are very important if your company does not operate at the scale in which GitHub operates. It is their design decision to not use FK constraints but every company and their use cases are different.

{{% notice warning %}}

Most companies **do not** operate at the scale where there is a need to drop FK constraints. Dropping FK constraints are meant for very specific use cases and architectural designs. Even if these constraints are dropped, there is still a need to enforce them at the application level. It is also important to decide **which database** is more suited for your use case as well.

{{% /notice %}}


#### References

1. https://www.tutorialspoint.com/sql/sql-foreign-key.htm

2. https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/Constraints/ConstraintTypes/ForeignKeyConstraints.htm?TocPath=Administrator%27s%20Guide%7CConstraints%7CSupported%20Constraints%7C_____2

3. https://dba.stackexchange.com/questions/31260/consistency-in-acid-and-cap-theorem-are-they-the-same

4. https://news.ycombinator.com/item?id=21486494

5. https://stackoverflow.com/questions/7713049/read-locks-and-write-locks
