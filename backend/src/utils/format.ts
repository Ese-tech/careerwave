import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../frontend/src/constants/admin'; // Frontend-Konstante wird wiederverwendet

/**
 * Formatiert ein Datum in das Standardformat.
 * @param date Das Datum-Objekt
 * @returns Formatierte Datumszeichenkette (z.B. 'YYYY-MM-DD')
 */
export function getFormattedDate(date: Date): string {
    return dayjs(date).format(DATE_FORMAT);
}