interface IUserReponseDTO {
  email: string;
  name: string;
  id: string;
  avatar: string;
  driver_licence: string;
  avatar_url(): string;
}

export { IUserReponseDTO };
