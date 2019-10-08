+++
title = "Basic commands"
weight = 5
date = "{{ .Date }}"
pre = "<b>1. </b>"
tags = ["Shell", "Bash", "Command Line"]
+++

{{% notice warning %}}

This blog post is under construction.

{{% /notice %}}

{{% notice note %}}

This blog entry assumes that the reader has a basic understanding of using the command line and would like to know more. (More specifically using the Bash shell on Ubuntu)

{{% /notice %}}

### The `man` pages

There are several ways in which users obtain help. One of the most well known way would be to use the man pages. However, these days most people do not use the man pages anymore.

```
$ man
```

### The `ls` command

List in **long format** all the files and directories in your home directory.

Answer
```
$ ls -l 
```

The main challenge of this question is so that students understand how to use the `ls` command.

There are several points to take note in this question. For example, what is the meaning of **long** format? What does it mean by **all** files and directories?

One interesting thing is that most people do not know that the `ls` command can actually be given a file.

So, the various accepted answers for this question are
```
$ ls -l
$ ls --all -l
$ ls -al
```


List in **long format** all the files and directories (top-level only) in the **/usr/local** directory, sorted by the time of last modification.

---
Question 3 

Create the following **directory** structure.

{{<mermaid align="center">}}

graph TD
    S[ Your Home Directory ]
    A[ monash ]
    B[ personal ]
    C[ documents ]
    D[ data ]
    E[ temp ]
    F[ documents ]
    S --> A
    S --> B
    A --> C
    A --> D
    A --> E
    B --> F
{{< /mermaid >}}

In order to create the directory structure, there are several ways. One way to do is would be to use several `mkdir` commands.

```shell
$ mkdir monash
$ mkdir personal
$ mkdir monash/documents
$ mkdir monash/data
$ mkdir monash/temp
$ mkdir personal/documents
```

However, you can achieve the same result by using a single `mkdir` command. At the end of the day if you look at the manual for `mkdir`, it does mention that it can be used to create directories.

```shell
$ mkdir -p monash personal monash/documents monash/data monash/temp personal/documents
```

Change into the **~/monash/temp** directory. The special character ~ means "a shortcut to your home directory"