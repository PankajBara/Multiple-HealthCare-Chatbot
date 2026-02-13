import { Component, Input, ViewChild, ElementRef, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var marked: any;

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    image?: string;
    agent?: string;
    resultImage?: string;
    isValidation?: boolean;
}

@Component({
    selector: 'app-chat-window',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements AfterViewChecked, OnChanges {
    @Input() messages: Message[] = [];
    @Input() isLoading: boolean = false;
    @ViewChild('chatBody') chatBody!: ElementRef;

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['messages'] || changes['isLoading']) {
            setTimeout(() => this.scrollToBottom(), 0);
        }
    }

    scrollToBottom(): void {
        try {
            this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
        } catch (err) { }
    }

    parseMarkdown(content: string): string {
        if (typeof marked !== 'undefined') {
            return marked.parse(content);
        }
        return content;
    }
}
