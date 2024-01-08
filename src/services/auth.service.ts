import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { ClientEntity } from '@entities/clients.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Client } from '@interfaces/clients.interface';

const createToken = (client: Client): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: client.id };
  const secretKey: string = SECRET_KEY;
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
@EntityRepository()
export class AuthService extends Repository<ClientEntity> {
  public async register(clientData: Client): Promise<Client> {
    const findUser: Client = await ClientEntity.findOne({ where: { email: clientData.email } });
    if (findUser) throw new HttpException(409, `This email ${clientData.email} already exists`);

    const hashedPassword = await hash(clientData.password, 10);

    const createUser: Client = await ClientEntity.create({
      ...clientData,
      password: hashedPassword,
    }).save();

    return { ...createUser, password: undefined };
  }

  public async login(clientData: Client): Promise<{ cookie: string; findUser: Client; accessToken: string }> {
    let findUser: Client = await ClientEntity.findOne({ where: { email: clientData.email }, select: ['password'] });
    if (!findUser) throw new HttpException(409, `This email ${clientData.email} was not found`);

    const isPasswordMatching: boolean = await compare(clientData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    // we made another call to the database to get the client's data because password is not selected by default as a security measure
    findUser = await ClientEntity.findOne({
      where: { email: clientData.email },
      relations: ['photos'],
    });
    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser, accessToken: tokenData.token };
  }
}
