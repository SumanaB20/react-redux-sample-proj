function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const usersList = [
  {
    _id: '100',
    name: 'Sumana B',
    color: getRandomColor(),
    email: 'sumana@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Software Engineer',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
  {
    _id: '200',
    name: 'Priyanka H',
    color: getRandomColor(),
    email: 'priyanka@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Production Manager',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
  {
    _id: '300',
    name: 'Karthik L',
    color: getRandomColor(),
    email: 'karthik@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Sales',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
  {
    _id: '400',
    name: 'Lalitha M',
    color: getRandomColor(),
    email: 'lalitha@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Software Developer',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
  {
    _id: '500',
    name: 'Darlin Ken',
    email: 'darlin@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Software Engineer',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
  {
    _id: '600',
    name: 'Prestina Mery',
    color: getRandomColor(),
    email: 'pestina@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Software Engineer',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
  {
    _id: '700',
    name: 'Mery V',
    color: getRandomColor(),
    email: 'darlin@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Software Engineer',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
  {
    _id: '800',
    name: 'Vikky M',
    color: getRandomColor(),
    email: 'darlin@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Software Engineer',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
  {
    _id: '900',
    name: 'Pooja N',
    color: getRandomColor(),
    email: 'darlin@18bee@gmail.com',
    company: 'Company Name',
    designation: 'Software Engineer',
    phone: '+91 9535399611',
    address: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016',
  },
];

const initialState = {
  searchUserList: usersList,
  usersList,
  addUserInProgress: false,
  editUserInProgress: false,
  deleteUserInProgress: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
      case "ADD_USER_SUCCESS": {
      console.log(action.payload);
      const temp = state.usersList;
      temp.push(action.payload);
        return {
          ...state,
          addUserInProgress: true,
          usersList: temp,
        }
      }
      case "ADD_USER_PROGRESS": {
      console.log(action.payload);
        return {
          ...state,
          addUserInProgress: false,
        }
      }
      case "EDIT_USER_SUCCESS": {
      console.log(action.payload);
      const temp = state.usersList;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i]._id === action.payload.id) {
            temp[i].name = action.payload.name;
            temp[i].email = action.payload.email;
            temp[i].phone = action.payload.phone;
            temp[i].company = action.payload.company;
            temp[i].designation = action.payload.designation;
            temp[i].address = action.payload.address;
          }
        }
        return {
          ...state,
          editUserInProgress: true,
          usersList: temp,
        }
      }
      case "EDIT_USER_PROGRESS": {
      console.log(action.payload);
        return {
          ...state,
          editUserInProgress: false,
        }
      }
      case "FILTER_USER_SUCCESS": {
        let tempList = [];
        if (action.payload !== '') {
          tempList = state.searchUserList.filter(user => (user.name.toLowerCase()).indexOf(action.payload.toLowerCase()) > -1);

        } else {
          tempList = state.searchUserList;
        }
        return {
          ...state,
          editUserInProgress: true,
          usersList: tempList,
        }
      }
      case "FILTER_USER_PROGRESS": {
      console.log(action.payload);
        return {
          ...state,
          editUserInProgress: false,
        }
      }
      case "DELETE_USER_SUCCESS": {
        return {
          ...state,
          deleteUserInProgress: true,
          usersList: state.usersList.filter(user => user._id !== action.payload),
        }
      }
      case "DELETE_USER_PROGRESS": {
          return {
            ...state,
            deleteUserInProgress: false,
          }
        }
    default:
      return state;
  }
}
