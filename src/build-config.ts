import { BootstrapGridCardConfig, BuiltCardConfig } from "./types";

export default (config: BootstrapGridCardConfig): BuiltCardConfig => {
  if (!config.cards || !config.cards.length)
    throw new Error('No cards configured!');

  let use_hass_style_gutter = config.use_hass_style_gutter ? config.use_hass_style_gutter : true;
  let hass_style_gutter_size = config.hass_style_gutter_size ? config.hass_style_gutter_size : "4px";
  hass_style_gutter_size = hass_style_gutter_size.replace(';', '');
  let style = ""
  if (use_hass_style_gutter) {
    style += `
    .row {
      margin-top: 0px !important;
      margin-bottom: 0px !important;
      margin-right: 0px !important;
      margin-left: 0px !important;
    }
    .col, [class^="col-"] {
      padding-top: ${hass_style_gutter_size} !important;
      padding-bottom: ${hass_style_gutter_size} !important;
      padding-right: ${hass_style_gutter_size} !important;
      padding-left: ${hass_style_gutter_size} !important;
    }
    `;
  }

  style += `
  #staging {
    ${config.container_padding ? `padding: ${config.container_padding} !important;` : ""}
    box-sizing: border-box;
  }
  `


  const conf: BuiltCardConfig = {
    custom_style: style,
    global_row_class: config.global_row_class ? ` ${config.global_row_class}` : "",
    global_col_class: config.global_col_class ? ` ${config.global_col_class}` : "",
    class: config.class || 'container-fluid',
    raw: { ...JSON.parse(JSON.stringify(config)) },
  };

  return conf;
};
