import { Action, ActionCreator, ActionReducer, ActionType, createReducer, ReducerTypes } from '@ngrx/store';
import * as Joi from 'joi';

/**
 * It create rehydrate reducer and sync local storage with all changes.
 *
 * @author Dragomir Urdov
 * @param key Local storage key.
 * @param initialState Default initial state.
 * @param ons Reducers
 * @returns Reducer
 *
 * @note Solution founded at:
 * https://medium.com/betsson-group/the-easiest-way-to-keep-ngrx-state-after-refresh-rehydrate-it-from-localstorage-8cd23b547aac
 */
export function createRehydrateReducer<S, A extends Action = Action>(
  key: string,
  schema: Joi.ObjectSchema | null,
  initialState: S,
  ...ons: ReducerTypes<S, ActionCreator[]>[]
): ActionReducer<S, A> {
  const item = localStorage.getItem(key);

  if (schema) {
    // Validate stored data based on schema
    const validation = schema.validate(item && JSON.parse(item));
    if (!validation.error) {
      initialState = validation.value;
    } else {
      // Remove invalid data.
      localStorage.removeItem(key);
    }
  } else {
    initialState = (item && JSON.parse(item)) ?? initialState;
  }

  // Map all reducers to always sync storage.
  ons = ons.map((on: ReducerTypes<S, ActionCreator[]>) => {
    const reducer: ActionReducer<S, Action> = (state: S | undefined, action: ActionType<ActionCreator[][number]>) => {
      // Execute original reducer.
      const newState = on.reducer(state ?? initialState, action);

      // Save new state to local storage and return it.
      localStorage.setItem(key, JSON.stringify(newState));

      return newState;
    };

    return { ...on, reducer };
  });

  return createReducer(initialState, ...ons);
}
