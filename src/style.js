import { css } from 'lit-element';
import bootstrapGridStyle from 'bootstrap/dist/css/bootstrap-grid.css';

const style = [bootstrapGridStyle, css`
    :host {
        display: flex;
        //flex-direction: column;
    }
    .container-fluid {
        padding-right: 0px;
        padding-left: 0px;
        margin: 0px;
    }
    .row {
        margin-top: 0px;
        margin-bottom: 0px;
        margin-right: 0px;
        margin-left: 0px;
    }
    .col, [class^="col-"] {
        padding-top: 4px;
        padding-bottom: 4px;
        padding-right: 4px;
        padding-left: 4px;
    }
    `];

export default style;