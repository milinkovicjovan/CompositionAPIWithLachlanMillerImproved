// Define NewUser interface
const NewUser = {
  username: "",
  password: "",
};

// Define User interface that extends NewUser interface
const User = {
  id: "",
  ...NewUser,
};

// Export NewUser and User interfaces
export { NewUser, User };