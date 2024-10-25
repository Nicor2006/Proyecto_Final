import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EmprendedorService } from '../../../servicios/emprendedores/emprendedor.service';
import { Emprendedor } from '../../../interfaces/emprendedor';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, NavigationEnd, Router } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SearchService } from '../../../servicios/search/search.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {
  emprendedores: Emprendedor[] = [];
  filteredEmprendedores: Emprendedor[] = [];
  private subscription: Subscription = new Subscription();
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private emprendedorService: EmprendedorService,
    private router: Router, // Inyectamos el Router
    private cdr: ChangeDetectorRef,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    console.log("Cargando emprendedores...");
    this.loadEmprendedores();

    // Suscribirse a los eventos de navegación
    this.subscription.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd) // Filtra solo eventos de NavigationEnd
      ).subscribe(() => {
        this.loadEmprendedores(); // Carga nuevamente los emprendedores al navegar
      })
    );

    // Suscribirse a los cambios en la consulta de búsqueda
    this.subscription.add(
      this.searchService.searchQuery$.subscribe((query: string) => {
        this.filterEmprendedoresByQueOfrezco(query); // Filtra emprendedores cada vez que cambia la consulta
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Cancelar la suscripción al destruir el componente
    this.emprendedorService.resetCurrentIndex();
    console.log("Componente destruido");
  }

  private loadEmprendedores(): void {
    this.loading = true; // Indicamos que estamos cargando datos
    this.subscription.add(
      this.emprendedorService.getRandomEmprendedores().subscribe(
        (data) => {
          this.emprendedores = data;
          this.filteredEmprendedores = data; // Inicialmente no hay filtro
          this.loading = false; // Indicamos que hemos terminado de cargar
          this.cdr.markForCheck(); // Marca el componente para verificación de cambios
        },
        (error) => {
          this.error = 'Error al cargar emprendedores';
          this.loading = false; // Indicamos que hemos terminado de cargar, aunque hubo un error
          console.error('Error al cargar emprendedores:', error);
          this.cdr.markForCheck(); // Marca el componente para verificación de cambios
        }
      )
    );
  }

  private filterEmprendedoresByQueOfrezco(query: string): void {
    if (query) {
      this.filteredEmprendedores = this.emprendedores.filter(emprendedor =>
        emprendedor.QueOfrezco.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredEmprendedores = this.emprendedores; // Mostrar todos si no hay filtro
    }
    this.cdr.markForCheck(); // Asegurarse de que Angular detecte cambios después de filtrar
  }
}
