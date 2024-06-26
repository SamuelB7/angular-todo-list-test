import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';

import { AnimateDirective } from './animate.directive';
import { TodoService } from './todo-service.service';
import { Todo } from './todo.types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChildren(AnimateDirective) items: QueryList<AnimateDirective>

    todos: Todo[] = [];
    counterTodosDone = 0;

    private _unsubscribeAll = new Subject();

    constructor(
        private todoService: TodoService,
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete();
    }

    addTodo(input: HTMLInputElement) {
        console.log('addTodo: ', input.value);
        const text = input.value;

        if (!text) return;

        input.value = '';
        setTimeout(() => this.items.forEach(x => x.animateGo()))
    }

    remove(index: number) {
        this.animate()
    }

    onToggleDone(index: number, todo: Todo) {
        todo.done = !todo.done;
    }

    onDragStart(event: DragEvent, fromIndex: number) {
        event.dataTransfer.setData('text/plain', fromIndex as any);
    }

    onDrop(event: DragEvent, toIndex: number) {
        const fromIndex = event.dataTransfer.getData('text');
        this.animate();
    }

    animate() {
        setTimeout(() => this.items.forEach(x => x.animateGo()), 10);
    }
}
