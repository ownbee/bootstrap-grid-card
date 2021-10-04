import { LitElement, html } from 'lit';
import buildConfig from './buildConfig';
import style from './style';
import { createCard } from "card-tools/src/lovelace-element";
import { hass } from "card-tools/src/hass";
import './initialize';


class BootstrapGridCard extends LitElement {
  setConfig(config) {
    this._config = buildConfig(config, this.config);
    this.cards = [];
  }

  static get styles() {
    return style;
  }

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  render() {
    return html`
    <div id="staging" class="${this._config.class}">
    </div>
    <style>
      ${this._config.custom_style}
    </style>
    `;
  }

  async updated(changedproperties) {
    if (!this.cards.length
      && (this._config.raw.cards && this._config.raw.cards.length)
    ) {
      // Build cards
      this.cards = await this.build_configured_cards();
      this.requestUpdate();
    }

    if (changedproperties.has("hass") && this.hass && this.cards) {
      // Update the hass object of every card in cards list (row cards excluded).
      for (const c of this.cards) {
        if (!c) continue;
        c.hass = this.hass;
      }
    }
  }

  async build_configured_cards() {
    // Clear out any cards in the staging area which might have been built but not placed
    const staging = this.shadowRoot.querySelector("#staging");
    while (staging.lastChild)
      staging.removeChild(staging.lastChild);

    return Promise.all(this.build_row(this._config.raw.cards, staging));
  }

  build_row(cards, parent) {
    let builtCards = Array();
    cards.forEach(card => {
      if (card.type === 'row' || card.type === 'col') {
        if (!card.cards) {
          console.error('A card of type "row" or "col" must have "cards" list!');
          return; // Continue
        }

        let defaultClass = card.type === 'row' ? 'row' : "col";
        let globalClass = card.type === 'row' ? this._config.global_row_class : this._config.global_col_class;
        let newEl = document.createElement("div");
        newEl.className = `${card.class || ''}${globalClass}`;
        if (!newEl.className.includes(defaultClass)) {
          newEl.className = `${defaultClass} ${newEl.className}`;
        }
        builtCards.push(...this.build_row(card.cards, newEl));
        parent.appendChild(newEl);
      } else {
          builtCards.push(this.build_card(parent, card));
      }
    });
    return builtCards;
  }

  async build_card(parent, card) {
    let colEl = document.createElement("div");
    const config = { ...card, ...this._config.raw.card_options };
    colEl.className = `${config.class || "col"}${this._config.global_col_class}`;
    const el = createCard(config);
    el.hass = hass();
    colEl.appendChild(el)
    parent.appendChild(colEl);
    return new Promise((resolve, reject) =>
      el.updateComplete
        ? el.updateComplete.then(() => resolve(el))
        : resolve(el)
    );
  }
}
if(!customElements.get('bootstrap-grid-card')) {
  customElements.define('bootstrap-grid-card', BootstrapGridCard);
}
