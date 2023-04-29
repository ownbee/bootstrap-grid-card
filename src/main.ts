import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";
import { LitElement, PropertyValues, TemplateResult, html } from 'lit';
import { } from 'lit-element';
import { property, state } from 'lit/decorators.js';
import buildConfig from './build-config';
import style from './style';
import { BootstrapGridCardConfig, BuiltCardConfig } from "./types";
import { CARD_VERSION } from './version';


console.info(
  `%c  BOOTSTRAP-GRID-CARD  \n%c  Version ${CARD_VERSION}        `,
  'color: white; font-weight: bold; background: #563d7c',
  'color: #563d7c; font-weight: bold; background: white',
);


class BootstrapGridCard extends LitElement {

  @property() public hass?: HomeAssistant;
  @state() private _config?: BuiltCardConfig;
  @property() private _helpers?: any;
  @property() private _cards?: LovelaceCard[];
  @property() private _tree?: Element;

  public setConfig(config: BootstrapGridCardConfig) {
    this._config = buildConfig(config);

    this.load();
  }

  private async load(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();

    if (!this._helpers) {
      console.error("Failed to load custom card helpers from Home Assistant");
      return;
    }

    this._tree = document.createElement('div');
    this._cards = this.build_configured_cards(this._config!, this._tree);
  }

  static get styles() {
    return style;
  }

  protected render(): TemplateResult {
    if (!this._config || !this._tree) {
      return html``;
    }

    return html`
      <div id="staging" class="${this._config.class}">
        ${this._tree}
      </div>
      <style>
        ${this._config.custom_style}
      </style>
    `;
  }

  async updated(changedproperties: PropertyValues) {
    super.updated(changedproperties);

    if (changedproperties.has("hass") && this.hass && this._cards) {
      // Update the hass object of every card in cards list (row cards excluded).
      for (const c of this._cards) {
        if (!c) continue;
        c.hass = this.hass;
      }
    }
  }

  private build_configured_cards(config: BuiltCardConfig, root: Element) {
    if (!config!.raw.cards) {
      return;
    }
    return this.build_row(config.raw.cards, root);
  }

  private build_row(cards: LovelaceCardConfig[], parent: Element) {
    let builtCards = Array();
    cards.forEach(card => {
      if (card.type === 'row' || card.type === 'col') {
        if (!card.cards) {
          console.error('A card of type "row" or "col" must have "cards" list!');
          return; // Continue
        }

        let defaultClass = card.type === 'row' ? 'row' : "col";
        let globalClass = card.type === 'row' ? this._config!.global_row_class : this._config!.global_col_class;
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

  private build_card(parent: Element, card: LovelaceCardConfig) {
    let colEl = document.createElement("div");
    const config = { ...card, ...this._config!.raw.card_options };
    colEl.className = `${config.class || "col"}${this._config!.global_col_class}`;
    const el = this._helpers.createCardElement(config);
    el.hass = this.hass;
    colEl.appendChild(el);
    parent.appendChild(colEl);
    return el;
  }

  private _createCardElement(config: LovelaceCardConfig) {
    const element = this._helpers.createCardElement(config) as LovelaceCard;
    if (this.hass) {
      element.hass = this.hass;
    }
    element.addEventListener(
      "ll-rebuild",
      (ev) => {
        ev.stopPropagation();
        this._rebuildCard(element, config);
      },
      { once: true }
    );
    return element;
  }

  private _rebuildCard(
    cardElToReplace: LovelaceCard,
    config: LovelaceCardConfig
  ): void {
    const newCardEl = this._createCardElement(config);
    if (cardElToReplace.parentElement) {
      cardElToReplace.parentElement.replaceChild(newCardEl, cardElToReplace);
    }
    this._cards = this._cards!.map((curCardEl) =>
      curCardEl === cardElToReplace ? newCardEl : curCardEl
    );
  }
}

if (!customElements.get('bootstrap-grid-card')) {
  customElements.define('bootstrap-grid-card', BootstrapGridCard);
}
