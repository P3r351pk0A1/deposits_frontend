/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface MiningServiceSerializerInserted {
  /** Name */
  name?: string | null;
  /** Status */
  status?: string | null;
  /** Url */
  url?: string | null;
  /**
   * Price
   * @min -2147483648
   * @max 2147483647
   */
  price?: number | null;
}

export interface MiningServiceOrderSerializerInserted {
  Mservice?: MiningServiceSerializerInserted;
  /** Square */
  square?: number | null;
}

export interface SingleMiningOrder {
  /** Mining order id */
  mining_order_id?: number;
  /**
   * Status
   * @minLength 1
   */
  status: string;
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * Moderation date
   * @format date-time
   */
  moderation_date?: string | null;
  /** Company name */
  company_name?: string | null;
  /** Location */
  location?: string | null;
  /**
   * Mining start date
   * @format date-time
   */
  mining_start_date?: string | null;
  /**
   * Order cost
   * @min -2147483648
   * @max 2147483647
   */
  order_cost?: number | null;
  mining_services_in_order?: MiningServiceOrderSerializerInserted[];
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
}

export interface MiningService {
  /** Mining service id */
  mining_service_id?: number;
  /** Name */
  name?: string | null;
  /** Description */
  description?: string | null;
  /** Status */
  status?: string | null;
  /** Url */
  url?: string | null;
  /** Long description */
  long_description?: string | null;
  /**
   * Price
   * @min -2147483648
   * @max 2147483647
   */
  price?: number | null;
}

export interface MiningServiceOrder {
  /** Id */
  id?: number;
  Mservice?: MiningService;
  /** Square */
  square?: number | null;
}

export interface MiningOrdersSerialiser {
  /** Mining order id */
  mining_order_id?: number;
  /**
   * Status
   * @minLength 1
   */
  status: string;
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * Moderation date
   * @format date-time
   */
  moderation_date?: string | null;
  /** Company name */
  company_name?: string | null;
  /** Location */
  location?: string | null;
  /**
   * Mining start date
   * @format date-time
   */
  mining_start_date?: string | null;
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /**
   * Order cost
   * @min -2147483648
   * @max 2147483647
   */
  order_cost?: number | null;
}

export interface User {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 100
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 100
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
  /**
   * Имя пользователя
   * @minLength 1
   * @maxLength 100
   */
  username: string;
  /**
   * Имя
   * @minLength 1
   * @maxLength 150
   */
  first_name: string;
  /**
   * Фамилия
   * @minLength 1
   * @maxLength 150
   */
  last_name: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  miningOrders = {
    /**
     * No description
     *
     * @tags miningOrders
     * @name MiningOrdersList
     * @request GET:/miningOrders
     * @secure
     */
    miningOrdersList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/miningOrders`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningOrders
     * @name MiningOrdersRead
     * @request GET:/miningOrders/{id}
     * @secure
     */
    miningOrdersRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/miningOrders/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningOrders
     * @name MiningOrdersUpdate
     * @request PUT:/miningOrders/{id}
     * @secure
     */
    miningOrdersUpdate: (id: string, data: SingleMiningOrder, params: RequestParams = {}) =>
      this.request<SingleMiningOrder, any>({
        path: `/miningOrders/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningOrders
     * @name MiningOrdersDelete
     * @request DELETE:/miningOrders/{id}
     * @secure
     */
    miningOrdersDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/miningOrders/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningOrders
     * @name MiningOrdersFormingUpdate
     * @request PUT:/miningOrders/{id}/forming
     * @secure
     */
    miningOrdersFormingUpdate: (id: string, data: SingleMiningOrder, params: RequestParams = {}) =>
      this.request<SingleMiningOrder, any>({
        path: `/miningOrders/${id}/forming`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningOrders
     * @name MiningOrdersModeratingUpdate
     * @request PUT:/miningOrders/{id}/moderating
     * @secure
     */
    miningOrdersModeratingUpdate: (id: string, data: SingleMiningOrder, params: RequestParams = {}) =>
      this.request<SingleMiningOrder, any>({
        path: `/miningOrders/${id}/moderating`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  miningServiceOrder = {
    /**
     * No description
     *
     * @tags miningServiceOrder
     * @name MiningServiceOrderUpdate
     * @request PUT:/miningServiceOrder/{pk_mservice}/{pk_morder}
     * @secure
     */
    miningServiceOrderUpdate: (
      pkMservice: string,
      pkMorder: string,
      data: MiningServiceOrder,
      params: RequestParams = {},
    ) =>
      this.request<MiningServiceOrder, any>({
        path: `/miningServiceOrder/${pkMservice}/${pkMorder}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningServiceOrder
     * @name MiningServiceOrderDelete
     * @request DELETE:/miningServiceOrder/{pk_mservice}/{pk_morder}
     * @secure
     */
    miningServiceOrderDelete: (pkMservice: string, pkMorder: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/miningServiceOrder/${pkMservice}/${pkMorder}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  miningServices = {
    /**
     * No description
     *
     * @tags miningServices
     * @name MiningServicesList
     * @request GET:/miningServices
     * @secure
     */
    miningServicesList: (
      query:{name: string},
      params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/miningServices`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningServices
     * @name MiningServicesCreate
     * @request POST:/miningServices
     * @secure
     */
    miningServicesCreate: (data: MiningService, params: RequestParams = {}) =>
      this.request<MiningService, any>({
        path: `/miningServices`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningServices
     * @name MiningServicesRead
     * @request GET:/miningServices/{id}
     * @secure
     */
    miningServicesRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/miningServices/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningServices
     * @name MiningServicesCreate2
     * @request POST:/miningServices/{id}
     * @originalName miningServicesCreate
     * @duplicate
     * @secure
     */
    miningServicesCreate2: (id: string,  params: RequestParams = {}) => //changed
      this.request<MiningOrdersSerialiser, any>({
        path: `/miningServices/${id}`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningServices
     * @name MiningServicesUpdate
     * @request PUT:/miningServices/{id}
     * @secure
     */
    miningServicesUpdate: (id: string, data: MiningService, params: RequestParams = {}) =>
      this.request<MiningService, any>({
        path: `/miningServices/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningServices
     * @name MiningServicesDelete
     * @request DELETE:/miningServices/{id}
     * @secure
     */
    miningServicesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/miningServices/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags miningServices
     * @name MiningServicesAddMiningImgCreate
     * @request POST:/miningServices/{id}/add_mining_img
     * @secure
     */
    miningServicesAddMiningImgCreate: (id: string, data: MiningService, params: RequestParams = {}) =>
      this.request<MiningService, any>({
        path: `/miningServices/${id}/add_mining_img`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserLkCreate
     * @request POST:/user/LK
     * @secure
     */
    userLkCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/LK`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLkUpdate
     * @request PUT:/user/LK
     * @secure
     */
    userLkUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/LK`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLoginCreate
     * @request POST:/user/login
     * @secure
     */
    userLoginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/login`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLogoutCreate
     * @request POST:/user/logout
     * @secure
     */
    userLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegCreate
     * @request POST:/user/reg
     * @secure
     */
    userRegCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/reg`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegUpdate
     * @request PUT:/user/reg
     * @secure
     */
    userRegUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/reg`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
