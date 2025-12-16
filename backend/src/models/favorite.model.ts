// backend/src/models/favorite.model.ts
export interface Favorite {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
}
