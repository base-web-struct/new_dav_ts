export const globalModel =  {
  namespace: 'global',
  state: {},
  subscriptions: {
    setup ({ history, dispatch }: { history: any, dispatch: any }) {
      history.listen(({pathname}: {pathname: string}) => {
        console.log(pathname)
        dispatch({
          type: 'init'
        })
      })
    }
  },
  effects: {
    *init (
      { payload }: { payload: any },
      { call, put }: {call: any, put: any}
    ) {
      console.log(payload, call)
      yield put({
        type: 'save'
      })
    }
  },
  reducers: {
    save (
      state: any,
      { payload }: { payload: any }
    ) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
