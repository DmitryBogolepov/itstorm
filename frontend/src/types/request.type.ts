// export interface RequestType {
//   name:string,
//   phone:string,
//   type: 'order' | 'consultation',
//   service?:string
// }

export type RequestType =
  | {
  name: string;
  phone: string;
  type: 'order';
  service: string;
}
  | {
  name: string;
  phone: string;
  type: 'consultation';
  service?: never;
};
