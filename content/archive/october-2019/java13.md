---
title: "Java 13 on Ubuntu"
date: 2019-10-13T21:28:45+11:00
draft: false
pre: "<b>28th. </b>"
weight: 28
---

Installing Java 13 on Ubuntu is pretty simple.

All that was needed was 


```shell
sudo apt install openjdk-13-jdk

sudo update-alternatives --config java
```

Of course, it would be better if you are on the latest version of Ubuntu so that the apt actually finds it there. (I am currently using Ubuntu 19.04). You can obtain this information by 

```shell
lsb_release -a
```

After that, all that was needed was to properly configure the Java path where you can easily find where it is from doing

```shell
sudo update-alternatives --config java
```

Please do note that using the `which java` and using that path does not work as it is not the SDK.

