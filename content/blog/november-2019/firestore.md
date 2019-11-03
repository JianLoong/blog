---
title: "Nested Data in Documents (FireStore)"
date: 2019-11-T01:30:45+11:00
draft: false
pre: "<b>1st. </b>"
weight: 1
---

{{% notice note %}}

When using **Google Firestore**, there is a need to put some thought into the way the data is structure. Each option would have an advantage or limitations **depending on the use case.**

{{% /notice %}}

With JSON being everywhere, there are times when there is a need to figure out how to structure data in the Cloud Firestore.

Here are a few common options.

- Nested data in documents
- Subcollections
- Root-level

{{% notice warning %}}

The most important thing to remember that there is **no perfect** solution for structuring a Cloud Firestore database. The best and correct solution often times would be the solution that fis the needs and makes the job easier.

{{% /notice %}}

|          Type          | Advantages                                                           | Limitations                                     |
| :--------------------- | :------------------------------------------------------------------- | :---------------------------------------------- |
|         Nested         | Easy to set up                                                       | Nested documents isn't as scalable as other     |
|    Sub-collections     | Full query capability on sub-collections.                            | Cannot easily delete sub-collections            |
| Root-level collections | Most flexible and most scalable long with powerful query capability. | Getting data becomes more complex as data grows |

### Avoid using Time as Document ID

One of the common things I have seen is that some developers often use a **date** or **datetime** as their document id as their collection name. There are actually several reasons this should not be done. (This is especially true for FireStore)

- Document IDs **should not** be monotonically increasing such as 
  - Customer1, Customer2, Customer3, ....
  - Product1, Product2, Product3, ....
  - 2019-01-01, 2019-01,02, 2019-01-03,...
- Sequential IDs can lead to **hotspots**. 
- **Document IDs are Strings** and parsing Strings are often times very troublesome.
  - For example, how would you query all documents on February? It would be super hard if they were stored as a String data type and you would be doing a lot of String transformations which is processor intensive and not needed at all. Document IDs in FireStore should **not** be stored as a date.
- **FireStore Queries.** One of the benefits of FireStore is that allows you to write better queries in comparison to Firebase, thus if there is a field with the datatype of timestamp, it would allow you to do **range queries** on that field itself. This can only be done if the data type is **timestamp**.
- **Time-zone.** Depending on your use case, time zones play a very important factor. For example, if you are collecting data from a sensor, which time becomes important? Would it be Firebase Server time or would it be the time where the sensor itself is? What happens when Day Light Saving happens? Thus, it would always be a better idea to keep the time stamp with a time zone correctly. 

#### References

1. Firebase. (2019). Choose a data structure  |  Firebase. [online] Available at: https://firebase.google.com/docs/firestore/manage-data/structure-data [Accessed 1 Nov. 2019].
2. Firebase. (2019). Perform simple and compound queries in Cloud Firestore  |  Firebase. [online] Available at: https://firebase.google.com/docs/firestore/query-data/queries [Accessed 1 Nov. 2019].