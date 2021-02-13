import { css } from 'lit-element';
import bootstrapGridStyle from 'bootstrap/dist/css/bootstrap-grid.css';

const style = [bootstrapGridStyle, css`
    :host {
        box-sizing: border-box;
    }
    ha-card {
        padding: 0;
    }
    `];

export default style;

