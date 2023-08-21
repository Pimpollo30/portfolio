import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotasService } from 'src/app/services/notas.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Modal, initFlowbite } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-crud-notas',
  templateUrl: './crud-notas.component.html',
  styleUrls: ['./crud-notas.component.css']
})
export class CrudNotasComponent {
  modal!: ModalInterface;
  notas:any[] = [];
  notasForm: FormGroup;
  id!:any;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '100px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      outline:false,
      placeholder: 'Contenido...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(private fb: FormBuilder, private auth: AuthService, private notasService: NotasService) {
    this.notasForm = this.fb.group({
      titulo: ['',Validators.required],
      imagen: ['',Validators.required],
      descripcion: ['',Validators.required],
      contenido: ['',Validators.required]
    });
  }

  ngOnInit() {
    initFlowbite();
    this.notasService.getNotas().subscribe(res => {
      if (res && res.length > 0) {
        this.notas = res;
        setTimeout(() => initFlowbite(), 50);
      }
    });

    const $modalElement: HTMLElement = document.querySelector('#modal-notes')!;
    const modalOptions: ModalOptions = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
            console.log('modal is hidden');
        },
        onShow: () => {
            console.log('modal is shown');
        },
        onToggle: () => {
            console.log('modal has been toggled');
        }
    }
    
    this.modal = new Modal($modalElement, modalOptions);
  }

  openModal() {
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

  agregar() {
    const form = this.notasForm.value;
    if (form.titulo && form.contenido) {
      if (!this.id) {
        this.notasService.agregar(form.titulo, form.imagen, form.descripcion, form.contenido).subscribe(data => {
          if (data) {
            this.modal.hide();
            this.notasForm.reset();
          }
        });
      }else {
        this.notasService.actualizar(this.id, form.titulo, form.imagen, form.descripcion, form.contenido).subscribe(data => {
          if (data) {
            this.modal.hide();
            this.notasForm.reset();
          }
        });
      }
      this.id = null;
    }
  }

  openModalEdit(nota:any) {
    this.modal.toggle();
    this.notasForm.controls["titulo"].setValue(nota.titulo);
    this.notasForm.controls["imagen"].setValue(nota.imagen);
    this.notasForm.controls["descripcion"].setValue(nota.descripcion);
    this.notasForm.controls["contenido"].setValue(nota.contenido);
    this.id = nota.id;
  }

  openAlertRemove(nota:any) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5145CD',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.notasService.eliminar(nota.id).subscribe(res => {
          if (res) {
            if (res.success == true) {
              Swal.fire({
                icon: 'success',
                text: res.message,
                confirmButtonColor: '#5145CD',
              })
            }else {
              Swal.fire({
                icon: 'error',
                text: res.message,
                confirmButtonColor: '#5145CD',
              })
            }
          }
        })
      }
    })
  }
}
