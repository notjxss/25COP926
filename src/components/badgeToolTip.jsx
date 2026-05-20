export default function BadgeTooltip({ visible, x, y, name, description }) {
  // hide tooltip entirely when not active
  if (!visible) return null;

  // estimated tooltip size
  const tooltipWidth = 220;   
  const tooltipHeight = 100;  
  const padding = 20;

  // default position: slightly offset from cursor
  let posX = x + 15;
  let posY = y + 15;

  // prevent tooltip from going off the right edge
  if (posX + tooltipWidth + padding > window.innerWidth) {
    posX = x - tooltipWidth - 15;
  }

  // left edge
  if (posX < padding) {
    posX = padding;
  }

  // bottom edge
  if (posY + tooltipHeight + padding > window.innerHeight) {
    posY = y - tooltipHeight - 15;
  }

  // top edge
  if (posY < padding) {
    posY = padding;
  }

  return (
    <div
      className="badge-tooltip"
      style={{ top: posY, left: posX }}
    >
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
}
