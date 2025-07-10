export interface IAddFaqSession {
  username?: string;
}

export const clearAddFaqSession = (session: IAddFaqSession) => {
  session.username = undefined;
};
