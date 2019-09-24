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
      toggleDrawer ( state: any ) {
          return { ...state, isDrawerVisible: !state.isDrawerVisible }
      },
      setFileList ( state: any, { fileList }: { fileList: any[] }) {
        console.log(fileList)
        return { ...state, fileList}
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
    }
  };
  