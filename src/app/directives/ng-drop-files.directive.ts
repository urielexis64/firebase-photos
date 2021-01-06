import { FileItem } from '../models/file-item';
import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
  @Input() files: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDrag(event: any) {
    this.mouseOver.emit(true);
    this._preventDefaultOpening(event);
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transfer = this._getTransfer(event);

    if (transfer) {
      this._extractFiles(transfer.files);
      this._preventDefaultOpening(event);
      this.mouseOver.emit(false);
    }
  }

  private _getTransfer(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList) {
    console.log(fileList);
  }

  //Validations
  private _fileCanBeLoad(file: File): boolean {
    return !this._fileAlreadyDropped(file.name) && this._isImage(file.type);
  }

  private _preventDefaultOpening(event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileAlreadyDropped(fileName: string): boolean {
    for (const file of this.files) {
      if (file.fileName === fileName) return true;
    }
    return false;
  }

  private _isImage(fileType: string): boolean {
    return fileType === '' || fileType === undefined
      ? false
      : fileType.startsWith('image');
  }
}
