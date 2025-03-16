import { LitElement, html, css } from 'lit';

class JsonTaxoViewer extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: Arial, sans-serif;
      border: 1px solid #ccc;
      padding: 10px;
      max-width: 400px;
    }
    .source {
      display: flex;
      gap: 5px;
      margin-bottom: 10px;
    }
    .tree-container {
      flex-grow: 1;
      overflow-y: auto;
      max-height: 300px;
      border: 1px solid #ddd;
      padding: 5px;
    }
    .node {
      cursor: pointer;
      padding: 5px;
      margin-left: 10px;
    }
    .node:hover {
      background: #f0f0f0;
    }
    .value-field {
      margin-top: 10px;
      padding: 5px;
      border: 1px solid #ddd;
      background: #fafafa;
      min-height: 40px;
    }
  `;

  static properties = {
    data: { type: Object },
    selectedValue: { type: String },
  };

  constructor() {
    super();
    this.data = null;
    this.selectedValue = '';
  }

  async loadJsonFromUrl(event) {
    const url = event.target.value;
    if (!url) return;
    try {
      const response = await fetch(url);
      this.data = await response.json();
      this.requestUpdate();
    } catch (error) {
      console.error('Failed to load JSON:', error);
    }
  }

  onFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        this.data = JSON.parse(reader.result);
        this.requestUpdate();
      } catch (error) {
        console.error('Invalid JSON file:', error);
      }
    };
    reader.readAsText(file);
  }

  onNodeClick(path, value) {
    this.selectedValue = JSON.stringify(value, null, 2);
  }

  renderTree(data, path = '') {
    if (typeof data !== 'object' || data === null) {
      return html`<div class="node" @click="${() => this.onNodeClick(path, data)}">📄 ${data}</div>`;
    }
    return html`
      ${Object.keys(data).map(
        key => html`
          <details>
            <summary class="node" @click="${() => this.onNodeClick(path + '.' + key, data[key])}">📂 ${key}</summary>
            <div>${this.renderTree(data[key], path + '.' + key)}</div>
          </details>`
      )}
    `;
  }

  render() {
    return html`
      <div class="source">
        <input type="file" @change="${this.onFileUpload}" />
        <input type="text" placeholder="JSON URL" @change="${this.loadJsonFromUrl}" />
      </div>
      <div class="tree-container">
        ${this.data ? this.renderTree(this.data) : html`<p>Load a JSON file or enter a URL</p>`}
      </div>
      <div class="value-field">${this.selectedValue}</div>
    `;
  }
}

customElements.define('json-taxo-viewer', JsonTaxoViewer);
