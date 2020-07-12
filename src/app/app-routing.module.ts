import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from 'src/guards'

import { JumbotronComponent } from './jumbotron/jumbotron.component'
import { FormComponent } from './form/form.component'

import { TasksPageComponent } from './tasks-page/tasks-page.component'
import { TaskPageComponent } from './tasks-page/task-page/task-page.component'

import { ExecutorsPageComponent } from './executors-page/executors-page.component'
import { ExecutorFormComponent } from './executor-form/executor-form.component'

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/youdo-clone',
    //     pathMatch: 'full'
    // },
    { path: '', component: JumbotronComponent },
    {
        path: 'tasks-my',
        component: TasksPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks-my/:category/:page',
        component: TasksPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks-my/:category/:subcategory/:page',
        component: TasksPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks',
        component: TasksPageComponent
    },
    {
        path: 'tasks/:category/:page',
        component: TasksPageComponent
    },
    {
        path: 'tasks/:category/:subcategory/:page',
        component: TasksPageComponent
    },
    { path: 'tasks/:taskId', component: TaskPageComponent },
    {
        path: 'tasks-add/:category/:subcategory',
        component: FormComponent
    },
    {
        path: 'executors',
        component: ExecutorsPageComponent
    },
    {
        path: 'executors/:category/:page',
        component: ExecutorsPageComponent
    },
    {
        path: 'executors/:category/:subcategory/:page',
        component: ExecutorsPageComponent
    },
    {
        path: 'profile/:id',
        loadChildren: () =>
            import('./profile-page/profile-page.module').then(
                m => m.ProfilePageModule
            )
    },
    {
        path: 'verification/personalinfo',
        component: ExecutorFormComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
