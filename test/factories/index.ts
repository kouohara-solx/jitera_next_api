
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';


export function userFactory(rest = {}) {
  return {
                            full_name: faker.datatype.string(255),
                    email: faker.internet.email(),
                                                                                                                ...rest,
  };
}
export function noteFactory(rest = {}) {
  return {
                            contents: faker.datatype.string(255),
              user_id: faker.datatype.number({}),
              title: faker.datatype.string(255),
          ...rest,
  };
}
