---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/setup/integration"
title: "Seed | Berry React"
---

As a company with years of experience in crafting templates, we have observed that users often struggle with utilizing all the components included in most admin templates. If you have ever downloaded an admin template, you may have found yourself asking questions such as,

> _**"How can I use components in the project?"**_

> _**"How can I create a new project and set up theme/components?"**_

> _**"Can I have minimal code-base to start?**_ _"_ etc.

If you ever found yourself in such a situation, we came here to the rescue.

Berry is designed with an extensive collection of ready-to-use components, each with a high degree of customization options, allowing for easy integration into any project. We've made sure to include as many components as possible to make your development process more efficient.

In this Integration guide, we are going to explain, how can you create new a project with minimum setup and integrate some components as per your need. so let's get started.

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/setup/integration\#get-started-with-seed)    Get started with Seed

When you purchase the Berry, it comes with a pre-defined structure, the **Seed** version, which allows you to start immediately. **The Seed folder directory is built using react-script, it includes minimal files from the full version to give you a head start.** It has all necessary dependencies preloaded in the package.json, so you don't have to worry about adding any additional ones unless needed. The Seed version includes a sample page, pre-configured routes, menus, styles, and settings, which can save you a significant amount of time in setting up a new project.

The seed version is available in the purchased package.

When you [run the project](https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/quick-start) using yarn/npm, you will see a minimal site like below:

![](https://codedthemes.gitbook.io/berry/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FflrTH6nspDenn8uPkVTP%2Fblobs%2FdKXXtc19RP18hOR6IGzJ%2Fscreenshot-2021-06-05-121623.png&width=768&dpr=4&quality=100&sign=7bbe9d93&sv=2)

Skeleton in action

It provides you with a very simple and intuitive structure to get started with a new project. You can add new components from the full version. Now let's see how can we do that.

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/setup/integration\#add-components-into-seed-new-project)    Add components into seed/new project

Now, let's add some cool components from the full version of the project which we just created. It will help you to craft your pages as per your need. So Let's begin:

Consider a scenario that you want to add `TotalEarning` widget (Left card on default dashboard) from the full version default dashboard to the sample page. For that, we need to do the following things in order.

1. Remove content inside `<MainCard>` from sample-page/index.js.

2. Copy file `src/views/dashboard/Default/EarningCard.js` to `Sample` folder. **Resolves path and asset dependencies by copying missing assets from the full version.**

3. You will have the following final version of `sample/index.js`


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
const SamplePage = () => {
    return (
        <MainCard title="Sample Card">
            <EarningCard></EarningCard>
        </MainCard>
    );
};

export default SamplePage;
```

The output of this will be following:

![](https://codedthemes.gitbook.io/berry/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FflrTH6nspDenn8uPkVTP%2Fblobs%2FzUyGclsi5uMzjGdOvVqi%2Fscreenshot-2021-06-05-150007.png&width=768&dpr=4&quality=100&sign=f91806e2&sv=2)

Not looked pretty right, that is because the card is spread around all 12 columns, we need to limit it to specific columns. Change code as follows by adding [material-ui grid system](https://material-ui.com/components/grid/#grid):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
const SamplePage = () => {
    return (
        <MainCard title="Sample Card">
            <Grid container>
                <Grid item xs={3}>
                    <EarningCard></EarningCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default SamplePage;
```

It will output as following:

![](https://codedthemes.gitbook.io/berry/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FflrTH6nspDenn8uPkVTP%2Fblobs%2FeSRUmzKSY0kQWd2TWKrq%2Fscreenshot-2021-06-05-150544.png&width=768&dpr=4&quality=100&sign=1c209558&sv=2)

Cool and straightforward, right?

You can do the same for other components and design your pages as per your needs. We have made common and reusable controls as well which you can see inside `/src/ui-component`. Feel free to refer to those as well and start developing your page.

I hope, we cover some basics to get started with the Berry template and how to integrate it for your new project.

Last updated 1 year ago

Was this helpful?