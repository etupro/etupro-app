import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-single-picture-input',
  templateUrl: './single-picture-input.component.html',
  styleUrl: './single-picture-input.component.scss'
})
export class SinglePictureInputComponent {

  @Output() fileDropped = new EventEmitter<string>();

  fileOver = false;

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;

    console.log('Drag over');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;

    console.log('Drag leave');
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.saveFiles(files);
    }
  }

  onFileChange(event: any) {
    this.saveFiles(event.target?.files);
  }

  saveFiles(files: FileList) {
    console.log(`You selected ${files.length} files.`);
    const file = files.item(0);

    // todo : store to bucket and emit public url

    // this.fileDropped.emit(url);
  }
}
