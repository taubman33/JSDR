![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# ADI Styleguide

While this certainly won't be a totally all-inclusive styleguide, we want to nail down some rules, especially around creating materials, so we can be consistent

A few may seem arbitrary, but they're based on how easy it is to be inconsistent, so let's consider it a part of working together and use it as our shared defaults.

If there are any really major issues or significantly impactful reasons to change, add, or remove rules from our shared styleguide, make a GitHub issue & shop it around – let's get feedback from instructors & see what everyone thinks we should do.

<!-- MarkdownTOC -->

- [Important Terms](#important-terms)
- [Default Style](#default-style)
- [Default names for files & folders](#default-names-for-files--folders)
- [Default Screenshots](#default-screenshots)
- [File Structure](#file-structure)
- [Material Metadata](#material-metadata)
- [Headings & Text](#headings--text)
- [Contributing Materials](#contributing-materials)

<!-- /MarkdownTOC -->

<a name="important-terms"></a>
## Important Terms


##### Introduction _(I Do)_

This is what we'll call the beginning of a lesson, when we're mostly just lecturing. It'll probably include the history of the topic, how it connects to other topics we've covered, and why it's important.

##### Demo _(I Do)_

This is when we'll be lecturing & probably showing something while we do it. We can still throw in interactive techniques, but if this chunk of a lesson is basically showing & talking, it's a demo and students should not be practicing on their own but focusing on what the instructor is doing.

##### Codealong _(I/We Do)_

This is when students will be practicing syntax while instructors demonstrate it.

##### Guided Practice _(We Do)_

This is when we're demoing, but asking students to code along with us. It's also a lot of lecturing, but differs in that it's doing something together with students, and generally to create some end product that you've already demoed.

##### Independent Practice _(You Do)_

This is a name for the chunks of a lesson when you're asking students to do something on their own. It probably most often follows a demo or codealong (though not necessarily), and it's intended to get students doing instead of just watching us & zoning out.




<a name="default-style"></a>
## Default Style

### Use dashes, not underscores
While dashes & underscores are both fine choices, our structure starts looking ugly when we randomly have both, depending on preference. Underscores are wonderful, no hating on underscores.

But dashes are more commonly associated with web URLs, and in some environments allow us to jump using the keyboard, where underscores don't always let us do that.

Discounting any automatically generated code where underscores are absolutely necessary (e.g. Rails controller files), **use dashes for folder & filenames.**

### Use leading zeros by default

When you have multiple files sitting next to each other in a folder, number them with one or more leading zeros for visual consistency.

```
- index-01.html
- index-02.html
- index-03.html
```

### Lowercase file names (and use dashes)

By consistently keeping everything lowercase, we won't have to hit shift when navigating in terminal. It'll save us a tiny fraction of time, but the consistency will save us a lot of guessing.


<a name="default-names-for-files--folders"></a>
## Default names for files & folders

Let's use file & folder naming defaults that give students good practice.

###### Default HTML Filenames

```
index.html

- - or - -

index-01.html
index-02.html
index-03.html
```

###### Default CSS Folder & Filename
```
css/style.css
```

###### Default JS Folder & Filename
```
js/app.js
```

<a name="default-screenshots"></a>
## Default Screenshots

### Full Window Screenshots
Use a quick `cmd+shift+4` and hit `space` to **grab a Full Window screenshot** (in OS X). This will make all our screenshots have a similar shadow behind it.

### Use a common, neutral browser
Use an instance of **Chrome with all extensions and extras hidden**, except for the location bar.

![WDI repo](https://cloud.githubusercontent.com/assets/1327983/9769944/2a5bef4c-56fb-11e5-9ff0-646400749cc1.png)

_Figure 01. Example Screenshot_

### Scale it down to fit
Make sure the image is **no wider than 790px**, to try to keep it visible & readable in GitHub's style. Crop images that are taller than that down to something within that vicinity, so it doesn't totally overtake the readme. OS X's Preview is an easy way to scale images down.

### Let GitHub Store the Images
Rather than storing images in some folder in our lesson, **use [GitHub's Issue Attachment CDN](https://help.github.com/articles/issue-attachments/) to upload & link to images.** Essentially, pretend you're going to attach an image to a GitHub Issue, let it upload, and then copy & paste the CDN URL it gives and include that. There's a [detailed blog post here](http://solutionoptimist.com/2013/12/28/awesome-github-tricks/) to read more.

<a name="file-structure"></a>
## File Structure


### Readme In Every Folder

Every folder should have a readme.

That means that looking on GitHub, every folder will come with some explanation of what it is & what to do with it.

### Lowercase readme.md

Readmes should always be lowercased so we don't have to bother hitting shift, or worse, guessing whether it's uppercase, lowercase, or title case file names.

They should also always be markdown, with a `.md` extension. Just cuz it's shorter.

```
$ readme.md
```

### Folder Names When Including Code

**If a lesson needs nothing** but a readme, just include the readme & don't create any extra folders.

**If a lesson needs starter code**, code to get students up & running, focusing on the task at hand -  include a folder called `starter-code` with your readme.  If students require multiple files and folders - like a starter Rails app - create a subfolder within the `starter-code` that appropriately names the starter app.

```
- readme.md
- starter-code/
    - app-name/
        - index.html
        - css/
            - style.css
        - etc.
```

**If a lesson needs solution code**, or a completed example for students to later assess themselves, include a folder called `solution-code` with your readme.  If the solution requires multiple files and folders - like a finished Rails app - create a subfolder within the `solution-code` that appropriately names the solution app.

```
- readme.md
- starter-code/
  - app-name/
    - index.html
    - css/
        - style.css
    - etc.
- solution-code/
    - app-name/
        - index.html
        - css/
            - style.css
        - etc.
```


<!-- <a name="material-metadata"></a>
## Material Metadata

Each lesson should include some simple metadata at the top. This should be YAML frontmatter, which will let us use it like structured data later on.

<!-- ### YAML Frontmatter
We want to have as minimal information as necessary, but stuff that's still useful. And we like the idea of giving credit to the original creator of the lesson or lab.

We also want to include the type (lesson, lab) and any core competency categories this lesson covers. This will help us organize later.

```yaml
title: ListViews and ListAdapters - Bookshelf
type: lab
duration: "1:30"
creator:
    name: Drew Mahrt
    city: NYC
standards: Android technologies and services
```

*Please note that 1:30 means 1 hour and 30 minutes.*

### Lesson Timings

It's beneficial to have suggested timing in each lesson, it gives us an idea how long we might want to take on each section.

**Timing estimates should go in increments of 5 minutes.** That's small enough to have tiny pieces of a lesson, but still evenly calculable over the whole duration. Anything more specific will be too granular.

The timing should be included in each section heading. We'll talk about how to choose which level headings in the next section. **But timings are only necessary on H2s.** Here's an example:

```markdown
## Objects Can Inherit from Other Objects - Intro (10 mins.)
``` --> 

<a name="headings--text"></a>
## Headings & Text

Check out the example `template-lesson-readme.md` to see an empty template you can use as a starting point for creating new materials.

Here's some codified explanation of it.

### H1 for Lesson Title

There should be only one, so it should be the first thing in the markdown, and be an H1.

### H3 & UL for Learning Objectives

Learning Objectives are good practice for us make sure students are clear about what we're trying to teach them, and we stay on track with only the most important pieces of a topic. For the record, you should write these learning objectives on the wall when you go to teach this lesson.

The actual objectives should just be an unordered list.

### H3 & UL for Preparation

This is a section to help both students & instructors know what a student needs to know before they'll understand this lesson. These could be references to specific existing lessons in the curriculum, or they could just be concepts students need to know.

It might be useful to use this list as check-for-understanding questions before you dive too deep into new materials.

### H2 for Lesson content section titles

The actual content of the lesson is the most important thing, and using H2s gives us nice visual hierarchy for breaking our lesson up into sections.

Use as many sections as you see fit, and try to give them titles that give some hint of what we're about to talk about. They don't have to be catchy or witty (though you're welcome to make them both), but they should be _clear_.

### Break up paragraphs for easy reading

We want to make these documents scannable & easily readable. Every time you're talking about a new idea or concept, or you realize the sentence you're writing doesn't add on to the previous one – make it a new paragraph.

Err on the side of having too many paragraphs if possible, even if a paragraph is only one or two sentences. It'll be easier to read.

### Use triple-tick code blocks for highlighting on GitHub

Use triple-tick code blocks with languages to make code auto-syntax-highlighted.

    ```java
      Markdown.render 'stuff'
    ```

You can read more about it [here](https://help.github.com/articles/github-flavored-markdown/#syntax-highlighting) if you're unfamiliar.

### Test your markdown with GitHub Flavored Markdown

Test your code using the [GitHub markdown API endpoint](https://developer.github.com/v3/markdown/#render-an-arbitrary-markdown-document), or a tool that uses it, to make sure it's working.  Atom's markdown preview is fantastic.

<a name="contributing-materials"></a>
## Contributing Materials

See the [contributing guidelines](../contributing.md) for information on how to help!
