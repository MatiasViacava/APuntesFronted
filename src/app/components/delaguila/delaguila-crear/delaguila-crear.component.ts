import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Equipaje } from 'src/app/models/equipaje';
import { EquipajeService } from 'src/app/services/equipaje.service';
@Component({
  selector: 'app-delaguila-crear',
  templateUrl: './delaguila-crear.component.html',
  styleUrls: ['./delaguila-crear.component.css']
})
export class DelaguilaCrearComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  equipaje: Equipaje = new Equipaje();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  dateReception = new FormControl(new Date());
  estados: { value: string; viewValue: string }[] = [
    { value: 'entregado', viewValue: 'Entregado' },
    { value: 'recepcionado', viewValue: 'Recepcionado' },
    { value: 'a bordo', viewValue: 'A bordo' },
  ];
  edicion: boolean = false;
  idEquipaje: number = 0;
  constructor(
    private Es: EquipajeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      weightEquipaje: ['', Validators.required],
      statusEquipaje: ['', Validators.required],
      dateReception: ['', Validators.required],
      priceEquipaje: [''],
    });
  }
  registrar() {
    if (this.form.valid) {
        this.equipaje.idEquipaje = this.form.value.idEquipaje,
        this.equipaje.weightEquipaje = this.form.value.weightEquipaje,
        this.equipaje.statusEquipaje = this.form.value.statusEquipaje,
        this.equipaje.dateReception = this.form.value.dateReception
        this.equipaje.priceEquipaje = this.form.value.priceEquipaje

        this.Es.insert(this.equipaje).subscribe(data=> {
          this.Es.list().subscribe(data=>{
            this.Es.setList(data);
          })
        })
        this.router.navigate(['/delaguila/nuevo']);
        this.form.reset()


    } else {
      this.mensaje="Complete todos los campos!!!!"
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

}
