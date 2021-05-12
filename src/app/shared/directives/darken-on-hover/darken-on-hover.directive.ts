import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

// Essa diretiva fará com que quaisquer elementos que a incluírem como atributo,
// escureçam ao passar o mouse

@Directive({
  //para usar a directiva como atributo, precisa ter o selector entre colchetes
  selector: '[apDarkenOnHover]',
})
export class DarkenOnHoverDirective {
  //para pegar o elemento DOM no qual a diretiva foi inserida,
  //deve-se incluir no construtor um atributo ElementRef

  //e a injeção do Renderer permite que não se manipule a DOM diretamente
  //Assim, mesmo com renderização do lado do servidor (onde não há DOM),
  //essa manipulação seja possível
  constructor(private el: ElementRef, private render: Renderer2) {}

  @Input() brightness = '70%';

  //O decorator 'HostListener' captura
  //o evento cujonome foi passo no construtor (eg. 'mouseover')
  @HostListener('mouseover')
  darkenOn() {
    //através do render.setStyle, muda-se determinada propriedade para o valor solicitado
    this.render.setStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
  }
  @HostListener('mouseleave')
  darkenOff() {
    this.render.setStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
  }
}
