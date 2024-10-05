import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private meta: Meta, private titleService: Title) {}

  updateMeta(
    title: string,
    description: string,
    keywords: string,
    // imageUrl: string
  ) {
    // Set the page title
    this.titleService.setTitle(title);

    // Set meta tags
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'og:description', content: description });
    // this.meta.updateTag({ name: 'og:image', content: imageUrl });
  }
}
