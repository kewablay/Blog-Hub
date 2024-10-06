import { Injectable } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private analytics: Analytics) {}

  logPageView(pageName: string) {
    logEvent(this.analytics, 'screen_view', {
      firebase_screen: pageName,
      firebase_screen_class: pageName,
    });
  }

  logBlogPostView(postId: string, postTitle: string) {
    logEvent(this.analytics, 'blog_post_view', {
      post_id: postId,
      post_title: postTitle,
    });
  }

  logComment(postId: string, userId: string) {
    logEvent(this.analytics, 'post_comment', {
      post_id: postId,
      user_id: userId,
    });
  }

  logLike(postId: string, userId: string) {
    logEvent(this.analytics, 'post_like', {
      post_id: postId,
      user_id: userId,
    });
  }
}
