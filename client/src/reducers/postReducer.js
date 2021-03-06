const intialState = {
    posts:[],
    post: {},
    loading: false
};

export default (state=intialState, action) => {
 switch (action.type) {
     case 'ADD_POST':
     return {
         ...state,
         posts:[action.payload, ...state.posts]
         
     }
     case 'POST_LOADING':
     return {
         ...state,
         loading:true
     }
     case 'GET_POST':
     return {
         ...state,
         posts:action.payload,
         loading:false
         
     }
     case 'DELETE_POST':
     return {
         ...state,
         posts: state.posts.filter(post => post._id !== action.payload)
        }
     default:
     return state;
 }

}