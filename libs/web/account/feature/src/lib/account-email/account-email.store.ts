import { Injectable } from '@angular/core'

import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { AccountCreateEmailInput, ApolloAngularSDK, Email } from '@schema-driven/web/core/data-access'
import { delay, mergeMap, switchMap, tap } from 'rxjs/operators'

interface AccountEmailState {
  emails?: Email[]
  errors?: any
  loading: boolean
}

@Injectable()
export class AccountEmailStore extends ComponentStore<AccountEmailState> {
  constructor(private readonly sdk: ApolloAngularSDK) {
    super({ loading: false })
  }

  readonly vm$ = this.select(({ emails, errors, loading }) => ({
    emails,
    errors,
    loading,
  }))

  readonly addEmail = this.effect<AccountCreateEmailInput>((input$) =>
    input$.pipe(
      mergeMap((input) =>
        this.sdk.accountCreateEmail({ input }).pipe(
          tapResponse(
            ({ errors }) => {
              this.patchState({ errors })
              this.loadEmailsEffect()
            },
            (errors) => this.patchState({ errors, loading: false }),
          ),
        ),
      ),
    ),
  )

  readonly deleteEmail = this.effect<Email>((email$) =>
    email$.pipe(
      mergeMap((email) =>
        this.sdk.accountDeleteEmail({ emailId: email.id }).pipe(
          tapResponse(
            ({ errors }) => {
              this.patchState({ errors })
              this.loadEmailsEffect()
            },
            (errors) => this.patchState({ errors, loading: false }),
          ),
        ),
      ),
    ),
  )

  readonly loadEmailsEffect = this.effect((trigger$) => {
    return trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.sdk.accountEmails({}, { fetchPolicy: 'no-cache' }).pipe(
          tapResponse(
            ({ data, errors }) => {
              this.patchState({
                emails: data?.accountEmails,
                loading: false,
                errors,
              })
            },
            (errors) => this.patchState({ errors, loading: false }),
          ),
        ),
      ),
    )
  })

  readonly setPrimaryEmail = this.effect<Email>((email$) =>
    email$.pipe(
      mergeMap((email) =>
        this.sdk.accountMarkEmailPrimary({ emailId: email.id }).pipe(
          tapResponse(
            ({ errors }) => {
              this.patchState({ errors })
              this.loadEmailsEffect()
            },
            (errors) => this.patchState({ errors, loading: false }),
          ),
        ),
      ),
    ),
  )

  private readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }))
}
