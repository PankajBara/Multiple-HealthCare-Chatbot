import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatWindowComponent, Message } from './components/chat-window/chat-window.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        SidebarComponent,
        ChatHeaderComponent,
        ChatWindowComponent,
        ChatInputComponent
    ],
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'MedicalAssistant';

    displayMessages: Message[] = [
        {
            role: 'assistant',
            content: "Hello! I'm your Medical Conversation Assistant. You can ask me health-related questions.",
            agent: 'Medical Conversation Assistant'
        }
    ];
    isLoading = false;

    constructor(private cdr: ChangeDetectorRef) { }

    clearChat() {
        this.displayMessages = [
            {
                role: 'assistant',
                content: "Hello! I'm your Medical Conversation Assistant. You can ask me health-related questions.",
                agent: 'Medical Conversation Assistant'
            }
        ];
    }

    onSendMessage(event: { message: string, file: File | null }) {
        const { message, file } = event;
        if (!message && !file) return;

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const imagePreview = e.target.result;
                this.processMessage(message, imagePreview);
            };
            reader.readAsDataURL(file);
        } else {
            this.processMessage(message);
        }
    }

    processMessage(message: string, image?: string) {
        // Add user message to a new array reference to trigger OnChanges
        const newMessage: Message = {
            role: 'user',
            content: message,
            image: image
        };

        this.displayMessages = [...this.displayMessages, newMessage];

        this.isLoading = true;
        this.cdr.detectChanges();

        // Simulate backend delay
        setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        }, 1000);
    }
}
