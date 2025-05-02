import { Routes } from '@angular/router';
import { ChatComponent } from './api-calls/chat/chat.component';
import { SampleComponent } from './api-calls/sample/sample.component';
import { TestComponent } from './api-calls/test/test.component';

export const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'sample', component: SampleComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
];
