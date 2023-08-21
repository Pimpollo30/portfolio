import { Component } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent {

  notas:any[] = [];

  constructor(private notasService:NotasService) {}

  ngOnInit() {
    this.notasService.getNotas().subscribe(res => {
      if (res && res.length > 0) {
        this.notas = res;
      }
    })
  }

}
