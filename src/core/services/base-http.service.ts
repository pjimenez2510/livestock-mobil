import AxiosClient from "../infrastructure/http/AxiosClient";

export abstract class BaseHttpService<
  T,
  CreateParams,
  UpdateParams,
  FilterParams
> {
  protected http: AxiosClient;
  protected abstract baseUrl: string;
  constructor() {
    this.http = AxiosClient.getInstance();
  }

  static getInstance<
    T,
    CreateParams,
    UpdateParams,
    FilterParams,
    S extends BaseHttpService<T, CreateParams, UpdateParams, FilterParams>
  >(this: new () => S): S {
    return new this();
  }

  async getById(id: number): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await this.http.get<T>(url);
    return data.data;
  }

  async getAll(params?: FilterParams): Promise<T[]> {
    const { data } = await this.http.get<T[]>(this.baseUrl, { params });
    return data.data;
  }

  async create(params: CreateParams): Promise<T> {
    const { data } = await this.http.post<T>(this.baseUrl, params);
    return data.data;
  }

  async update(id: number, params: UpdateParams): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await this.http.patch<T>(url, params);
    return data.data;
  }

  async delete(id: number): Promise<boolean> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await this.http.delete<boolean>(url);
    return data.data;
  }
}
