import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-chat-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent {
    @Input() isLoading: boolean = false;
    @Output() sendMessage = new EventEmitter<{ message: string, file: File | null }>();

    messageInput: string = '';
    previewImageStr: string | null = null;
    selectedFile: File | null = null;

    @ViewChild('fileInput') fileInput!: ElementRef;

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.previewImageStr = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage() {
        this.selectedFile = null;
        this.previewImageStr = null;
        if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
        }
    }
    onSubmit() {
        if ((this.messageInput.trim() || this.selectedFile) && !this.isLoading) {
            this.sendMessage.emit({
                message: this.messageInput.trim(),
                file: this.selectedFile
            });

            this.messageInput = '';
            this.removeImage();
        }
    }
}
