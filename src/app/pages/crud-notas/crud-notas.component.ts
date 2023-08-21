import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotasService } from 'src/app/services/notas.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'

@Component({
  selector: 'app-crud-notas',
  templateUrl: './crud-notas.component.html',
  styleUrls: ['./crud-notas.component.css']
})
export class CrudNotasComponent {
  modal!: ModalInterface;
  notas:any[] = [];
  notasForm: FormGroup;
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
    this.notasService.getNotas().subscribe(res => {
      if (res && res.length > 0) {
        this.notas = res;
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
      this.notasService.agregar(form.titulo, form.imagen, form.descripcion, form.contenido).subscribe(data => {
        if (data) {
          this.modal.hide();
          this.notasForm.reset();
        }
      });
    }
  }
}
