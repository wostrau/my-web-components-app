class Tooltip extends HTMLElement {
    constructor() {
        super();
        // this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = 'Some dummy tooltip text.';
        this.attachShadow({ mode: 'open' });
        // const template = document.querySelector('#tooltip-template');
        // this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    top: 2rem;
                    left: 0.75rem;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0, 0.26)
                }
                :host {
                    position: relative;
                }
                :host(.important) {
                    background: var(--color-primary);
                }
                :host-context(p) {
                    font-weight: bold;
                }
                .highlight {
                    background-color: red;
                }
                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }
                .icon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Some Default</slot>
            <span class='icon'>?</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        // const tooltipIcon = document.createElement('span');
        // tooltipIcon.textContent = ' (?)';

        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

        // this.shadowRoot.appendChild(tooltipIcon);
        // this.style.position = 'relative';

        this._render();
    }

    attributeChangeCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');

        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();

        // this._tooltipContainer = document.createElement('div');
        // this._tooltipContainer.textContent = this._tooltipText;
        // this.shadowRoot.appendChild(this._tooltipContainer);

        // this._tooltipContainer.style.backgroundColor = 'black';
        // this._tooltipContainer.style.color = 'white';
        // this._tooltipContainer.style.position = 'absolute';
        // this._tooltipContainer.style.zIndex = '10';
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();

        // this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('aa-tooltip', Tooltip);