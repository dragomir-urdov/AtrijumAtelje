import { Action, ActionCreator, ActionReducer, ActionType, createReducer, ReducerTypes } from '@ngrx/store';

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
  initialState: S,
  ...ons: ReducerTypes<S, ActionCreator[]>[]
): ActionReducer<S, A> {
  // Get previously stored state.
  const item = localStorage.getItem(key);
  initialState = (item && JSON.parse(item)) ?? initialState;

  ons.map((on: ReducerTypes<S, ActionCreator[]>) => {
    const reducer = (state: S, action: ActionType<ActionCreator[][number]>) => {
      // *Execute original reducer functionality.
      const newState = on.reducer(state, action);
      // *Save new state to local storage.
      localStorage.setItem(key, JSON.stringify(newState));

      return newState;
    };

    return { ...on, reducer };
  });

  return createReducer(initialState, ...ons);
}
