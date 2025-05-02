import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

type Message = {
    role: string;
    content: string;
};

@Component({
    selector: 'app-sample',
    standalone: true,
    imports: [FormsModule, NgbAlertModule],
    templateUrl: './sample.component.html',
    styleUrl: './sample.component.scss',
})
export class SampleComponent {
    apiPrefix: string = 'http://localhost:5000/';
    userMessage: string = '';
    isRequestRunning: boolean = false;
    conversation: Message[] = [];

    // This is the http client that will be used to make the API call
    // The inject function is used to inject the HttpClient service into the component
    private http = inject(HttpClient);

    /**
     * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
     * Calls the initiateNewConversation method to start the chat when the component loads.
     */
    ngOnInit() {
        this.initiateNewConversation();
    }

    /**
     * Sends a GET request to the backend's /initiate endpoint to get the initial greeting message.
     * Adds the greeting message to the conversation history.
     */
    initiateNewConversation() {
        this.isRequestRunning = true;
        this.http
            .get(this.apiPrefix + 'initiate')
            .subscribe((response: any) => {
                this.conversation.push({
                    role: 'assistant',
                    content: response.response,
                });
                this.isRequestRunning = false;
            });
    }

    /**
     * Sends the user's message to the backend's /query endpoint.
     * Adds the user's message and the assistant's response to the conversation history.
     * Clears the input field after sending the message.
     */
    postQuery() {
        this.isRequestRunning = true;
        this.conversation.push({
            role: 'user',
            content: this.userMessage,
        });
        const userMessage = this.userMessage;
        this.userMessage = '';

        this.http
            .post(this.apiPrefix + 'query', { query: userMessage })
            .subscribe((response: any) => {
                this.conversation.push({
                    role: 'assistant',
                    content: response.response,
                });
                this.isRequestRunning = false;
            });
    }

    /**
     * Clears the current conversation history and resets the input field.
     */
    clearConversation() {
        this.conversation = [];
        this.userMessage = '';
        this.isRequestRunning = false;
    }
}
