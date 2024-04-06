import { css } from 'lit';
import bootstrapGridStyle from 'bootstrap/dist/css/bootstrap-grid.css';

const style = [bootstrapGridStyle, css`
    * {
        // Use home-assistant default (initial = unset) on the following:
        --ha-card-box-shadow: initial;
        --ha-card-border-radius: initial;
        --ha-card-border-width: initial;
    }
    :host {
        box-sizing: border-box;
    }
    ha-card {
        padding: 0;
    }
    `];

export default style;
