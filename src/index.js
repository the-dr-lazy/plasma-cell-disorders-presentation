import bespoke from 'bespoke'
import keys from 'bespoke-keys'
import touch from 'bespoke-touch'
import hash from 'bespoke-hash'
import classes from 'bespoke-classes'
import bullets from 'bespoke-bullets'

import intro from './slides/intro.html'

import './sass/main.scss'

const slides = [intro]

const presentation = document.getElementById('presentation')

function main() {
  presentation.innerHTML = slides.join('')

  const deck = bespoke.from(presentation, [
    keys(),
    touch(),
    hash(),
    classes(),
    bullets(),
  ])
}

document.addEventListener('DOMContentLoaded', main)
