import { useQuery } from "@tanstack/react-query";
import axios from "./axios";

export const useSessionsQuery = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () => axios.get(`/sessions`),
  });
};

export const useTrainersQuery = () => {
  return useQuery({
    queryKey: ["trainers"],
    queryFn: () => axios.get(`/trainers`),
  });
};

export const useBookingsQuery = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => axios.get(`/bookings`),
  });
};
