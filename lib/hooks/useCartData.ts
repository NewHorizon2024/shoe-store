import { GET_CART } from "@/app/api/routes";
import { Cart } from "@/models/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { GET_CART_DATA } from "../tanQueries";

export default function useCartData(userId: number) {
  return useQuery<{ cart: Cart[] }>({
    queryKey: [GET_CART_DATA],
    queryFn: async () => {
      const response = await axios.get(`${GET_CART}?userId=${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
}
