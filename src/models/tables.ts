
export default {
    effects: {
      // tslint:disable-next-line:typedef
      *fetch({ payload }, { call, put }) {
        console.log(payload, call)
        yield put({ type: 'save' });
      },
    },
  
    namespace: 'tables',
  
    reducers: {
      toggleDrawer (state: any) {
          console.log(state)
          return { ...state, isDrawerVisible: !state.isDrawerVisible }
      }
    },
  
    state: {
        isDrawerVisible: false,
        fileList: []
    },
  
    subscriptions: {
      setup() {
        console.log(1)
      },
    },
  
  };
  