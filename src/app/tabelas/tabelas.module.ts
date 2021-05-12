import { NgModule } from "@angular/core";
import { SistemasComponent } from "./sistemas/sistemas.component";

@NgModule({
    declarations: [SistemasComponent],
    //se o componente não for colocado no exports, ele será privado, 
    //não poderá ser usado por outros módulos, apenas dentro do próprio módulo
    exports: [ SistemasComponent] 
})
export class TabelasModule{}