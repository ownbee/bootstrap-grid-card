[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

bootstrap-grid-card
===================

Do you love [booststrap grid system](https://getbootstrap.com/docs/5.0/layout/grid/) or are just
looking for a way to get control over lovelace layout on all your platforms? Then this card is for
you.

This card loads `bootstrap-grid.css` into lovelace and provides an easy way of configuring cards
with different bootstrap classes in yaml. With bootstrap you can configure cards to take up
different size depending on screen size:

![](lovelace.gif)

## Install

1. Add `https://github.com/idittansikte/bootstrap-grid-card` to *custom repositories* in HACS
   (*HACS* -> *Frontend* -> (...) -> *Custom repositories*).
2. Add card to resources:

    ```yaml
    resources:
      - type: module
        url: /hacsfiles/bootstrap-grid-card/bootstrap-grid-card.js
    ```
3. Follow instructions in HACS.

> Alternatively follow instructions further down under "Development".

## Usage

First of all, if you don't know how to use [booststrap grid
system](https://getbootstrap.com/docs/5.0/layout/grid/), I strongly suggest you to read about it
before continuing. This guide will not repeat that concept.

Simple example configuration:

```yaml
title: My view
panel: true  # !!!!!
cards:
  - type: "custom:bootstrap-grid-card"
    cards:
       - type: row
         cards:
            - type: button
              class: "col-3"
              <...>
            - type: button
              class: "col-9"
              <...>
       - type: row
         class: "justify-content-md-center"
         cards:
            - type: entity
              class: "col-6"
              <...>
```

> Note: `panel: false` is not tested and probably not what you want.


## Options

```yaml
# [Required, type: string]
type: custom:bootstrap-grid-card
# [Required, type: list]
#
# List of cards.
cards:
# [Optional, type: string, default: 'container-fluid']
#
# Class of the div that surrounds the grid.
class: "container-fluid"
# [Optional, type: bool, default: True]
#
# Use paddings and margins on rows and columns that looks like Lovelace default
# style. If set to *False*, you'll get whatever bootstrap uses as default.
use_hass_style_gutter: True
# [Optional, type: string, default: "4px"]
#
# Custom space between cards. Only used if 'use_hass_style_gutter' is enabled.
hass_style_gutter_size: "4px"
# [Optional, type: string, default: Whatever bootstrap sets]
#
# Custom padding of the container.
container_padding:
# [Optional, type: string, default: ""]
#
# String that will be appended to all rows class attribute.
global_row_class: ""
# [Optional, type: string, default: ""]
#
# String that will be appended to all columns class attribute.
global_col_class: ""
```

## Custom cards: Rows and columns

The bootstrap-grid-card provides two custom card types: `row` and `col` to be used in the `cards`
list of `bootstrap-grid-card`, `row` and `col` card.

The `type: row` and `type: col` card will wrap their `cards` list in a div with the `row` and `col`
class respectively.

A normal card (e.g. `type: button`) in the `cards` list of `row` or `col`, will always get the class
`col*`. So there is no need of adding a `type: col` around a single card.


### Row options

```yaml
# [Required, type: string]
type: row
# [Optional, type: string]
#
# Class attribute of this column. Will always have the 'row' class which can't
# be overridden.
# Example: "justify-content-center"
class:
# [Required, type: list]
#
# List of cards.
cards:
```

### Column options

```yaml
# [Required, type: string]
type: col
# [Optional, type: string]
#
# Class attribute of this column.
# Example: "col-xs-12 col-sm-5 col-md-4 col-lg-3"
class:
# [Required, type: list]
#
# List of cards.
cards:
```

## Nesting rows and columns

It is possible to nest rows and columns any number of times as long there are no
non-`bootstrap-grid-card`´s in between. For example, it will not work if you put a `row` card in a
`horizontal-stack` card.

More advanced example:

```yaml
  # ...
  - type: row
    class: justify-content-md-center
    cards:
      - type: button
        class: "col-xs-12 col-sm-12 col-md-6 col-lg-5"
        # ...
      - type: vertical-stack
        class: "col-xs-12 col-sm-12 col-md-3 col-lg-3"
        cards:
          - type: sensor
            # ...
          - type: sensor
            # ...
      - type: col # Nesting start
        class: "col-xs-12 col-sm-12 col-md-3 col-lg-3"
        cards:
          - type: row
            cards:
              - type: thermostat
                # Use default class "col".
                # ...
              - type: markdown
                # Use default class "col".
                # ...

```

## Development

```bash
# First time to install all deps
npm install

# Build card
npm run build

# Copy to home assistance www folder
cp dist/bootstrap-grid-card.js <home_assistant>/config/www/bootstrap-grid-card.js

# In lovelace UI: clear cache, reload resources and reload page
```
