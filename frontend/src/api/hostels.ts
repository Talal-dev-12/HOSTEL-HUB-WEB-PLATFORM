import { Hostel } from "../types";
import api from "./axios";


export const getHostels = () => {
  return api.get("hostel/get-approved-hostels");
};

export const listHostel = (formData: FormData) => {
  const token = localStorage.getItem("token");
  return api.post("/hostel/list", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export const hostlerHostler = (token: string) => {
  return api.get("/hostel/get-hostler-hostels", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const singleHostel = (id: string) => {
  return api.get(`/hostel/get-single-hostel/${id}`)
}

export const updateHostelBadges = async (id: string, badgeData: { isFeatured: boolean, isVerified: boolean }) => {
  const token = localStorage.getItem("token");
  return await api.patch(`/hostel/update-badges/${id}`, badgeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


export const deleteHostel = (id: string) => {
  const token = localStorage.getItem("token");
  return api.delete(`/hostel/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


export const updateHostelStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
  const token = localStorage.getItem("token");
  return await api.patch(
    `/admin/update-status/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getAllHostels = async () => {
  const token = localStorage.getItem("token");
  return await api.get("admin/all-hostels/",
    { headers: { Authorization: `Bearer ${token}` } }
  )
}