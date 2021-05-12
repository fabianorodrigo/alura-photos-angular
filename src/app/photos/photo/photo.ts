export interface Photo {
  id?: number;
  postDate?: Date;
  url: string;
  description: string;
  likes?: number;
  comments?: number;
}
