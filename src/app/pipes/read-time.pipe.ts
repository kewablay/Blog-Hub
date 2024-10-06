import { Pipe, PipeTransform } from '@angular/core';
import { duration, unitOfTime } from 'moment';

@Pipe({
  name: 'readTime',
  standalone: true
})
export class ReadTimePipe implements PipeTransform {

  transform(htmlContent: string, wpm: number = 575, unit: unitOfTime.DurationConstructor = 'minutes', locale = 'en'): string {
    // Strip HTML tags to get plain text
    const plainText = htmlContent.replace(/<[^>]*>/g, '');

    // Count the words in the plain text
    const words = plainText.trim().split(/\s+/).length;

    // Calculate total reading duration based on words per minute (WPM)
    const totalDuration = Math.ceil(words / wpm);

    // Create a duration object using the total duration
    const timeDuration = duration(totalDuration, unit);

    // Custom formatting for hours, minutes, and seconds
    const hours = timeDuration.hours();
    const minutes = timeDuration.minutes();
    const seconds = timeDuration.seconds();

    let formattedTime = '';

    // Format time in a more concise way
    if (hours > 0) {
      formattedTime += `${hours} hr `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} mins `;
    }
    if (seconds > 0 && hours === 0) {
      // Only show seconds if no hours are present (optional)
      formattedTime += `${seconds} sec`;
    }

    return formattedTime.trim() || 'less than a minute';  // Fallback for very short text
  }

}
