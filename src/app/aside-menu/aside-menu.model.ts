import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export enum MenuItemTag {
  Editor, Settings, Debug
}

export interface MenuItem {
  tag: MenuItemTag;
  icon: IconDefinition;
  linkUrl: string;
}

export interface AsideMenuState {
  menuItems: MenuItem[];
  selectedItemTag: MenuItemTag;
}
