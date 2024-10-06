import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firestoreTimestamp',
  standalone: true,
})
export class FirestoreTimestampPipe implements PipeTransform {
  transform(
    value: { seconds: number; nanoseconds: number } | Date
  ): Date | string {
    if (value && typeof value === 'object' && 'seconds' in value) {
      // Convert Firestore timestamp object to JavaScript Date
      return new Date(value?.seconds * 1000); // Convert seconds to milliseconds
    } else if (value instanceof Date) {
      return value; //if Already a Date object
    }
    return ''; // Return empty string for invalid input
  }
}
