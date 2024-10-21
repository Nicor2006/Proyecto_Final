import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importar map para transformar la respuesta
import { Emprendedor } from '../../interfaces/emprendedor';

@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {
  private dataUrl = 'assets/emprendedores.json';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los emprendedores
  getEmprendedores(): Observable<Emprendedor[]> {
    return this.http.get<Emprendedor[]>(this.dataUrl);
  }

  // Método para obtener un solo emprendedor por ID
  getEmprendedorById(id: number): Observable<Emprendedor | undefined> {
    return this.getEmprendedores().pipe(
      map((emprendedores: Emprendedor[]) => 
        emprendedores.find(emprendedor => emprendedor.cedula === id)
      )
    );
  }
}
