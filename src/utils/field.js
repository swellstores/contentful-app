import { get } from 'lodash';

export const isShortTextField = (field = {}) => field.type === 'Symbol';
export const isShortTextListField = (field = {}) =>
  field.type === 'Array' && get(field, 'items.type') === 'Symbol';
