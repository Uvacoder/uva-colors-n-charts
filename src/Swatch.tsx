import React from 'react';
import { readableColor, parseToRgba } from 'color2k';

interface Props {
  color: string;
  title?: string;
}

function Swatch({ color, title }: Props) {
  const colorText = `#${parseToRgba(color)
    .slice(0, 3)
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;

  return (
    <div className="swatch" style={{ backgroundColor: color }}>
      <span className="swatch-color" style={{ color: readableColor(color) }}>
        {title || colorText}
      </span>
    </div>
  );
}

export default Swatch;
