
export default {
  namespace: 'example',
  state: {},
  subscriptions: {
    setup() {
      console.log(1)
    },
  },
  effects: {
    *fetch(
      { payload }: { payload: any },
      { call, put }: {call: any, put: any}
    ) {
      console.log(payload, call)
      yield put({ type: 'save' });
    },
  },
  reducers: {
    save(state: any, action: any) {
      return { ...state, ...action.payload };
    },
  },
};
