import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class DaliToggle extends LitElement {
  static properties = {
    isDarkMode: { type: Boolean } // Eigenschaft für Dark Mode
  };

  constructor() {
    super();
    this.isDarkMode = this.loadDarkMode(); // Dark Mode aus localStorage laden
    this.updateBodyClass();
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      font-family: sans-serif;
      transition: background 0.3s, color 0.3s;
    }

    .light {
      background: #ffeb3b;
      color: #333;
    }

    .dark {
      background: #2d2d2d;
      color: #ffeb3b;
    }

    button {
      margin-top: 10px;
      padding: 8px 12px;
      font-size: 16px;
      border: none;
      cursor: pointer;
      background: #222;
      color: #fff;
      border-radius: 12px;
      transition: background 0.3s, filter 0.3s;
    }

    button:hover {
      background: #444;
      filter: blur(1.5px);
    }
  `;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode; // Dark Mode umschalten
    this.updateBodyClass();
    this.saveDarkMode(); // Zustand speichern
  }

  updateBodyClass() {
    if (this.isDarkMode) {
      document.body.style.background = "#2d2d2d";
      document.body.style.color = "#ffeb3b";
    } else {
      document.body.style.background = "#f8f8f8";
      document.body.style.color = "#333";
    }
  }

  saveDarkMode() {
    localStorage.setItem('dali-toggle-dark-mode', JSON.stringify(this.isDarkMode));
  }

  loadDarkMode() {
    return JSON.parse(localStorage.getItem('dali-toggle-dark-mode')) || false;
  }

  render() {
    return html`
      <div class=${this.isDarkMode ? 'dark' : 'light'}>
        <h1>${this.isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</h1>
        <button @click=${this.toggleDarkMode}>
          ${this.isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    `;
  }
}

customElements.define('dali-toggle', DaliToggle);

export default DaliToggle;
