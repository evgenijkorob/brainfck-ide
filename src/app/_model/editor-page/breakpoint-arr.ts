import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface Breakpoint {
  index: number;
  isActive: boolean;
}

export interface BreakpointArr extends EntityState<Breakpoint> {
}

export const breakpointArrAdapter: EntityAdapter<Breakpoint> =
  createEntityAdapter<Breakpoint>({
    selectId: (breakpoint) => breakpoint.index,
    sortComparer: (a, b) => a.index - b.index
  });
