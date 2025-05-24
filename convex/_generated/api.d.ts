/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as mutations_createRoom from "../mutations/createRoom.js";
import type * as mutations_joinRoom from "../mutations/joinRoom.js";
import type * as mutations_updateRoom from "../mutations/updateRoom.js";
import type * as queries_getRoom from "../queries/getRoom.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "mutations/createRoom": typeof mutations_createRoom;
  "mutations/joinRoom": typeof mutations_joinRoom;
  "mutations/updateRoom": typeof mutations_updateRoom;
  "queries/getRoom": typeof queries_getRoom;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
