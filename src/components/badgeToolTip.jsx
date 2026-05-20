export default function BadgeTooltip({ visible, x, y, name, description }) {
  if (!visible) return null;

  const tooltipWidth = 220;   // same as your CSS width
  const tooltipHeight = 100;  // approximate height
  const padding = 20;

  let posX = x + 15;
  let posY = y + 15;

  // Right edge
  if (posX + tooltipWidth + padding > window.innerWidth) {
    posX = x - tooltipWidth - 15;
  }

  // Left edge
  if (posX < padding) {
    posX = padding;
  }

  // Bottom edge
  if (posY + tooltipHeight + padding > window.innerHeight) {
    posY = y - tooltipHeight - 15;
  }

  // Top edge
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
