import { Component } from '@angular/core';
import { Plantilla1Component} from '../../plantillas/PlantillasPresentacionPersonal/plantilla1/plantilla1.component';
import { PlantillaServicios1Component } from '../../plantillas/plantillasServicios/plantilla-servicios1/plantilla-servicios1.component';
import { PlantillaEmpresa1Component } from '../../plantillas/plantillasEmpresa/plantilla-empresa1/plantilla-empresa1.component';
import { PlantillaEmpresa2Component } from '../../plantillas/plantillasEmpresa/plantilla-empresa2/plantilla-empresa2.component';

@Component({
  selector: 'app-pagina-emprendedor',
  standalone: true,
  imports: [Plantilla1Component, PlantillaServicios1Component, PlantillaEmpresa1Component, PlantillaEmpresa2Component],
  templateUrl: './pagina-emprendedor.component.html',
  styleUrl: './pagina-emprendedor.component.scss'
})
export class PaginaEmprendedorComponent {

}
