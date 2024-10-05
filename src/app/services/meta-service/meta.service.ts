import { Injectable,Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private renderer!: Renderer2 
  constructor(private meta: Meta, private titleService: Title, private rendererFactory: RendererFactory2) {}

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

   // Create a JSON-LD structured data script
   createStructuredDataScript(data: object): HTMLScriptElement {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    return script;
  }
}
