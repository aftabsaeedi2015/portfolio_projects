const gymClasses = [
  {
    image: './21.jpg',
    title: 'Cardio',
    description: 'At our cutting-edge facility, we are committed to helping you achieve peak cardiovascular health and unlock the full potential of your body. Our cardio fitness program is designed to cater to all fitness levels, from beginners to seasoned athletes.',
    id: 1
  },
  {
    image: '/21.jpg',
    title: 'Aerobic',
    description: "Are you looking to boost your fitness, improve your cardiovascular health, and have a blast while doing it? Look no further than [Gym Name] for the ultimate aerobics experience Our state-of-the-art gym is proud to offer a wide range of exhilarating aerobics classes",
    id: 2
  },
  {
    image: 'styledComponent/21.jpg',
    title: 'Boxing',
    description: '"Unleash Your Inner Champion with Boxing Coaching at [Boxing Gym Name] Do you have the heart of a fighter, the spirit of a champion, and the desire to become the best version of yourself? Look no further than [Boxing Gym Name] for world-class boxing coaching',
    id: 3
  }
]
const drawerMenuReducer = (state = false, action) => {
  switch (action.type) {
    case 'openDrawer':
      return true; // Return a new state value for opening the drawer
    case 'closeDrawer':
      return false; // Return a new state value for closing the drawer
    default:
      return state;
  }
};
const gymClassesReducer = (state = gymClasses,action ) => {
  return state
}

const loginReducer = (state = false, action) => {
  switch (action.type) {
    case 'login':
      return true; // Return a new state value for logging in
    case 'logout':
      return false; // Return a new state value for logging out
    default:
      return state;
  }
};

const profileMenuReducer = (state = false, action) => {
  switch (action.type){
    case 'openProfileMenu':
      return true;
    case 'closeProfileMenu':
      return false;
    default:
      return state
  }
}
const TabMenuReducer = (state = 0, action ) => {
  switch(action.type){
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
    default:
      return state;
  }
}
const userIdReducer=(state = null,action)=>{
  switch(action.type){
    case 'addUserId':
      return action.payload
    default:
      return state
  }
}
const blogPosts = [
  {
    id: 1,
    title: "Cardio",
    paragraph:
    "Cardiovascular exercise, commonly known as cardio, is the key to a healthy heart and a vibrant life. Whether it's a brisk jog, a cycling adventure, or a dance session, cardio workouts not only strengthen your heart but also boost your mood and enhance your overall well-being. Discover the endless benefits of cardio and start your journey to a healthier you today"
  },
  {
    id: 2,
    title: "Weight lifting",
    paragraph:
      "Weight lifting isn't just about building muscle; it's a transformative journey that strengthens not only your body but also your mind. With every rep and set, you're sculpting not just your physique but also your determination and resilience. Explore the world of weight lifting and unlock the potential for a stronger, healthier you.",
  },
  {
    id: 3,
    title: "Running",
    paragraph:
      "Running is more than just putting one foot in front of the other; it's a powerful journey of self-discovery. As your feet hit the pavement, you'll not only improve your physical fitness but also find solace in the rhythm of your breath and the beauty of the world around you. Lace up those shoes and embark on a running adventure to experience the true freedom of the open road.",
  },
]


const postsReducer = (state = blogPosts,action) =>{
    return state
}



export { drawerMenuReducer,
   loginReducer,
    profileMenuReducer,
     TabMenuReducer,
     gymClassesReducer,
    userIdReducer,
    postsReducer
    };
