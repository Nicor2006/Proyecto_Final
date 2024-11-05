import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { EmprendedorService } from '../../../servicios/emprendedores/emprendedor.service';
import { Emprendedor } from '../../../interfaces/emprendedor';
import { filter } from 'rxjs/operators';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cedula!: number;
  emprendedor: Emprendedor | undefined;

  constructor(
    private router: Router,
    private emprendedorService: EmprendedorService
  ) {}

  ngOnInit(): void {
    // Solo suscribirse a los eventos de navegación final
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadEmprendedor();
    });
  }

  private loadEmprendedor(): void {
    const cedulaString = this.router.url.split('/').pop(); // Obtén el último fragmento de la URL
    if (cedulaString && !isNaN(+cedulaString)) {
      this.cedula = +cedulaString;

      // Cargar el emprendedor solo si la cédula es válida
      this.emprendedorService.getEmprendedorById(this.cedula).subscribe(
        (data) => {
          this.emprendedor = data;
        },
        (error) => {
          console.error('Error al cargar el emprendedor:', error);
          this.emprendedor = undefined; // Maneja el error como prefieras
        }
      );
    } 
  }

  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  navegarASecion(fragment: string): void {
    // Obtener la ruta actual y navegar a ella con el nuevo fragmento
    const currentUrl = this.router.url.split('#')[0]; // Obtener la parte base de la URL
    this.router.navigateByUrl(`${currentUrl}#${fragment}`); // Navegar usando la URL base con el nuevo fragmento
  }
  isHomePage(): boolean {
    return this.router.url === '/home';
  }

}
