---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/setup/to-existing-project"
title: "To Existing Project | Berry React"
---

Frequently, our customers express a desire to integrate Berry themes into their existing projects rather than initiating new ones. This presents a unique challenge since each project comes with its own distinct architecture and structure. In order to address this challenge, we have taken the initiative to select a free project from MUI and have undertaken the task of seamlessly integrating Berry into it.

**Existing Project that we picked:**

Dashboard: [https://mui.com/material-ui/getting-started/templates/](https://mui.com/material-ui/getting-started/templates/)

Live Preview [:](https://mui.com/material-ui/getting-started/templates/dashboard/) [https://mui.com/material-ui/getting-started/templates/dashboard/](https://mui.com/material-ui/getting-started/templates/dashboard/)

In this guide, we are going to apply the Berry theme to the above project step by step.

Project structures vary widely, making a universal guide unfeasible. To assist, we've selected an MUI project as a foundational reference. Clients can leverage this as a starting point, customizing integration as necessary. However, please note this isn't a strict template to be replicated.

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/setup/to-existing-project\#steps-to-follow)    Steps to follow

1. **Backup Your Project:** Before making any changes, create a backup of your existing project to ensure you can revert back in case anything goes wrong.

2. **Install** _**dependencies**_ **and** _**development dependencies:**_ To install a list of dependencies and devDependencies in an existing project using npm or Yarn, follow these steps:



1. **Review package.json**: Before adding dependencies, it's a good idea to review your project's package.json file to check for any existing dependencies and devDependencies. You can either move or add the following packages:

2. **Review package.json**: Before adding dependencies, it's a good idea to review your project's package.json file to check for any existing dependencies and devDependencies. You can either move or add the following packages:



1. Dependencies



- @emotion/react

- @emotion/styled

- @mui/icons-material

- @mui/lab

- @mui/material

- lodash


2. DevDependencies



- @types/lodash

- sass

- @babel/plugin-proposal-private-property-in-object


3. **Migrate theme to your project:** The following files/folders need to move to your project to achieve Berry theming



1. **Context**



We need to move ConfigContext to have theme property context like theme color, font, etc.



- Source Path: _full-version\\src\\contexts\\ConfigContext.tsx_

- Destination Path: _src\\contexts\\ConfigContext.tsx_


2. **Hooks**



Hooks can be used to access values of the theme and localStorage throughout the project. Two hooks needed to be copied.



- Source Path:



- _full-version\\src\\hooks\_ useConfig.ts

- _full-version\\src\\hooks\_ useLocalStorage.ts


- Destination Path:



- _src\\hooks\_ useConfig.ts

- _src\\hooks\_ useLocalStorage.ts


3. **Themes**



This is the main directory to achieve themes. You need to copy the entire directory to the destination.



- Source Path: _full-version\\src\\themes_

- Destination Path: _src\\themes_


4. **Types**



Types related to the theme needed to move as well to avoid errors in the compilation. Not all types are needed but only the following:



- Source Paths:



- _full-version\\src\\types\\overrides - Entire directory_

- _full-version\\src\\types\\config.ts_

- _full-version\\src\\types\\default-theme.ts_

- _full-version\\src\\types\\index.ts_


- Destination Paths:



- _src\\types\\overrides_

- _src\\types\\config.ts_

- _src\\types\\default-theme.ts_

- _src\\types\\index.ts_


5. **Config**



The default configuration of the theme.



- Source Path: _full-version\\src\\config.ts_

- Destination Path: _src\\config.ts_


6. **TSConfig**



Configuration related to typescript. Mainly to set ' **baseUrl**' but you can also copy an entire file if you need.



- Source Path: _**tsconfig.json**_

- Destination Path: _tsconfig.json_


4. **Setup App page:** Once you migrate the files mentioned in the above steps, you need to set up the App component so that linking can be set between the theme and the app. Do the following in the destination project:


App.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import ThemeCustomization from 'themes';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <ThemeCustomization>
      <Dashboard />
    </ThemeCustomization>
  );
}

export default App;
```

That's all you need to follow and your project is ready with the Berry theme.

* * *

Following is the live preview for an existing project where we followed the above steps and applied a theme, you can compare it with the existing theme and see the differences:

Live Preview (With Berry Theme): [https://berrydashboard.io/react/existing\_theme\_integration/](https://berrydashboard.io/react/existing_theme_integration/)

Live Preview (Without Berry Theme): [https://mui.com/material-ui/getting-started/templates/dashboard/](https://mui.com/material-ui/getting-started/templates/dashboard/)

You can see that app bar and a few other changes have been visible there. We have also added some additional components on the main page to showcase the Mantis theme on that component.

![](https://codedthemes.gitbook.io/berry/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FflrTH6nspDenn8uPkVTP%2Fblobs%2FJ8GkpSK2wcyow9z7nRMI%2FBanner1.png&width=768&dpr=4&quality=100&sign=922d696a&sv=2)

Comparison between Applied Berry Theme (Left) & default theme (Right side)

![](https://codedthemes.gitbook.io/berry/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FflrTH6nspDenn8uPkVTP%2Fblobs%2F7PEKP6CfIij1pKyCAwi4%2FSS.png&width=768&dpr=4&quality=100&sign=4ce62825&sv=2)

Applied Berry theme on components

Last updated 1 year ago

Was this helpful?