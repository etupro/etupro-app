import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-single-picture-input',
  templateUrl: './single-picture-input.component.html',
  styleUrl: './single-picture-input.component.scss'
})
export class SinglePictureInputComponent {

  @Output() fileSaved = new EventEmitter<File>();

  fileOver = false;
  uploading = false;

  file: File | undefined;
  coverUrl: SafeResourceUrl | undefined;

  constructor(private readonly dom: DomSanitizer) {
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      await this.saveFiles(files);
    }
  }

  async onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    await this.saveFiles(files);
  }

  async onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    await this.saveFiles(files);
  }

  async saveFiles(files: FileList | null | undefined) {
    try {
      this.uploading = true;
      if (!files || files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      this.file = files[0];
      this.coverUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.file));
      this.fileSaved.emit(this.file);
    } finally {
      this.uploading = false;
    }
  }
}
