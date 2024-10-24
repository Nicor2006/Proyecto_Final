import { Routes } from '@angular/router';
import { PaginaEmprendedorComponent } from './componentes/emprendedores/PaginaEmprendedores/pagina-emprendedor/pagina-emprendedor.component';
import { HomePageComponent } from './componentes/WebPages/home-page/home-page.component';
export const routes: Routes = [

    {
        path: '',
        component:HomePageComponent
    },

    {
        path:'emprendedor/:cedula',
        component:PaginaEmprendedorComponent
    }
];
