import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
})
export class TestComponent {
    response: string = '';
    apiPrefix: string = 'http://localhost:5000/';

    // This is the http client that will be used to make the API call
    // The inject function is used to inject the HttpClient service into the component
    private http = inject(HttpClient);

    /**
     * Sends a GET request to the backend's /test endpoint and updates the component's response property.
     */
    testAPI() {
        this.http.get(this.apiPrefix + 'test').subscribe((response: any) => {
            this.response = response.response;
        });
    }
}
