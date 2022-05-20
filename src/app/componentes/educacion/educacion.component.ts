import { EducacionService } from 'src/app/servicios/educacion/educacion.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalNuevaEduComponent } from '../modal-nueva-edu/modal-nueva-edu.component';
import { Educacion } from 'src/app/modelos/educacion';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  listaEducacion: Educacion[] = [];
  mostrar: boolean = true;
  avanceSi: boolean = true;
  selected: string = '';
  unaEdu: any;

  constructor(public dialog: MatDialog, private _servicioEduc: EducacionService,
    private toastr: ToastrService, private router: Router) { }

  eliminarEdu(edu: Educacion) {
    this._servicioEduc.eliminarEducacion(edu).subscribe(
      data => {
        this.eliminado(), (err: { error: { Mensaje: string | undefined; }; }) => {
          this.toastr.error(err.error.Mensaje, 'No Se ha Eliminado el elemento', {
            timeOut: 2000
          })
        }
      }
    )
  }

  eliminado() {
    return this.toastr.success('Elemento Educacion Eliminado', 'Ok', {
      timeOut: 2000
    }), this.ngOnInit();

  }

  obtenerUna(edu: Educacion) {
    this.listaEducacion.forEach(element => {
      if (Object.is(element, edu))
        this.unaEdu = element;
    });
    this.mostrar = !this.mostrar;
    
    this.obtenerLista();
  }
  obtenerLista() {
    this._servicioEduc.obtenerEducacion().subscribe(
      listaEducacion => this.listaEducacion = listaEducacion);
  }

  ngOnInit(): void {
    this.obtenerLista();
  }

  openDialog(ide: number): void {
    const accion = String(ide);
    const dialogRef = this.dialog.open(ModalNuevaEduComponent,
      {
        data:accion
      });
    dialogRef.afterClosed().subscribe(
      data => {
        this.obtenerLista();
      }
    );
  }

}

