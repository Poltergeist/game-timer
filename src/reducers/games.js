const ADD_GAME = Symbol("ADD_GAME");
export const addGame = game => {
  return {
    type: ADD_GAME,
    ...game
  };
};

export default function(state = [], action) {
  if (action.type === ADD_GAME) {
    const { name, id } = action;
    return [
      ...state,
      {
        name,
        id
      }
    ];
  }
  return state;
}
