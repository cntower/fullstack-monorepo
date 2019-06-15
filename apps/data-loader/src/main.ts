import * as faker from 'faker';
import axios from 'axios';
import { IUserDTO, IPostDTO } from "@mono/api-interface";

const api = 'http://localhost:3333/api';

const generateUser = async () => {
  const userCredentials: IUserDTO = {
    username: faker.internet.userName(),
    password: 'password'
  }
  const user = await axios.post(api + '/register', userCredentials);
  return user.data;
}

const postNewPost = async token => {
  const post: IPostDTO = {
    title: faker.name.title(),
    description: faker.lorem.paragraph()
  }
  const newPost = await axios.post(api + '/posts', post, {
    headers: { authorization: `Bearer ${token}` }
  });
  return newPost;
}

(async () => {
  for (let index = 0; index < 10; index++) {
    const user = await generateUser();
    if (!index) {
      console.log(`Bearer ${user.token}`);
    }
    for (let indexPost = 0; indexPost < 10; indexPost++) {
      postNewPost(user.token);
    }
  }
})()
