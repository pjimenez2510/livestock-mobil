import AxiosClient from "@/src/core/infrastructure/http/AxiosClient";
import { AuthReponse, Login, Register } from "../interfaces/auth.interface";

interface Auth {
  login(params: Login): Promise<AuthReponse>;
  register(params: Register): Promise<AuthReponse>;
  logout(): Promise<void>;
}

export class AuthService implements Auth {
  private url: string = "auth";
  private axiosCLient: AxiosClient;

  constructor() {
    this.axiosCLient = AxiosClient.getInstance();
  }

  public static getInstance(): Auth {
    return new AuthService();
  }

  async login(params: Login): Promise<AuthReponse> {
    const { data } = await this.axiosCLient.post<AuthReponse>(
      `${this.url}/login`,
      params
    );
    return data.data;
  }

  async register(params: Register): Promise<AuthReponse> {
    const { data } = await this.axiosCLient.post<AuthReponse>(
      `${this.url}/signup`,
      params
    );
    return data.data;
  }

  async logout(): Promise<void> {
    await this.axiosCLient.delete(`${this.url}/logout`);
  }
}
