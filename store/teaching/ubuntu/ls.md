+++
title = "The File System"
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

### The Linux File System Directory Architecture.

In Linux distributions, the directory structure is defined by the **Filesystem hierarchy Standard**.<sup>[1](#1)</sup>

<style>
    .secondLevel > rect {
        fill:lightblue !important;
     }    
</style>

{{<mermaid align="center">}}

graph TD
R( / )
L1A( /bin )
L1AA( /etc )
L1B( /proc )
L1C[ /boot ]
L1D[ /root ]
L1E[ /dev ]
L1F( /home )
L1G( /usr )

    L2A( /jian )
    L2B( /tim )
    L2C( /kevin )
    L2D( /bin )

    R --> L1A
    R --> L1AA
    R --> L1B
    R --> L1C
    R --> L1D
    R --> L1E
    R --> L1F
    R --> L1G

    L1F --> L2A
    L1F --> L2B
    L1F --> L2C

    L1G --> L2D


    style R fill:#FFFFFF
    class L1A,L1AA,L1B,L1C,L1D,L1E,L1F,L1G secondLevel;

{{< /mermaid >}}

<p align="center">This diagram shows how the file system looks like on an Ubuntu machine. </p>

The first and top most directory is called the **root directory**. This directory is denoted as the `/` (forward slash) symbol. The reason for this is because it can be thought off as the trunk of a tree. The directory entry itself has **no name**. The name of it is the empty part before the initial directory separator.


| Directory | Purpose                                                                                                                                                                      |
| :-------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     /     | - First directory and the root of the entire file system hierarchy <br />- Contains all other directories                                                                    |
|   /bin    | - Contains commands that may be used by **both** the system administrators and by users <br /> - There must be no subdirectories in here.                                        |
|   /boot   | - The operating system kernel is located here.                                                                                                                               |
|   /etc    | - Contains configuration files. **Configuration file** is a local file that is used to control the operation of a program. It must be static and cannot be an executable binary. |
|   /home   | - This directory contains user's home directories. Generally, each user would have a separate directory with their username under this directory.                            |

{{% notice tip %}}
Even though `/home` is a standard concept, the setup will differ from host to host. Therefore it is important that no program should assume any specific location for a home directory, rather it should query for it.
{{% /notice %}}

{{% notice warning %}}

On Ubuntu, you will notice another directory called `/root`, however, this is not the root directory. It is actually the home directory of the superuser.

{{% /notice %}}


### Your `home` directory.

### What is a pathname?

There are two types of path names.

{{<mermaid align="center">}}

graph TD
    linkStyle default interpolate linear
    R(Pathname)
    P1(Absolute Path)
    P2(Relative Path)

    R --> P1 
    R --> P2

    style P1 fill:skyblue;
    style P2 fill:skyblue;
{{< /mermaid >}}




### The `man` pages

There are several ways in which users obtain help. One of the most well known way would be to use the man pages. However, these days most people do not use the man pages anymore.

```console
$ man
```

For example, if you want to take a look at the `man` pages for the `ls` command, you will just need to do

```console
$ man ls
```

### The `ls` command

List in **long format** all the files and directories in your home directory.

Answer

```bash
$ ls -l
```

The main challenge of this question is so that students understand how to use the `ls` command.

There are several points to take note in this question. For example, what is the meaning of **long** format? What does it mean by **all** files and directories?

One interesting thing is that most people do not know that the `ls` command can actually be given a file.

So, the various accepted answers for this question are

```bash
$ ls -l
$ ls --all -l
$ ls -al
```

List in **long format** all the files and directories (top-level only) in the **/usr/local** directory, sorted by the time of last modification.

```bash
$ ls -lt /usr/local
```

One interesting thing about Ubuntu is the way it manages time. For example, if you use the command `stat` on a file.

<pre>  
  File: examples.desktop
  Size: 8980      	Blocks: 24         IO Block: 4096   regular file
Device: 10306h/66310d	Inode: 3145732     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/    jian)   Gid: ( 1000/    jian)
Access: 2019-10-09 08:43:17.558138350 +1100
Modify: 2018-10-29 21:38:37.957796856 +1100
Change: 2018-10-29 21:38:37.957796856 +1100
 Birth: -
</pre>


<!-- ![Stat command on file](/blog/images/ubuntu/stat.png?featherlight=false&classes=border,shadow) -->

---

Challenge 3

Create the following **directory** structure.

{{<mermaid align="center">}}

graph TD
S( Your Home Directory )
A( monash )
B( personal )
C( documents )
D( data )
E( temp )
F( documents )
S --> A
S --> B
A --> C
A --> D
A --> E
B --> F
{{< /mermaid >}}

In order to create the directory structure, there are several ways. One way to do is would be to use several `mkdir` commands.

```bash
$ mkdir monash
$ mkdir personal
$ mkdir monash/documents
$ mkdir monash/data
$ mkdir monash/temp
$ mkdir personal/documents
```

However, you can achieve the same result by using a single `mkdir` command. At the end of the day if you look at the manual for `mkdir`, it does mention that it can be used to create directories.

```bash
$ mkdir -p monash personal monash/documents monash/data monash/temp personal/documents
```

Change into the **~/monash/temp** directory. The special character ~ means "a shortcut to your home directory"


Change into your home directory. How many ways can you do this?

```bash
$ cd ~
$ cd 
$ cd $HOME
```

#### References

<a name="1">1</a>. [Wikipedia Filesystem Hierarchy Standard](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)
