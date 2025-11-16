export interface Newsletter {
  id: number;
  title: string;
  date: string;
  author: string;
  preview: string;
  content: string;
  image: string;
  contentImages?: string[];
  takeaways: string[];
}
