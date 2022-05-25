# CSS Animations

Basic CSS Setup before doing animations

```
body {
    background: #333;
    width: 100%;
}
.box {
    background: white;
    width: 200px;
    height: 200px;
    position: relative;

    /* Animation goes here */

    animation-name: customAnimation;
    animation-duration: 4s
}

@keyframes customAnimation {
    0% {
        background-color: white;
        left: 0;
    }
    25% {
        background-color: red;
        right: 0;
    }
    50% {
        bottom: 0;
        right: 0;
        background-color: green;
    }
    75% {
        bottom: 0;
        left: 0;
        background-color: blue;
    }
    100% {
        left: 0;
        top: 0;
        background-color: white;
    }
}
```

---

# Animation properties

| Property             | Syntax                            | Function                                                                        |
| -------------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| `animation-name`     | `animation-name: <animationName>` | Declares a name to refer with keyframes.                                        |
| `animation-duration` | `animation-duration: 200ms`       | Sets the duration for the animation<br>Can either be in seconds or miliseconds. |
| `@keyframes`         | `@keyframes animationName`        |
