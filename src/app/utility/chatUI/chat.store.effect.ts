import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { MessageStoreService } from './chat.store.service';
import * as MessageAction from './chat.store.action';
import { MessageUnionActions } from './chat.store.action';

@Injectable()
export class MessageCreateEffects {
  constructor(
    private action: Actions<MessageAction.MessageUnionActions>,
    private storeService: MessageStoreService
  ) {}

  getMessage: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(MessageAction.getMessage),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getMessage(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return MessageAction.getMessageSuccess({
                response: response,
              });
            } else {
              return MessageAction.getMessageFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(MessageAction.getMessageSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getMessageSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(MessageAction.getMessageSuccess)),
    { dispatch: false }
  );

  getMessageFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(MessageAction.getMessageFailed)),
    { dispatch: false }
  );

  getMessageSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(MessageAction.getMessageSystemFailed)),
    { dispatch: false }
  );

  //getMessageSuccess
}
