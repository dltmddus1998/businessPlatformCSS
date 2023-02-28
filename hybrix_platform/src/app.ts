// // const SLIDER_WIDTH = 400;
// // const SLIDER_HEIGHT = 400;

import { Component } from './components/component.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

// class

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const carouselSlide = document.querySelector('.card-slide');
    const carouselContents = document.querySelectorAll('.photo-card-container');

    const prevBtn = document.querySelector('.');
  }
}
