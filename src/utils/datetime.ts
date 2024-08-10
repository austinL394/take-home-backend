import { format } from 'date-fns';

export function formatDate(date: number | Date | undefined) {
  return date ? format(date, 'yyyy/MM/dd') : '';
}

export function formatDateTime(date: number | Date | undefined) {
  return date ? format(date, 'MM/dd/yyyy HH:mm:ss') : '';
}
