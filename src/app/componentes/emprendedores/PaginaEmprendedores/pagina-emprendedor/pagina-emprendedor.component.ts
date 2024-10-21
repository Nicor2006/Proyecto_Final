import { Component } from '@angular/core';
import { Plantilla1Component} from '../../plantillas/PlantillasPresentacionPersonal/plantilla1/plantilla1.component';
import { PlantillaServicios1Component } from '../../plantillas/plantillasServicios/plantilla-servicios1/plantilla-servicios1.component';

@Component({
  selector: 'app-pagina-emprendedor',
  standalone: true,
  imports: [Plantilla1Component, PlantillaServicios1Component],
  templateUrl: './pagina-emprendedor.component.html',
  styleUrl: './pagina-emprendedor.component.scss'
})
export class PaginaEmprendedorComponent {

}
