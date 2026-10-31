# Fluent button click cancellation bug

A standalone HTML/JavaScript reproduction using Fluent Web Components **3.1.3** and FAST Element
**3.1.0**. Vite serves the page.

## Run

From this directory, using Node `^22.22.3` or `^24.15.0`:

```bash
npm ci
npm start
```

Open http://127.0.0.1:5173/. Stop any other reproduction using that port first.

## Reproduce

Click each submit button. Both have a click handler that calls `event.preventDefault()`.

Expected: neither form fires a submit event. Each log contains only:

```text
click: preventDefault()
```

Actual: the native button behaves as expected, but the Fluent button logs:

```text
submit fired (unexpected)
click: preventDefault()
```

The form's submit event fires before the Fluent button's click handler can cancel the action.
The submit listeners also call `preventDefault()` to stop navigation and preserve the logs;
they do not prevent the submit event from being fired. Reload to clear the logs.

## Suspected upstream cause

Fluent's `clickHandler` calls `press()` synchronously, which calls `submitForm()` and
`form.requestSubmit()`. This happens before the application's normal click listener runs.

Copy this directory to share it independently. `npm run build` builds the reproduction.
