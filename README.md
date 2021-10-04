[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)
[![Stable](https://img.shields.io/github/release/idittansikte/bootstrap-grid-card.svg)](https://github.com/idittansikte/bootstrap-grid-card/releases/latest)
[![Community Forum](https://img.shields.io/badge/community-forum-brightgreen.svg)](https://community.home-assistant.io/t/lovelace-bootstrap-grid-card/274738)

bootstrap-grid-card
===================

Are you looking for a way to get control over your lovelace layout on all your platforms with a
small configuration footprint? Or maybe just a fan of [booststrap grid
system](https://getbootstrap.com/docs/5.1/layout/grid/)? Then this card is for you.

I wanted a very specific layout on my wall-mounted tablet to fit everything I needed without having
to scroll too much. When I had made that, the same layout became unusable on my phone and very
unoptimal on my big PC screen. I did not want to maintain multiple views that basically provided the
same things but with a different layouts and I could not find any existing solution that was simple
and enough customizable.

This card loads `bootstrap-grid.css` into lovelace and provides an easy way of configuring cards
with different bootstrap grid classes in yaml. With bootstrap you can configure cards to take up
different size depending on screen size:

![](lovelace.gif)

## Installation

### HACS (recommended)

This card is available in [HACS](https://hacs.xyz/) (Home Assistant Community Store).
<small>_HACS is a third party community store and is not included in Home Assistant out of the box._</small>

This card should pop up if you search for "*bootstrap-grid-card*" in HACS.

### Manual install

1. Download and copy `bootstrap-grid-card.js` from [latest
   release](https://github.com/idittansikte/bootstrap-grid-card/releases/latest) into your
   `config/www` directory.

2. Add card to resources:

    ```yaml
    resources:
      - type: module
        url: /local/bootstrap-grid-card.js
    ```

> Alternatively follow instructions further down under "Development".

## Usage

First of all, if you don't know how to use [booststrap grid
system](https://getbootstrap.com/docs/5.1/layout/grid/), I strongly suggest you to read about it
before continuing. This guide will assume the reader has basic knowledge of bootstrap grids.

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

# List of cards.
#
# [required, type: list]
cards:

# Class of the div that surrounds the grid.
#
# [optional, type: string, default: 'container-fluid']
class: "container-fluid"

# Use paddings and margins on rows and columns that looks like Lovelace default
# style. If set to *False*, you'll get whatever bootstrap uses as default.
#
# [optional, type: bool, default: True]
use_hass_style_gutter: True

# Custom space between cards. Only used if 'use_hass_style_gutter' is enabled.
#
# [optional, type: string, default: "4px"]
hass_style_gutter_size: "4px"

# Custom padding of the container (panel).
#
# [optional, type: string, default: Whatever bootstrap sets]
container_padding:

# String that will be appended to all rows class attribute.
#
# [optional, type: string, default: ""]
global_row_class: ""

# String that will be appended to all columns class attribute.
#
# [optional, type: string, default: ""]
global_col_class: ""
```

## Rows and columns

The bootstrap-grid-card provides two custom card types: `row` and `col` to be used in the `cards`
list of `bootstrap-grid-card`, `row` and `col` card.

The `type: row` and `type: col` card will wrap their `cards` list in a div with the `row` and `col`
class respectively.

A normal card (e.g. `type: button`) in the `cards` list of `row` or `col`, will always get the class
`col*`. So there is no need of adding a `type: col` around a single card.


### Row options

```yaml
# [required, type: string]
type: row

# Class attribute of this column. Will always have the 'row' class which can't
# be overridden.
#
# Example: "justify-content-center"
#
# [optional, type: string]
class:

# List of cards.
#
# [required, type: list]
cards:
```

### Column options

```yaml
# [required, type: string]
type: col

# Class attribute of this column.
#
# Example: "col-xs-12 col-sm-5 col-md-4 col-lg-3"
#
# [optional, type: string]
class:

# List of cards.
#
# [required, type: list]
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
      - type: button
        class: "col-xs-12 col-sm-12 col-md-3 col-lg-3"
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
