import React, { useState } from 'react';
import {
  darken,
  adjustHue,
  desaturate,
  getScale,
  transparentize,
  mix,
  hasBadContrast,
} from 'color2k';
import Swatch from './Swatch';
import './styles.css';

const range = (n: number) => Array.from(Array(n)).map((_, i) => i);

export default function App() {
  const [color, setColor] = useState('black');

  return (
    <div className="app">
      <section className="section">
        <h2 className="title">darken</h2>
        <p className="subtitle">Darkens a color by lowering its lightness.</p>
        <div className="swatch-set">
          {['palevioletred', 'peachpuff', 'papayawhip', 'lavenderblush'].map(
            (color) => (
              <div>
                {range(5).map((i) => (
                  <Swatch key={i} color={darken(color, i / 10)} />
                ))}
              </div>
            ),
          )}
        </div>
      </section>

      <section className="section">
        <h2 className="title">adjustHue</h2>
        <p className="subtitle">Adjusts the hue across the color wheel.</p>
        <div className="horizonal-swatches">
          {range(12).map((i) => (
            <Swatch key={i} color={adjustHue('red', (i / 12) * 360)} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="title">desaturate</h2>
        <p className="subtitle">Takes a color and makes it less vibrant.</p>
        <div className="horizonal-swatches">
          {range(4).map((i) => (
            <Swatch key={i} color={desaturate('red', i / 4)} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="title">getScale</h2>
        <p className="subtitle">
          Creates a function that takes in a number and returns the color at
          that point in the scale.
        </p>
        <div className="horizonal-swatches">
          {(() => {
            const scale = getScale('green', 'yellow', 'red');
            const length = 16;

            return range(length).map((i) => (
              <Swatch key={i} color={scale(i / (length - 1))} />
            ));
          })()}
        </div>
      </section>

      <section className="section">
        <h2 className="title">transparentize</h2>
        <p className="subtitle">Makes a color more transparent.</p>
        <div className="horizonal-swatches transparent-background">
          {range(4).map((i) => (
            <Swatch key={i} color={transparentize('palevioletred', i / 4)} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="title">mix</h2>
        <p className="subtitle">Mixes two colors together.</p>
        <div className="horizonal-swatches">
          {range(4).map((i) => (
            <Swatch color={mix('palevioletred', 'peachpuff', i / 3)} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="title">hasBadContrast</h2>
        <p className="subtitle">
          Returns whether or not a color has bad contrast against a white
          background.
        </p>
        <div>
          <label className="color-picker-label" htmlFor="color-picker">
            Pick a color{' '}
            <span role="img" aria-label="">
              👉
            </span>
          </label>
          <input
            id="color-picker"
            className="color-input"
            type="color"
            value={color}
            onChange={(e) => setColor(e.currentTarget.value)}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Standard</th>
                <th />
                <th>Has bad contrast?</th>
              </tr>
            </thead>
            <tbody>
              {['decorative', 'readable', 'aa', 'aaa'].map((standard) => (
                <tr key={standard}>
                  <td>{standard}</td>
                  <td>
                    <div className="contrast-wrapper">
                      <div
                        className="contrast-block"
                        style={{ backgroundColor: 'white' }}
                      />
                      <div
                        className="contrast-block"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </td>
                  <td>
                    {hasBadContrast(color, standard as any)
                      ? 'Bad contrast 😅'
                      : "It's good 😎"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
