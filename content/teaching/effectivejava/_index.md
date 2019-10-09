+++
title = "Effective Java"
weight = 5
date = "{{ .Date }}"
pre = "<b></b>"
tags = ["Java", "Effective Java"]
+++

{{% notice warning %}}

Under construction.

{{% /notice %}}


## Generics classes

A class or interface whose declaration has one or more **type parameters** is a generic class or interface. Generic classes and interfaces are collectively known as *generic types.* 

One of the best examples would be the list class.

```java
public interface List<E> extends Collection<E> {
    // methods omitted
}
```

{{% notice warning %}}

You should not do something like this...

```java
private final Collection stamps = ... ;
```

{{% /notice %}}

