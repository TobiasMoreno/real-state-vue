import { defineStore } from "pinia";
import { api } from "@/plugins/axios";
import { Building } from "@/features/buildings/type/building";

export const useBuildingStore = defineStore("building", {
  state: () => ({
    buildings: [] as Building[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async filterBuildings(filters: {
      sale?: boolean;
      keyword?: string;
      typeName?: string;
      ambientes?: string;
      minPrice?: number;
      maxPrice?: number;
    }) {
      this.isLoading = true;
      this.error = null;
      try {
        const clean = Object.fromEntries(
          Object.entries(filters).filter(
            ([_, v]) => v !== undefined && v !== ""
          )
        );

        const { data } = await api.post<Building[]>("/buildings/filter", clean);
        this.buildings = data;
      } catch (err: any) {
        this.error = "Error filtering buildings";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
