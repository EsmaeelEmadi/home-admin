export interface ISider {
  isCollapsed: boolean;
  toggleCollapse(): void;
  collapse(): void;
  expand(): void;
}
