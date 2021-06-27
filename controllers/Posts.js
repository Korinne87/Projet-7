import { UserService } from '../service/user.js';

export const getAllPosts = (req,res) => {
  const results = UserService.getAllUsers();
    results
    .then(data => res.json({data:data}))
    .catch((err) => console.log(err.message));
}