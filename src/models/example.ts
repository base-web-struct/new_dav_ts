
export default {

  effects: {
    // tslint:disable-next-line:typedef
    *fetch({ payload }, { call, put }) {
      console.log(payload, call)
      yield put({ type: 'save' });
    },
  },

  namespace: 'example',

  reducers: {
    save(state: any, action: any) {
      return { ...state, ...action.payload };
    },
  },

  state: {},

  subscriptions: {
    setup() {
      console.log(1)
    },
  },

};
