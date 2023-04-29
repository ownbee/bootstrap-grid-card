import { LovelaceCardConfig } from 'custom-card-helpers';


export interface BootstrapGridCardConfig extends LovelaceCardConfig {
    name?: string;
    cards?: LovelaceCardConfig[];
    class?: string;
    use_hass_style_gutter?: boolean;
    hass_style_gutter_size?: string;
    container_padding?: string;
    global_row_class?: string;
    global_col_class?: string;
}

export interface BuiltCardConfig {
    custom_style: string;
    global_row_class: string;
    global_col_class: string;
    class: string;
    raw: BootstrapGridCardConfig
}