import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { StorageService } from "../../services/storage.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-single-picture-input',
  templateUrl: './single-picture-input.component.html',
  styleUrl: './single-picture-input.component.scss'
})
export class SinglePictureInputComponent {

  @Output() fileSaved = new EventEmitter<string>();

  fileOver = false;
  uploading = false;
  coverUrl: SafeResourceUrl | undefined;

  constructor(private storageService: StorageService,
              private readonly dom: DomSanitizer) {
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

  async saveFiles(files: FileList | null | undefined) {
    try {
      this.uploading = true
      if (!files || files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      const uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.POST_COVERS, filePath, file)
      this.fileSaved.emit(uploadPath)
      await this.downloadImage(uploadPath)
    } finally {
      this.uploading = false
    }
  }

  async downloadImage(path: string) {
    try {
      const blob = await this.storageService.downLoadFromBucket(StorageService.BucketName.POST_COVERS, path)
      this.coverUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob))
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message)
      }
    }
  }
}
