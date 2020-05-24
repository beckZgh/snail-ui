import { createBEM, BEM } from './bem';
import { createComponent } from './component';
import { createI18N, Translate } from './il8n';

type CreateNamespaceReturn = [ReturnType<typeof createComponent>, BEM, Translate];
