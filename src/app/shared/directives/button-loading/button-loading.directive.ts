import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appButtonLoading]'
})
export class ButtonLoadingDirective implements OnInit, OnChanges {
  @Input() loading: boolean = false;
  textInitial: string = '';

  constructor(
    private elementRef: ElementRef<HTMLButtonElement>,
    private renderer: Renderer2
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'].previousValue) {
      this.loading = changes['loading'].currentValue;
      this.disable();
    }
  }

  ngOnInit() {
    this.textInitial = this.elementRef.nativeElement.innerHTML;
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.loading = true;
    if (this.loading) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Cargando');
    } else {
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', this.textInitial);
    }

    this.loading = !this.loading;
  }

  disable() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', this.textInitial);
  }
}
