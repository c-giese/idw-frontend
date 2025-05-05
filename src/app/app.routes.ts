import { Routes } from '@angular/router';
import { ChatComponent } from './api-calls/chat/chat.component';
import { TestComponent } from './api-calls/test/test.component';

export const routes: Routes = [
    { path: 'test', component: TestComponent },
    { path: 'chat', component: ChatComponent },
    { path: '', redirectTo: '/chat', pathMatch: 'full' },
];
