import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-ver-notas',
  templateUrl: './ver-notas.component.html',
  styleUrls: ['./ver-notas.component.css']
})
export class VerNotasComponent {

  id!:number;
  nota:any;

  constructor(private route: ActivatedRoute, private notasServices: NotasService) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      notasServices.getNota(this.id).subscribe(res => {
        if (res && res.success != false) {
          this.nota = res;
          console.log(this.nota);
        }
      });
    });
  }
}
