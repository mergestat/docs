---
title: Are We Vulnerable? (e.g. Log4Shell) - Identifying Open-Source Library Risk Using MergeStat (Part 2)
authors: [peterfreiberg]
description: Previously, we looked at a few ways we can look at open-source library risk across our code. In this article, we’ll look at how we can search for new known vulnerabilities once details become available. 
# image: ./most-common-sbom-artifacts.jpg
tags: [mergestat, sql, vulnerabilities, security, open-source]
---

:::info *Guest Post*
This is a guest post by [**Peter Freiberg**](https://www.linkedin.com/in/peterfreiberg/), a DevSecOps and application security consultant based in Melbourne, Australia.

*I am a consultant who specialises in Application Security and DevSecOps. I've built teams and capabilities for organisations around Penetration Testing (ethical hacking), Secure Code Reviews, DevSecOps, Security Test Automation, Security Development Lifecycle and training.*
:::

Previously, we looked at a [few ways we can look at open-source library risk across our code](../2023-02-19-identifiying-open-source-risk-part-1/index.md). In this article, we’ll look at how we can search for new *known* vulnerabilities once details become available. 

So, an email, article or colleague disrupts whatever you were doing and proclaims “XYZ library is vulnerable and it’s horrible!”. How do you tell if you’re vulnerable to XYZ vulnerability?

If you can query your code, you can start finding where you might be exploitable. If you’re new to [MergeStat](https://github.com/mergestat/mergestat), the `tldr` is it's a tool to aggregate multiple Git sources, organisations and repos in a literal SQL interface (with some other magic sauce utilities too)

In this case, let’s take a look at Log4Shell. Here’s a rundown of the advisory: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-356a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-356a) 

One of their first steps was *“Identifying assets affected by Log4Shell and other Log4j-related vulnerabilities”*

Now, assets is going to involve a lot of things that are off the shelf, but from a “knowing our code” angle there’s a few things we can do.

Our high-level process using [MergeStat](https://github.com/mergestat/mergestat) to identify potential locations is pretty simple:

1. Find all locations where we might include Log4J. In this example, we’ll look at the the package manager maven)
2. Search for Log4J (we can get more specific, but let’s start here)
3. Find the last author or committer who touched the file to assist with assessing and remediation

Find all the maven package manager files

```sql
SELECT repo, path 
FROM git_files
INNER JOIN repos ON git_files.repo_id = repos.id
WHERE path LIKE '%pom.xml'
```

We’re going to get something that looks like the following

| repo | path |
| --- | --- |
| https://github.com/ORG-A/repo1 | service-discovery/blah/pom.xml |
| https://git.internal.xyz/TEAM-B/repoY | pom.xml |
| ... | ... |

That’s pretty straight forward, but what we really want is to find all the maven files which look like they use Log4J.

```sql
SELECT repo, path 
FROM git_files
INNER JOIN repos ON git_files.repo_id = repos.id
WHERE path LIKE '%pom.xml' AND contents LIKE '%log4j%'
```

This will produce a similar table result as above, this time with files that contain Log4J. Now, this is pretty broad keyword search, but if you take a look at the [Log4J](https://logging.apache.org/log4j/2.x/maven-artifacts.html) documentation this should catch most of the situations where Log4J appears, even if you change the package manager filename (e.g. `build.gradle`, `build.sbt` etc) and even the [Clojure build tool](https://clojure.org/guides/tools_build) if that’s your thing.  

Now to find out who can help us determine if we’re actually vulnerable. Hopefully we have a version number in the `pom.xml` or equivalent build tool. If we have to dive deeper to check deployment status then we probably need to find the last person who touched the package manager file. 

Here’s a query to find all developers and committers who last modified the maven files which look like they use Log4J:

```sql
--- TODO(amenowanna) this needs some help
SELECT repo, auth_empath 
FROM git_files
INNER JOIN repos ON git_files.repo_id = repos.id
WHERE path LIKE '%pom.xml' AND contents LIKE '%log4j%'
AND "SOME OTHER QUERY I NEED To thiNK ABOUT"
```

## What are the limitations of this process?

**This example is only Maven, it doesn’t include other ecosystems (but could)**

The above process and queries could be easily tweaked to query Gradle, Scala build tool and other JVM based languages or integrations. You could run your analysis on `build.gradle` or whatever your JVM package manager file is. As above take a look at the [Log4J](https://logging.apache.org/log4j/2.x/maven-artifacts.html) and [Clojure build tool](https://clojure.org/guides/tools_build) documentation for some other package managers. 

**It may be included in another library as a dependency (AKA Transitive Dependency)**

This one is a bit trickier. If we don’t have that extracted and queryable already, we would then need to query the broader libraries and check if they use the library. However, we can at least start from a “where are all the maven, gradle, sbt etc” package manager files and run the analysis from that starting point. 

**We’re only looking at our code, what about 3rd party and COTS?** 

The above won’t help with “off the shelf” software that has something like Log4J bundled (e.g. Tomcat, or a commercial application built on top of Tomcat). Most likely, these will be discovered using other vulnerability management tools looking at virtual machines or containers.

**This code may not be actually deployed**

Is it test code? Proof of Concept? Decommissioned? 

Who knows? At least you have a starting point with some names to start asking questions. As above, if you find the last author or committer and ask them you can then rule in or out whether it’s an issue for you. 

**It may be fixed in code, but not released to production**

To actually confirm we’re not vulnerable across our organisation and applications, we still need to check the deployed artefact. We have the starting point of code, but can then follow up through developers we found who’ve updated those files. 

## Next Steps

As you can see, being able to query your code is extremely useful when looking for something which is “known bad”.  We can quickly query our code bases to start the initial analysis of our posture. We’ve used Log4J here, but these types of queries could be used for Dockerfiles (e.g. some binary install through curl that’s compromised, different added packages with vulnerabilities), other language package managers (e.g. Ruby Gems, Python pip, Go mod etc).

:::info Join our Slack

If you found this interesting, hop in our [**community Slack**](https://join.slack.com/t/mergestatcommunity/shared_invite/zt-xvvtvcz9-w3JJVIdhLgEWrVrKKNXOYg)! We're always happy to chat about **MergeStat** there 🎉.

:::