# [Styled Components](https://www.npmjs.com/package/styled-components)

Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS, **`styled-components`** allows you to write actual CSS code to style your components. It also removes the mapping between components and styles – using components as a low-level styling construct could not be easier!

**Syntax:**

```
const Button = styled.button`
  color: grey;
`;
```

Alternatively, you may use style objects. This allows for easy porting of CSS from inline styles, while still supporting the more advanced `styled-components` capabilities like component selectors and media queries.

```
const Button = styled.button({
  color: 'grey',
});
```

`styled-components` is compatible with both React (for web) and React Native – meaning it's the perfect choice even for truly universal apps! See the [documentation about React Native](https://www.styled-components.com/docs/basics#react-native) for more information.

---

# Using styled-components

There are two syntaxes to style a component using `styled-components`. In the examples below we will style by selecting the `button` tag element.

Any component that is styled using `styled-components` can be styled using either of the two syntaxes:-

## Styling by selecting the HTML element

1. Using the `styled` function with \``\ template literal.

   ```
   import styled from 'styled-components';

   const Button = styled.button`
       color: white;
       background-color: red;
       border-radius: 4px;
       padding: 8px 16px;
       &:hover {
         background-color: dark-red;
       }
   `;
   ```

2. Using the `styled` function with \({})\ style object.

   ```
    import styled from 'styled-components';

    const Button = styled.button(
        {
            color: 'white',
            backgroundColor: 'red',
            borderRadius: '4px',
            padding: '8px 16px',
            '&:hover': {
                backgroundColor: 'dark-red',
            }
        }
    );
   ```

## Styling a React component

1. Using the `styled` function with \``\ template literal.

   ```
   import styled from 'styled-components';

   const UrsaButton = (props) => (
       <button onClick={props.onClick}>
           Click me!
       </button>
   );

   const Button = styled(UrsaButton)`
       color: white;
       background-color: red;
       border-radius: 4px;
       padding: 8px 16px;
       &:hover {
            background-color: 'dark-red',
        }
   `;
   ```

2. Using the `styled` function with \({})\ style object.

   ```
    import styled from 'styled-components';

    const UrsaButton = (props) => (
        <button onClick={props.onClick}>
            Click me!
        </button>
    );

    const Button = styled(UrsaButton)(
        {
            color: 'white',
            backgroundColor: 'red',
            borderRadius: '4px',
            padding: '8px 16px',
            '&:hover': {
                backgroundColor: 'dark-red',
            }
        }
    );
   ```

---

# ThemeProvider

We can provide a theme to styled components using the `ThemeProvider` component.

**in `App.js`**

```
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#003333',
  },
};

// Wrap the entire app with the ThemeProvider component and pass the theme as a prop to the component.

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Header />
        <Container>
          <h1>Hello World</h1>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default App;
```

in **`Header.js`**

```
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header}; // Access theme as a prop directly.
  padding: 40px 0;
`;

const Header = () => {
  return (
    <StyledHeader>
      <h1>Hubble</h1>
    </StyledHeader>
  );
};

export default Header;
```

---

# Global Styles

Global styles are helpful when the same styles are supposed to load on every page. For example, you may want to style the header and footer of every page, the exact same way / have a base style. In a normal React application, we usually have an `index.css` file that contains all the global styles and is loaded at start of the app. Using styled components, we can achieve the same thing with a same file. Let's call it `globalstyles.js`.

- In **`globalstyles.js`**

```
import { GlobalStyles } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #fafafa;
  }
`;

export default GlobalStyles;
```

- In **`App.js`**, import and use it as a GlobalStyles self-closing component.

```
import GlobalStyles from 'components/globalstyles';

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#003333',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <Container>
          <h1>Hello World</h1>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default App;
```

Now we can use the default theme settings in the global styles (but we can also override them in individual components). For example we want to set the header background color to `#ebfbff` and the body background color to `#fff` globally we can do it as follows:-

In **`globalstyles.js`**

```
import { GlobalStyles } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    * {
        box-sizing: border-box;
    }
    body {
        background-color: ${({ theme }) => theme.colors.body};
    }
    header {
        background-color: ${({ theme }) => theme.colors.header};
    }
`;

export default GlobalStyles;
```

This setup is useful as now the theme colours can be changed globally using dynamic values. For instance, on a toggle switch, we can switch colours to dark mode.

---

# References

1. [Styled Components](https://www.styled-components.com/)
2. [Emotion](https://emotion.sh) - An upgrade on Styled Components, leaner, meaner, faster, and more powerful.
