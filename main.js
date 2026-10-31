import { Button, ButtonDefinition } from '@fluentui/web-components/button/index.js';
import { setTheme } from '@fluentui/web-components/theme/index.js';
import { webLightTheme } from '@fluentui/tokens';

setTheme(webLightTheme);
await Button.define(ButtonDefinition);

for (const name of ['native', 'fluent']) {
  const form = document.getElementById(`${name}-form`);
  const button = form.querySelector('button, fluent-button');
  const log = document.getElementById(`${name}-log`);

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Keep the page open; record that submission was attempted.
    log.textContent += 'submit fired (unexpected)\n';
  });

  button.addEventListener('click', (event) => {
    event.preventDefault(); // This should prevent the form's submit event entirely.
    log.textContent += 'click: preventDefault()\n';
  });

  button.disabled = false;
}
