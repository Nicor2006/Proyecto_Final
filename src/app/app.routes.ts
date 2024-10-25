import { Routes } from '@angular/router';
import { PaginaEmprendedorComponent } from './componentes/emprendedores/PaginaEmprendedores/pagina-emprendedor/pagina-emprendedor.component';
import { HomePageComponent } from './componentes/WebPages/home-page/home-page.component';
export const routes: Routes = [

    {
        path:"",
        pathMatch:"full",
        redirectTo:"home"

        
    },

    {
        path: 'home',
        component:HomePageComponent
    },

    {
        path:'emprendedor/:cedula',
        component:PaginaEmprendedorComponent
    }
];
