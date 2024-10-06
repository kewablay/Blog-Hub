import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, merge, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OnlineStatusService {
  private onlineStatus$: BehaviorSubject<boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const isBrowser = isPlatformBrowser(this.platformId);

    // Initialize online status depending on platform
    this.onlineStatus$ = new BehaviorSubject<boolean>(isBrowser ? navigator.onLine : true);

    if (isBrowser) {
      // Set up event listeners for online/offline status changes
      const online$ = fromEvent(window, 'online').pipe(map(() => true));
      const offline$ = fromEvent(window, 'offline').pipe(map(() => false));

      // Merge both observables to track the online/offline status
      merge(online$, offline$)
        .pipe(startWith(navigator.onLine)) // Start with current status
        .subscribe(this.onlineStatus$);
    }
  }

  // Observable for components to subscribe to online status changes
  get onlineStatus(): Observable<boolean> {
    return this.onlineStatus$.asObservable();
  }

  // Synchronous check for whether the app is currently online
  isOnline(): boolean {
    return this.onlineStatus$.getValue();
  }
}
