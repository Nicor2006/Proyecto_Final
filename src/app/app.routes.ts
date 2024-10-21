import { Routes } from '@angular/router';
import { PaginaEmprendedorComponent } from './componentes/emprendedores/PaginaEmprendedores/pagina-emprendedor/pagina-emprendedor.component';
export const routes: Routes = [

    {
        path:'emprendedor/:cedula',
        component:PaginaEmprendedorComponent
    }
];
