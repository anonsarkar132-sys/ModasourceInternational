import { Banner } from "./banner.model";
import { IBanner } from "./banner.interface";

const createBanner = async (payload: Partial<IBanner>) =>
  await Banner.create(payload);

const getAllBanners = async () =>
  await Banner.find().sort({ createdAt: -1 });

const getSingleBanner = async (id: string) =>
  await Banner.findById(id);

const updateBanner = async (id: string, payload: Partial<IBanner>) =>
  await Banner.findByIdAndUpdate(id, payload, { returnDocument: "after" });

const deleteBanner = async (id: string) =>
  await Banner.findByIdAndDelete(id);

export const BannerService = {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};