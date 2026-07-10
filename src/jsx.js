import React from 'react';
import htm from 'htm';

const withStableKeys = (child, path = 'k') => {
  if (!Array.isArray(child)) return child;
  return child.map((item, index) => {
    const childPath = `${path}-${index}`;
    if (Array.isArray(item)) return withStableKeys(item, childPath);
    if (React.isValidElement(item) && item.key == null) {
      return React.cloneElement(item, { key: childPath });
    }
    return item;
  });
};

const iconNames = new Set(['AlertTriangle', 'BedDouble', 'Bot', 'CalendarDays', 'Camera', 'Car', 'CheckCircle2', 'ChevronDown', 'Clock', 'Compass', 'Database', 'Download', 'ExternalLink', 'Globe2', 'Heart', 'Info', 'Languages', 'Landmark', 'Loader2', 'LocateFixed', 'LogIn', 'LogOut', 'Mail', 'Map', 'MapPin', 'Megaphone', 'MessageCircle', 'Moon', 'MoreVertical', 'PiggyBank', 'PlugZap', 'PlusCircle', 'RefreshCw', 'Route', 'Save', 'Search', 'Send', 'Settings', 'ShieldCheck', 'Sparkles', 'Star', 'StarHalf', 'Sun', 'Trash2', 'UserRound', 'Users', 'Utensils', 'WalletCards', 'WifiOff', 'X']);
const renderBareIcon = (child) => {
  if (Array.isArray(child)) return child.map(renderBareIcon);
  if (React.isValidElement(child)) return child;
  const name = child && (child.displayName || child.name || child.render?.displayName || child.render?.name);
  const isComponent = typeof child === 'function' || (typeof child === 'object' && child !== null && typeof child.render === 'function');
  const isKnownLucideComponent = isComponent && iconNames.has(name);
  return isKnownLucideComponent ? React.createElement(child, { size: 20 }) : child;
};

const createElement = (type, props, ...children) => React.createElement(type || React.Fragment, props, ...children.map((child, index) => renderBareIcon(withStableKeys(child, `c-${index}`))));

export { withStableKeys, iconNames, renderBareIcon, createElement };
export const html = htm.bind(createElement);
