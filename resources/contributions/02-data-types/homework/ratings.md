---
title: Ratings Homework
type: homework
duration: "0:30"
creator:
    name: Jess Telford
    city: Sydney
---

# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Ratings Homework

> ***Note:*** _This task better aligns topics covered in lessons 1 & 2: Command Line JS and Arrays + Data Types. It also doesn't require any extra DOM manipulation knowledge, but still pushes the students to research how to handle multiple arrays and nest method invokations._

## Exercise

#### Requirements

- List out the ratings that each age in the `ages` is allowed to watch.
- Where each element in `minAgeForRating` is the minimum age to see the
corresponding `ratings`. That is; `'G'` has a minimum age of `0`, `'PG'` has a
minimum age of `9`, etc.

#### Hints:

- Use `.filter()`, `.map()`, `.forEach()`: http://mdn.io/array
- There is a second parameter to the above functions; the `index`, allowing
	you to look up that same index in another array.
- You will have to nest the usage of `.filter()`, `.map()`, and/or `.forEach()`

#### Starter code

```javascript
var ages = [1, 23, 8, 12, 16]
var ratings = ['G', 'PG', 'M', 'MA']
var minAgeForRating = [0, 9, 12, 15]
```

## Instructions for Submission

1. Start by creating a new repository on GitHub, then clone it to your machine
(follow GitHub's instructions).

2. Create a new file called `ratings.js`, and paste in the arrays given above.

3. Use git to `add`, `commit`, and `push` this file to GitHub once you complete the requirements for this exercise.

4. Try out your solutions on the command line by running:

```bash
$ node ratings.js
```

5. Once you've got a solution, `add`, `commit`, and `push` the `ratings.js` file
again, then send the GitHub URL for the repository to your instructors via
Slack.


## Assessment

There is **no** formal assessment associated with this homework. It is intended
as a continuation of Lesson 02; Data Types.

Your instructors will be looking for the following things when they review your
solution;

* Clarity of code
* Usage of Array methods (such as `.map()`, `.forEach()`, etc)
* Completion of the problem

## Deliverable

An example of the final output could be:

```
Age 1 is allowed to see: G
Age 23 is allowed to see: G,PG,M,MA
Age 8 is allowed to see: G
Age 12 is allowed to see: G,PG,M
Age 16 is allowed to see: G,PG,M,MA
```

Or, even;

```
G
1, 23, 8, 12, 16
PG
23, 12, 16
M
23, 12, 16
MA
23, 16
```
