import AuthModel from './auth.model.js';
import jwt from 'jsonwebtoken';
import AuthRepository from './authRepository.js';
import bcrypt from 'bcrypt';

export default class AuthController {

  constructor(){
    this.authRepository = new AuthRepository();
  }

  async resetPassword(req, res, next){
    const {newPassword} = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    const userID = req.userID;
    try {
      await this.authRepository.resetPassword(userID, hashedPassword);
      res.status(200).send("Password is updated")
    } catch (error) {
      console.log(error);
      console.log("Passing error to middleware");
      next(error)
    }
  }

  async signUp(req, res, next) {
    const {
      name,
      email,
      password,
    } = req.body;
try{
 const hashedPassword = await bcrypt.hash(password, 12)

const user = new AuthModel(
  name,
  email,
  //password,
  hashedPassword
);
await this.authRepository.signUp(user);
res.status(201).send(user);
}catch(err){
  next(err);
}

  }

  async signIn(req, res, next) {
    
    const {email} = req.body;
    console.log(email);
    try{
      // 1. Find user by email.
      const user = await this.authRepository.findByEmail(email);
      console.log("user is",user)
      if(!user){
        return res
        .status(400)
        .send('Incorrect Credentials');
      } else {
        // 2. Compare password password with hashed password.
        const result = await bcrypt.compare(req.body.password.toString(), user.password.toString());
        if(result){
        // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
              role: user.role,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            }
          );
      // 4. Send token.
      return res.status(200).send(token);
        } else {
          return res
        .status(400)
        .send('Incorrect Credentials password');
        }
      }
  } catch(err){
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }
}
