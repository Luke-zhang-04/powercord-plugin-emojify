#!/bin/sh

yarn rollup -c rollup.config.js
cp -v manifest.json LICENSE README.md dist/
