class DaliToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.isDarkMode = JSON.parse(localStorage.getItem("dali-toggle-dark")) || false;
    this.updateBodyClass();

    this.button = document.createElement("button");
    this.updateButtonStyle();

    this.button.textContent = this.isDarkMode ? "☀️" : "🌙";
    this.button.title = this.isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";

    this.button.addEventListener("click", () => this.toggleDarkMode());
    this.shadowRoot.append(this.button);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.button.textContent = this.isDarkMode ? "☀️" : "🌙";
    this.button.title = this.isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
    this.updateBodyClass();
    this.updateButtonStyle();
    localStorage.setItem("dali-toggle-dark", JSON.stringify(this.isDarkMode));
  }

  updateBodyClass() {
    document.body.style.background = this.isDarkMode ? "#2d2d2d" : "#f8f8f8";
    document.body.style.color = this.isDarkMode ? "#ffeb3b" : "#333";
  }

  updateButtonStyle() {
    this.button.style.cssText = `
      width: 54px; height: 54px;
      border-radius: 50%;
      border: none; cursor: pointer;
      font-size: 24px; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, background 0.3s;
      background: ${this.isDarkMode ? "#1c1c1c" : "#007bff"};
    `;
  }
}

customElements.define("dali-toggle", DaliToggle);
